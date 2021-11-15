import moment from 'moment'
import now from 'performance-now'
import logger from 'utils/logger'
import { actionTypes } from 'actions/actionTypes'
import { isFacebookUserAgent } from 'utils/request'
import { getBasketDate } from 'selectors/basket'
import { getAccessToken, getIsAdmin, getIsAuthenticated } from 'selectors/auth'
import { getMenuAccessToken, getMenuFetchVariant } from 'selectors/menu'
import { getUserMenuVariant } from 'selectors/features'
import { cutoffDateTimeNow, getLandingDay } from 'utils/deliveries'
import { getPreviewMenuDateForCutoff } from '../selectors/menuService'

import { getPreselectedCollectionName, selectCollection, setSlotFromIds } from './utils'
import { boxSummaryDeliveryDaysLoad } from "actions/boxSummary/boxSummaryDeliveryDaysLoad"
import { menuLoadComplete } from "actions/menu/menuLoadComplete"
import { menuServiceDataReceived } from "actions/menuService/menuServiceDataReceived"
import { pending } from "actions/status/pending"
import { error as errorAction } from "actions/status/error"
import { menuLoadStock } from "actions/menu/menuLoadStock"
import { menuLoadMenu } from "actions/menu/menuLoadMenu"
import { menuLoadDays } from "actions/menu/menuLoadDays"
import { redirect } from "actions/redirect/redirect"
import { menuLoadOrderDetails } from "actions/menu/menuLoadOrderDetails"
import { basketDateChange } from "actions/basket/basketDateChange"
import { userLoadOrders } from "actions/user/userLoadOrders"
import { userLoadData } from "actions/user/userLoadData"
import { basketReset } from "actions/basket/basketReset"
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import { basketPostcodeChangePure } from "actions/basket/basketPostcodeChangePure"
import { basketRecipeAdd } from "routes/Menu/actions/basketRecipes/basketRecipeAdd"
import { getBrandMenuHeaders } from "routes/Menu/actions/brandData/getBrandMenuHeaders"
import { getBrandInfo } from "routes/Menu/actions/brandData/getBrandInfo"
import { sendClientMetric } from "routes/Menu/apis/clientMetrics/sendClientMetric"
import { fetchMenus } from "routes/Menu/fetchData/apis/fetchMenus"
import { fetchMenusWithUserId } from "routes/Menu/fetchData/apis/fetchMenusWithUserId"

const requiresMenuRecipesClear = (state, orderId) => (
  orderId
    && getIsAuthenticated(state)
    && state.basket.get('recipes').size
)

const chooseFirstDate = () => async (dispatch, getState) => {
  const isAuthenticated = getIsAuthenticated(getState())
  const isAdmin = getIsAdmin(getState())

  if (isAuthenticated && !isAdmin) {
    await dispatch(userLoadOrders())
  }

  await dispatch(menuLoadDays())
  await dispatch(boxSummaryDeliveryDaysLoad())

  const { date } = getLandingDay(getState())

  return dispatch(basketDateChange(date))
}

const handleQueryError = (error) => async (dispatch) => {
  await dispatch(errorAction(actionTypes.ORDER_SAVE, error))

  if (error === 'no-stock') {
    await dispatch(menuLoadStock(true))
  }
}

const loadOrderAuthenticated = (orderId) => async (dispatch, getState) => {
  const { auth, user } = getState()

  if (auth.get('isAuthenticated') && !user.get('email') && !auth.get('isAdmin')) {
    await dispatch(userLoadData())
  }
  const prevBasketRecipes = getState().basket.get('recipes')

  await dispatch(menuLoadOrderDetails(orderId))

  const noOfOrderRecipes = getState().basket.get('recipes').size

  if (noOfOrderRecipes === 0) {
    // eslint-disable-next-line no-restricted-syntax, no-unused-vars
    for (const [recipeId, qty] of prevBasketRecipes) {
      for (let i = 0; i < qty; i++) {
        // fall back to the defaults for these 3 params
        const view = undefined
        const recipeInfo = undefined
        const maxRecipesNum = undefined

        dispatch(basketRecipeAdd(recipeId, view, recipeInfo, maxRecipesNum, orderId))
      }
    }
  }

  await dispatch(menuLoadMenu())
  dispatch(pending(actionTypes.MENU_FETCH_DATA, false))
  dispatch(menuLoadStock(true))
  sendClientMetric('menu-edit-initiated', 1, 'Count')
}

const loadOrder = (orderId) => async (dispatch, getState) => {
  const isAuthenticated = getIsAuthenticated(getState())

  if (isAuthenticated) {
    await loadOrderAuthenticated(orderId)(dispatch, getState)

    return
  }

  if (__SERVER__) {
    if (!isFacebookUserAgent(getState().request.get('userAgent'))) {
      logger.notice({ message: `Unauthenticated user trying to edit: ${orderId}` })
    }

    await dispatch(redirect(`/menu?target=${encodeURIComponent(`${__CLIENT_PROTOCOL__}://${__DOMAIN__}/menu/${orderId}`)}#login`, true))
  }
}

const loadWithoutOrder = (query, background) => async (dispatch, getState) => {
  const isAdmin = getIsAdmin(getState())

  if (getState().basket.get('orderId')) {
    const shippingAddresses = getState().user.get('shippingAddresses')

    const addressToSelect = (
      shippingAddresses.find(address => address.shippingDefault === true)
      || shippingAddresses.first()
    )

    await dispatch(basketReset(addressToSelect))
  }

  if (
    query.day_id
    || query.slot_id
    || getBasketDate(getState())
    || getState().basket.get('slotId')
  ) {
    try {
      await dispatch(menuLoadDays())
      await dispatch(boxSummaryDeliveryDaysLoad())
      dispatch(setSlotFromIds(query.slot_id, query.day_id))
    } catch (err) {
      logger.error({ message: `Debug fetchData: ${err.message}`, errors: [err] })
    }
  } else if (!getState().basket.get('date')) {
    await chooseFirstDate()(dispatch, getState)
  }

  if (query.num_portions) {
    dispatch(basketNumPortionChange(query.num_portions))
  }

  let cutoffDateTime

  if (isAdmin) {
    cutoffDateTime = query.cutoffDate || getState().basket.get('date') || cutoffDateTimeNow()
  }

  const isAdminQuery = !!(query && query['preview[auth_user_id]'])
  if (isAdminQuery) {
    cutoffDateTime = getPreviewMenuDateForCutoff(getState())
  }

  await dispatch(menuLoadMenu(cutoffDateTime, background))
  dispatch(pending(actionTypes.MENU_FETCH_DATA, false))
  dispatch(menuLoadStock(true))

  if (query.postcode && !getState().basket.get('postcode')) {
    dispatch(basketPostcodeChangePure(query.postcode))
  }
}

const selectCollectionFromQuery = (query) => (dispatch, getState) => {
  const state = getState()
  const collectionName = getPreselectedCollectionName(state, query.collection)
  dispatch(selectCollection(collectionName))
}

const shouldFetchData = (state, params, force, userMenuVariant) => {
  const {menuRecipes} = state
  const {menuCollections} = state
  const threshold = (__DEV__) ? 4 : 8
  const stale = moment(state.menuRecipesUpdatedAt).add(1, 'hour').isBefore(moment())
  const requiresClear = requiresMenuRecipesClear(state, params.orderId)
  const isAccessTokenDifferent = getMenuAccessToken(state) !== getAccessToken(state)
  const isMenuVariantDifferent = userMenuVariant && getMenuFetchVariant(state) !== getUserMenuVariant(state)

  return (
    force
      || isAccessTokenDifferent
      || isMenuVariantDifferent
      || !menuRecipes
      || (menuRecipes && menuRecipes.size <= threshold)
      || stale
      || requiresClear
      || !menuCollections.size
  )
}

// eslint-disable-next-line import/no-default-export
export default function fetchData({ query, params }, force, background, userMenuVariant) {
  return async (dispatch, getState) => {
    const accessToken = getAccessToken(getState())

    const startTime = now()

    const isPending = getState().pending && getState().pending.get(actionTypes.MENU_FETCH_DATA)
    const shouldFetch = shouldFetchData(getState(), params, force, userMenuVariant)
    const isAdminQuery = !!(query && query['preview[auth_user_id]'])

    if (!isAdminQuery && (isPending || !shouldFetch)) {
      return
    }

    await dispatch(pending(actionTypes.MENU_FETCH_DATA, true))

    const isAuthenticated = getIsAuthenticated(getState())
    const userId = getState().auth.get('id')

    let fetchMenuPromise

    if (isAuthenticated && userId) {
      fetchMenuPromise = fetchMenusWithUserId(accessToken, query, userId)
    } else if (userMenuVariant) { // A/B test on signup page
      fetchMenuPromise = fetchMenusWithUserId(accessToken, query, userMenuVariant)
    } else {
      fetchMenuPromise = fetchMenus(accessToken, query)
    }

    const menuResponse = await fetchMenuPromise

    dispatch(menuServiceDataReceived(menuResponse, accessToken, userMenuVariant))

    dispatch(getBrandInfo())
    dispatch(getBrandMenuHeaders())

    try {
      if (query.error) {
        await handleQueryError(query.error)(dispatch)
      }

      if (params.orderId) {
        await loadOrder(params.orderId)(dispatch, getState)
      } else {
        await loadWithoutOrder(query, background)(dispatch, getState)
      }

      selectCollectionFromQuery(query)(dispatch, getState)

      const timeTaken = Math.round(now() - startTime)
      dispatch(menuLoadComplete(timeTaken, true))
    } catch (e) {
      dispatch(pending(actionTypes.MENU_FETCH_DATA, false))
      throw e
    }
  }
}
