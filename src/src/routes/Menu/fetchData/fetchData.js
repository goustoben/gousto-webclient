import moment from 'moment'
import now from 'performance-now'
import actions from 'actions'
import logger from 'utils/logger'

import actionTypes from 'actions/actionTypes'

import { isFacebookUserAgent } from 'utils/request'
import { getBasketDate } from 'selectors/basket'
import { getIsAdmin, getIsAuthenticated } from 'selectors/auth'
import { getLandingDay, cutoffDateTimeNow } from 'utils/deliveries'
import { menuLoadComplete } from 'actions/menu'

import { selectCollection, getPreselectedCollectionName, setSlotFromIds } from './utils'

const requiresMenuRecipesClear = (store, orderId) => {
  return (
    orderId
    && getIsAuthenticated(store.getState())
    && store.getState().basket.get('recipes').size
    && store.getState().features.getIn(['menuRecipes', 'experiment'])
  )
}

const inBrowseMode = (store, query) => {
  if (store.getState().request.get('browser', '') === 'mobile' && store.getState().features.getIn(['browse', 'value']) !== true) {
    return false
  }

  if (store.getState().features.getIn(['browse', 'value']) === false || getIsAuthenticated(store.getState())) {
    return false
  }

  if (
    query.day_id ||
    query.slot_id ||
    getBasketDate(store.getState()) ||
    store.getState().basket.get('slotId')
  ) {
    return false
  }

  return true
}

const chooseFirstDate = async (store) => {
  const isAuthenticated = getIsAuthenticated(store.getState())
  const isAdmin = getIsAdmin(store.getState())

  if (isAuthenticated && !isAdmin) {
    await store.dispatch(actions.userLoadOrders())
  }

  await store.dispatch(actions.menuLoadDays())
  await store.dispatch(actions.boxSummaryDeliveryDaysLoad())

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
      for (const [recipeId, qty] of prevBasketRecipes) {
        for (let i = 0; i < qty; i++) {
          await store.dispatch(actions.basketRecipeAdd(recipeId))
        }
      }
    }

    if (requiresMenuRecipesClear(store, orderId)) {
      await store.dispatch(actions.featureSet('menuRecipes', undefined, false))
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

const loadWithoutOrder = async (store, query, background) => {
  const isAdmin = getIsAdmin(store.getState())

  if (store.getState().basket.get('orderId')) {
    await store.dispatch(actions.basketReset())
    await store.dispatch(actions.basketChosenAddressChange(store.getState().user.get('shippingAddresses').first()))
  }

  const browseMode = inBrowseMode(store, query)

  if (
    query.day_id ||
    query.slot_id ||
    getBasketDate(store.getState()) ||
    store.getState().basket.get('slotId')
  ) {
    try {
      await store.dispatch(actions.menuLoadDays())
      await store.dispatch(actions.boxSummaryDeliveryDaysLoad())

      setSlotFromIds(store.getState(), query.slot_id, query.day_id, store.dispatch)
    } catch (err) {
      logger.error({ message: `Debug fetchData: ${err.message}`, errors: [err] })
    }
  } else if (!store.getState().basket.get('date') && !browseMode) {
    await chooseFirstDate(store)
  }

  if (query.num_portions) {
    await store.dispatch(actions.basketNumPortionChange(query.num_portions))
  }

  let cutoffDateTime = browseMode ? cutoffDateTimeNow() : undefined
  if (isAdmin) {
    cutoffDateTime = query.cutoffDate || store.getState().basket.get('date') || cutoffDateTimeNow()
  }

  await store.dispatch(actions.menuLoadMenu(cutoffDateTime, background))

  if (!browseMode) {
    await store.dispatch(actions.menuLoadStock(true))
  }

  if (query.postcode && !store.getState().basket.get('postcode')) {
    await store.dispatch(actions.basketPostcodeChangePure(query.postcode))
  }

  if (browseMode || isAdmin) {
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

  for (const i of newRecipes) {
    await store.dispatch(actions.basketRecipeAdd(i))
  }
}

const selectCollectionFromQuery = (store, query) => {
  const state = store.getState()
  const collectionName = getPreselectedCollectionName(state, query.collection)
  selectCollection(state, collectionName, store.dispatch)
}

const shouldFetchData = (store, params, force) => {
  const menuRecipes = store && store.getState().menuRecipes
  const menuCollectionRecipes = store && store.getState().menuCollectionRecipes
  const threshold = (__DEV__) ? 4 : 8
  const stale = moment(store.getState().menuRecipesUpdatedAt).add(1, 'hour').isBefore(moment())

  return (
    force
    || !menuRecipes
    || (menuRecipes && menuRecipes.size <= threshold)
    || stale
    || requiresMenuRecipesClear(store, params.orderId)
    || !menuCollectionRecipes.size
  )
}

// eslint-disable-next-line import/no-default-export
export default async function fetchData({ store, query, params }, force, background) {
  const startTime = now()

  const isPending = store && store.getState().pending && store.getState().pending.get(actionTypes.MENU_FETCH_DATA)
  const shouldFetch = shouldFetchData(store, params, force)

  if (isPending || !shouldFetch) {
    return
  }

  await store.dispatch(actions.pending(actionTypes.MENU_FETCH_DATA, true))

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

    store.dispatch(menuLoadComplete(timeTaken))
  } catch (e) {
    store.dispatch(actions.pending(actionTypes.MENU_FETCH_DATA, false))
    throw e
  }
}
