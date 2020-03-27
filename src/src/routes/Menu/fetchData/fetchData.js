import moment from 'moment'
import now from 'performance-now'
import actions from 'actions'
import logger from 'utils/logger'
import { actionTypes } from 'actions/actionTypes'
import { isFacebookUserAgent } from 'utils/request'
import { getBasketDate } from 'selectors/basket'
import { getIsAdmin, getIsAuthenticated, getAccessToken } from 'selectors/auth'
import { getMenuAccessToken, getMenuFetchVariant } from 'selectors/menu'
import { getUserMenuVariant } from 'selectors/features'
import { getLandingDay, cutoffDateTimeNow } from 'utils/deliveries'
import { menuLoadComplete } from 'actions/menu'
import { fetchMenus, fetchMenusWithUserId } from 'apis/menus'
import { fetchBrandInfo } from 'apis/brand'
import { menuServiceDataReceived } from 'actions/menuService'
import { brandDataReceived } from 'actions/brand'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'

import { selectCollection, getPreselectedCollectionName, setSlotFromIds } from './utils'

const requiresMenuRecipesClear = (store, orderId) => (
  orderId
    && getIsAuthenticated(store.getState())
    && store.getState().basket.get('recipes').size
)

const chooseFirstDate = async (store) => {
  const isAuthenticated = getIsAuthenticated(store.getState())
  const isAdmin = getIsAdmin(store.getState())

  if (isAuthenticated && !isAdmin) {
    await store.dispatch(actions.userLoadOrders())
  }

  await store.dispatch(actions.menuLoadDays())
  await store.dispatch(boxSummaryDeliveryDaysLoad())

  const canLandOnOrder = store.getState().features.getIn(['landingOrder', 'value'], false)
  const { date } = getLandingDay(
    store.getState(),
    false,
    !canLandOnOrder,
  )

  return store.dispatch(actions.basketDateChange(date))
}

const handleQueryError = async (store, error) => {
  await store.dispatch(actions.error(actionTypes.ORDER_SAVE, error))

  if (error === 'no-stock') {
    await store.dispatch(actions.menuLoadStock(true))
  }
}

const loadOrderAuthenticated = async (store, orderId) => {
  try {
    const { auth, user } = store.getState()

    if (auth.get('isAuthenticated') && !user.get('email') && !auth.get('isAdmin')) {
      await store.dispatch(actions.userLoadData())
    }
    const prevBasketRecipes = store.getState().basket.get('recipes')

    await store.dispatch(actions.menuLoadOrderDetails(orderId))

    const noOfOrderRecipes = store.getState().basket.get('recipes').size

    if (noOfOrderRecipes === 0) {
      // eslint-disable-next-line no-restricted-syntax, no-unused-vars
      for (const [recipeId, qty] of prevBasketRecipes) {
        for (let i = 0; i < qty; i++) {
          store.dispatch(actions.basketRecipeAdd(recipeId))
        }
      }
    }

    await Promise.all([
      store.dispatch(actions.menuLoadMenu()),
      store.dispatch(actions.menuLoadStock(true))
    ])
  } catch (e) {
    logger.error({ message: `Debug fetchData: ${e}`, errors: [e] })
    if (__SERVER__) {
      logger.error({ message: `Failed to fetch order: ${orderId}.`, errors: [e] })
      await store.dispatch(actions.redirect('/menu', true))
    }
  }
}

const loadOrder = async (store, orderId) => {
  const isAuthenticated = getIsAuthenticated(store.getState())

  if (isAuthenticated) {
    await loadOrderAuthenticated(store, orderId)

    return
  }

  if (__SERVER__) {
    if (!isFacebookUserAgent(store.getState().request.get('userAgent'))) {
      logger.notice({ message: `Unauthenticated user trying to edit: ${orderId}` })
    }

    await store.dispatch(actions.redirect(`/menu?target=${encodeURIComponent(`${__CLIENT_PROTOCOL__}://${__DOMAIN__}/menu/${orderId}`)}#login`, true))
  }
}

const loadWithoutOrder = async (store, query, background) => {
  const isAdmin = getIsAdmin(store.getState())

  if (store.getState().basket.get('orderId')) {
    const shippingAddresses = store.getState().user.get('shippingAddresses')

    const addressToSelect = (
      shippingAddresses.find(address => address.shippingDefault === true)
      || shippingAddresses.first()
    )

    await store.dispatch(actions.basketReset(addressToSelect))
  }

  if (
    query.day_id
    || query.slot_id
    || getBasketDate(store.getState())
    || store.getState().basket.get('slotId')
  ) {
    try {
      await store.dispatch(actions.menuLoadDays())
      await store.dispatch(boxSummaryDeliveryDaysLoad())

      setSlotFromIds(store.getState(), query.slot_id, query.day_id, store.dispatch)
    } catch (err) {
      logger.error({ message: `Debug fetchData: ${err.message}`, errors: [err] })
    }
  } else if (!store.getState().basket.get('date')) {
    await chooseFirstDate(store)
  }

  if (query.num_portions) {
    await store.dispatch(actions.basketNumPortionChange(query.num_portions))
  }

  let cutoffDateTime
  if (isAdmin) {
    cutoffDateTime = query.cutoffDate || store.getState().basket.get('date') || cutoffDateTimeNow()
  }

  await store.dispatch(actions.menuLoadMenu(cutoffDateTime, background))
  await store.dispatch(actions.menuLoadStock(true))

  if (query.postcode && !store.getState().basket.get('postcode')) {
    await store.dispatch(actions.basketPostcodeChangePure(query.postcode))
  }

  if (isAdmin) {
    await Promise.all([
      store.dispatch(actions.menuAddEmptyStock()),
      store.dispatch(actions.temp('cutoffDateTime', cutoffDateTime))
    ])
  }
}

const addRecipesFromQuery = async (store, query) => {
  const isAuthenticated = getIsAuthenticated(store.getState())
  const isAdmin = getIsAdmin(store.getState())

  if (isAuthenticated === false || isAdmin === true) {
    return
  }

  if (!query.recipes || store.getState().basket.get('recipes').size) {
    return
  }

  const numPortions = store.getState().basket.get('numPortions').toString()
  const inStockRecipes = store.getState().menuRecipeStock.filter(el => el.get(numPortions) > 0).keySeq().toArray()

  const recipeIds = query.recipes.slice(1, -1).split(',')
  const newRecipes = recipeIds.filter(el => inStockRecipes.indexOf(el) > -1).slice(0, 4)

  newRecipes.forEach(newRecipe => {
    store.dispatch(actions.basketRecipeAdd(newRecipe))
  })
}

const selectCollectionFromQuery = (store, query) => {
  const state = store.getState()
  const collectionName = getPreselectedCollectionName(state, query.collection)
  selectCollection(state, collectionName, store.dispatch)
}

const shouldFetchData = (store, params, force, userMenuVariant) => {
  const state = store.getState()
  const menuRecipes = store && state.menuRecipes
  const menuCollectionRecipes = store && state.menuCollectionRecipes
  const threshold = (__DEV__) ? 4 : 8
  const stale = moment(state.menuRecipesUpdatedAt).add(1, 'hour').isBefore(moment())
  const requiresClear = requiresMenuRecipesClear(store, params.orderId)
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
    || !menuCollectionRecipes.size
  )
}

// eslint-disable-next-line import/no-default-export
export default async function fetchData({ store, query, params }, force, background, userMenuVariant) {
  const accessToken = getAccessToken(store.getState())

  const startTime = now()

  const isPending = store && store.getState().pending && store.getState().pending.get(actionTypes.MENU_FETCH_DATA)
  const shouldFetch = shouldFetchData(store, params, force, userMenuVariant)
  const isAdminQuery = !!(query && query['preview[auth_user_id]'])

  if (!isAdminQuery && (isPending || !shouldFetch)) {
    return
  }

  await store.dispatch(actions.pending(actionTypes.MENU_FETCH_DATA, true))

  const isAuthenticated = getIsAuthenticated(store.getState())
  const userId = store.getState().auth.get('id')

  let fetchMenuPromise

  if (isAuthenticated && userId) {
    fetchMenuPromise = fetchMenusWithUserId(accessToken, userId)
  } else if (userMenuVariant) { // A/B test on signup page
    fetchMenuPromise = fetchMenusWithUserId(accessToken, userMenuVariant)
  } else {
    fetchMenuPromise = fetchMenus(accessToken, query)
  }

  const menuResponse = await fetchMenuPromise

  store.dispatch(menuServiceDataReceived(menuResponse, accessToken, userMenuVariant))

  try {
    const brandResponse = await fetchBrandInfo()
    store.dispatch(brandDataReceived(brandResponse))
  } catch (err) {
    logger.notice({ message: `Brand Theme failed to load: ${err.message}`, errors: [err] })
  }

  try {
    if (query.error) {
      await handleQueryError(store, query.error)
    }

    if (params.orderId) {
      await loadOrder(store, params.orderId)
    } else {
      await loadWithoutOrder(store, query, background)
    }

    selectCollectionFromQuery(store, query)

    await addRecipesFromQuery(store, query)

    await store.dispatch(actions.pending(actionTypes.MENU_FETCH_DATA, false))

    const timeTaken = Math.round(now() - startTime)
    store.dispatch(menuLoadComplete(timeTaken, true))
  } catch (e) {
    store.dispatch(actions.pending(actionTypes.MENU_FETCH_DATA, false))
    throw e
  }
}
