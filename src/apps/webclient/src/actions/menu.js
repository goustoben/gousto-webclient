import Immutable from 'immutable'

import * as boxPricesApi from 'apis/boxPrices'
import { fetchRecipeStock } from 'apis/recipes'
import { getCutoffDateTime } from 'utils/deliveries'
import { limitReached } from 'utils/basket'
import logger from 'utils/logger'
import { isFacebookUserAgent } from 'utils/request'
import GoustoException from 'utils/GoustoException'
import menuConfig from 'config/menu'
import Cookies from 'utils/GoustoCookies'
import { set, unset, get } from 'utils/cookieHelper2'
import { canUseWindow } from 'utils/browserEnvironment'
import * as orderV2 from 'routes/Menu/apis/orderV2'
import { boxSummaryDeliverySlotChosen } from 'actions/boxSummary'
import { getPromoCode, getBasketOrderId, getBasketTariffId } from 'selectors/basket'
import { isServer } from '../../server/utils/serverEnvironment'
import statusActions from './status'
import { redirect } from './redirect'
import {productsLoadProductsById, productsLoadStock, productsLoadCategories} from './products'
import { getStockAvailability, loadMenuCollectionsWithMenuService } from './menuActionHelper'
import { menuServiceLoadDays } from './menuServiceLoadDays'

import {
  basketReset,
  basketDateChange,
  basketNumPortionChange,
  basketProductAdd,
  basketIdChange,
  basketOrderLoaded,
  basketPostcodeChange,
  basketSlotChange,
  basketChosenAddressChange,
} from './basket'
import { basketRecipeAdd } from '../routes/Menu/actions/basketRecipes'
import tempActions from './temp'
import { actionTypes } from './actionTypes'
import * as trackingKeys from './trackingKeys'

function handleReloadMenuError({ dispatch }) {
  unset(Cookies, 'reload_invalid_delivery_date')
  dispatch(menuLoadingError('Cannot load menu, try changing delivery date below.'))
}

function reloadPageWhenInvalidDeliveryDate({ dispatch, getState }) {
  // if we already reloaded dont reload and remove cookie
  if (get(Cookies, 'reload_invalid_delivery_date') === '1') {
    handleReloadMenuError({ dispatch })

    return
  }

  try {
    const firstAvailableDate = Object.keys(getState().boxSummaryDeliveryDays.toJS()).sort().shift()
    const slotId = getState().boxSummaryDeliveryDays.getIn([firstAvailableDate, 'slots']).toJS().shift().id

    set(Cookies, 'reload_invalid_delivery_date', '1', 1)
    dispatch(boxSummaryDeliverySlotChosen({ date: firstAvailableDate, slotId }))
  } catch (err) {
    logger.error({ message: err.message, extra: { error: err } })
    handleReloadMenuError({ dispatch })
  }
}

export function menuLoadingError(message) {
  return {
    type: actionTypes.MENU_LOADING_ERROR,
    message,
  }
}

export function menuReceiveBoxPrices(prices, tariffId) {
  return ({
    type: actionTypes.MENU_BOX_PRICES_RECEIVE,
    prices,
    tariffId,
  })
}

export function menuChangeRecipeStock(stock) {
  return ({
    type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
    stock,
  })
}

export function menuReplaceRecipeStock(stock) {
  return ({
    type: actionTypes.MENU_RECIPE_STOCK_REPLACE,
    stock,
  })
}

export function menuReceiveMenuPending(pending) {
  return ({
    type: actionTypes.MENU_RECIPES_RECEIVE_PENDING,
    pending,
  })
}

export function findSlot(deliveryDays, coreSlotId) {
  let slotId
  deliveryDays.some(deliveryDay => {
    const matchedSlot = deliveryDay.get('slots').find(slot => {
      if (String(slot.get('coreSlotId')) === String(coreSlotId)) {
        return true
      }

      return false
    })

    if (matchedSlot) {
      slotId = matchedSlot.get('id')

      return true
    }

    return false
  })

  return slotId
}

export function menuCutoffUntilReceive(cutoffUntil) {
  return {
    type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
    cutoffUntil,
  }
}

export function menuLoadDays() {
  return async (dispatch, getState) => {
    menuServiceLoadDays(dispatch, getState)
  }
}

export function menuLoadMenu(cutoffDateTime = null, background) {
  return async (dispatch, getState) => {
    const state = getState()
    const reqData = {
      'includes[]': ['ingredients', 'allergens'],
    }
    dispatch(menuActions.menuReceiveMenuPending(true))
    if (cutoffDateTime !== null) {
      reqData['filters[available_on]'] = cutoffDateTime
    } else {
      reqData['filters[available_on]'] = getCutoffDateTime(getState())
    }

    if (reqData['filters[available_on]']) {
      const date = reqData['filters[available_on]']
      const startTime = new Date()

      await loadMenuCollectionsWithMenuService(dispatch, getState, date, background)

      logger.notice(`recipes fetch took ${new Date() - startTime}ms`)

      dispatch(menuActions.menuReceiveMenuPending(false))

      const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
      dispatch({
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: reachedLimit,
      })

      if (canUseWindow()) {
        unset(Cookies, 'reload_invalid_delivery_date')
      }
    } else {
      dispatch(menuActions.menuReceiveMenuPending(false))
      if (canUseWindow() || !isFacebookUserAgent(state.request.get('userAgent'))) {
        const error = new Error('Slot is not found in menuLoadMenu')
        logger.error({ message: error.message, extra: { error } })
      }

      if (isServer()) {
        dispatch(redirect('/menu', true))

        return
      }

      reloadPageWhenInvalidDeliveryDate({ dispatch, getState })
    }
  }
}

export function menuLoadBoxPrices() {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const promoCode = getPromoCode(state)
      const orderId = getBasketOrderId(state)
      const tariffId = getBasketTariffId(state)
      const reqData = {}

      if (orderId) {
        reqData.order_id = orderId
      } else if (promoCode) {
        reqData.promocode = promoCode
      }

      if (!getState().auth.get('isAuthenticated') && tariffId) {
        reqData.tariff_id = tariffId
      }

      dispatch(statusActions.pending(actionTypes.MENU_BOX_PRICES_RECEIVE, true))
      dispatch(statusActions.error(actionTypes.MENU_BOX_PRICES_RECEIVE, false))

      try {
        const { data: recipePrices } = await boxPricesApi.fetchBoxPrices(getState().auth.get('accessToken'), reqData)
        dispatch(menuActions.menuReceiveBoxPrices(recipePrices, tariffId))
      } catch (err) {
        dispatch(menuActions.menuReceiveBoxPrices({}))

        throw new GoustoException(`Could not load menu box prices: fetch failed${tariffId ? ` for tariff_id "${tariffId}"` : ''}, ${err}`, {
          error: 'fetch-failed',
        })
      }
    } catch (err) {
      const errMessage = err.message || err
      logger[err.level || 'error'](errMessage)
      dispatch(statusActions.error(actionTypes.MENU_BOX_PRICES_RECEIVE, err.error || errMessage))
    } finally {
      dispatch(statusActions.pending(actionTypes.MENU_BOX_PRICES_RECEIVE, false))
    }
  }
}

export function menuLoadOrderDetails(orderId) {
  return async (dispatch, getState) => {
    try {
      await dispatch(statusActions.pending(actionTypes.LOADING_ORDER, true))

      const { data: order } = await orderV2.fetchOrder(dispatch, getState, orderId, 'shipping_address')
      dispatch(basketReset())
      dispatch(menuActions.menuCutoffUntilReceive(order.shouldCutoffAt))

      dispatch(basketDateChange(order.deliveryDate))
      dispatch(basketNumPortionChange(order.box.numPortions, orderId))

      order.recipeItems.forEach(recipe => {
        const qty = Math.round(parseInt(recipe.quantity, 10) / parseInt(order.box.numPortions, 10))

        const adjustedQty = menuConfig.stockThreshold + qty
        dispatch(menuActions.menuChangeRecipeStock({
          [recipe.recipeId]: { [order.box.numPortions]: adjustedQty },
        }))

        for (let i = 1; i <= qty; i++) {
        // fall back to the defaults for these 3 params
          const view = undefined
          const recipeInfo = undefined
          const maxRecipesNum = undefined

          dispatch(basketRecipeAdd(recipe.recipeId, view, recipeInfo, maxRecipesNum, orderId))
        }
      })

      const productItems = order.productItems || []
      if (productItems.length) {
        const productItemIds = productItems.map(productItem => productItem.itemableId)
        await dispatch(productsLoadProductsById(productItemIds))
        await dispatch(productsLoadStock())
        await dispatch(productsLoadCategories())
        productItems.forEach((product) => {
          for (let i = 0; i < parseInt(product.quantity, 10); i++) {
            dispatch(basketProductAdd(product.itemableId))
          }
        })
      }

      dispatch(basketIdChange(order.id))
      dispatch(basketOrderLoaded(order.id))
      dispatch(basketChosenAddressChange(order.shippingAddress))

      const grossTotal = order && order.prices && order.prices.grossTotal
      const netTotal = order && order.prices && order.prices.total

      dispatch(tempActions.temp('originalGrossTotal', grossTotal))
      dispatch(tempActions.temp('originalNetTotal', netTotal))

      // This sets `boxSummaryDeliveryDays`
      await dispatch(basketPostcodeChange(order.shippingAddress.postcode))

      const newState = getState()
      const coreSlotId = order.deliverySlot.id
      const slotId = findSlot(newState.boxSummaryDeliveryDays, coreSlotId)
      dispatch(basketSlotChange(slotId))
    } finally {
      dispatch(statusActions.pending(actionTypes.LOADING_ORDER, false))
    }
  }
}

export function menuClearStock() {
  return {
    type: actionTypes.MENU_RECIPE_STOCK_CLEAR,
  }
}

export function menuLoadStock(clearStock = true) {
  return async (dispatch, getState) => {
    const { auth, basket, boxSummaryDeliveryDays } = getState()
    const date = basket.get('date')
    const coreDayId = boxSummaryDeliveryDays.getIn([date, 'coreDayId'], '')

    if (!coreDayId) {
      return
    }

    const accessToken = auth.get('accessToken')
    const { data: recipeStock } = await fetchRecipeStock(accessToken, coreDayId)

    const adjustedStock = getStockAvailability(getState, recipeStock)

    const recipeStockChangeAction = clearStock ? menuReplaceRecipeStock : menuChangeRecipeStock
    dispatch(recipeStockChangeAction(adjustedStock))

    if (!clearStock) {
      return
    }

    const numPortions = getState().basket.get('numPortions')

    const recipes = getState().basket.get('recipes', Immutable.Map({}))
    recipes.forEach((amount, recipeId) => {
      for (let x = 0; x < amount; x++) {
        dispatch(menuChangeRecipeStock({ [recipeId]: { [numPortions]: -1 } }))
      }
    })
  }
}

export function menuBrowseCTAVisibilityChange(show) {
  return {
    type: actionTypes.MENU_BROWSE_CTA_VISIBILITY_CHANGE,
    show,
  }
}

export const forceMenuLoad = (forceLoad) => ({
  type: actionTypes.MENU_FORCE_LOAD,
  forceLoad,
})

export const menuLoadComplete = (timeToLoadMs, useMenuService) => ({
  type: actionTypes.MENU_LOAD_COMPLETE,
  timeToLoadMs,
  useMenuService
})

export const clearSelectedRecipeVariants = () => ({
  type: actionTypes.MENU_CLEAR_SELECTED_RECIPE_VARIANTS
})

export const trackVariantListDisplay = (view) => ({
  type: actionTypes.TRACK_VARIANT_RECIPE_LIST_DISPLAY,
  trackingData: {
    actionType: trackingKeys.recipeVariantActionSheet,
    view
  }
})

export const sideEventScreens = {
  orderSidesScreen: 'order_sides_screen',
  orderSidesAllergensScreen: 'order_sides_allergens_screen'
}

export const sideEventTypes = {
  primaryAction: 'primary_action',
  screenView: 'screen_view',
  closeScreen: 'close_screen',
  tertiaryAction: 'tertiary_action',
}

export const trackSidesContinueClicked = (sidesIds, sidesTotalSurcharge, totalNumberOfSides) => ({
  type: actionTypes.TRACK_CONTINUE_WITH_SIDES_CLICKED,
  trackingData: {
    event_name: trackingKeys.sideModalSidesContinueClicked,
    event_screen: sideEventScreens.orderSidesScreen,
    event_type: sideEventTypes.primaryAction,
    sides_ids: sidesIds,
    sides_total_surcharge: sidesTotalSurcharge,
    sides_counts: totalNumberOfSides
  }
})

export const trackViewSidesModal = () =>
  ({
    type: actionTypes.TRACK_VIEW_ORDER_SIDES_SCREEN,
    trackingData: {
      event_name: trackingKeys.sideModalViewOrderSidesScreen,
      event_screen: sideEventScreens.orderSidesScreen,
      event_type: sideEventTypes.screenView,
    }}
  )

export const trackCancelSide = () =>
  ({
    type: actionTypes.TRACK_ORDER_SIDES_CANCEL,
    trackingData: {
      event_name: trackingKeys.sideModalOrderSidesCancel,
      event_type: sideEventTypes.closeScreen
    }
  })

export const trackAddSide = (sideId, orderId) =>
  ({
    type: actionTypes.TRACK_ADD_SIDE,
    trackingData: {
      event_name: trackingKeys.sideModalAddSide,
      side_id: sideId,
      order_id: orderId,
    }
  })

export const trackViewSidesAllergens = () =>
  ({
    type: actionTypes.TRACK_VIEW_ORDER_SIDES_ALLERGENS_SCREEN,
    trackingData: {
      event_name: trackingKeys.sideModalViewOrderSidesAllergensScreen,
      event_screen: sideEventScreens.orderSidesScreen,
      event_type: sideEventTypes.tertiaryAction
    }
  })

export const trackCloseSidesAllergens = () => ({
  type: actionTypes.TRACK_CLOSE_ORDER_SIDES_ALLERGENS_SCREEN,
  trackingData: {
    event_name: trackingKeys.sideModalClose,
    event_screen: sideEventScreens.orderSidesAllergensScreen,
    event_type: sideEventTypes.closeScreen
  }
})

/**
 * menuActions should only be used for the tests
 * to mock methods and internal to call other methods
 * defined. Please don't use outside.
 */
/* eslint-disable no-use-before-define */
const menuActions = {
  menuLoadMenu,
  menuLoadBoxPrices,
  menuLoadOrderDetails,
  menuCutoffUntilReceive,
  menuClearStock,
  menuLoadStock,
  menuLoadDays,
  menuBrowseCTAVisibilityChange,
  menuReceiveMenuPending,
  menuReceiveBoxPrices,
  trackViewSidesModal,
  trackSidesContinueClicked,
  trackAddSide,
  trackCancelSide,
  trackViewSidesAllergens,
  trackCloseSidesAllergens,
  menuChangeRecipeStock,
}

export default menuActions
