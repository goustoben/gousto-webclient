import Immutable from 'immutable'

import * as boxPricesApi from 'apis/boxPrices'
import { fetchOrder } from 'apis/orders'
import { fetchRecipeStock } from 'apis/recipes'
import { getCutoffDateTime } from 'utils/deliveries'
import { limitReached } from 'utils/basket'
import logger from 'utils/logger'
import { isFacebookUserAgent } from 'utils/request'
import GoustoException from 'utils/GoustoException'
import { loadRecipesForAllCollections } from 'actions/menuCollections'
import menuConfig from 'config/menu'
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
  basketSlotChange
} from './basket'
import { basketRecipeAdd } from '../routes/Menu/actions/basketRecipes'
import tempActions from './temp'
import { actionTypes } from './actionTypes'

const menuActions = {
  menuLoadMenu,
  menuLoadBoxPrices,
  menuLoadOrderDetails,
  menuCutoffUntilReceive,
  menuClearStock,
  menuLoadStock,
  menuLoadDays,
  menuCollectionsReceive,
  menuAddEmptyStock,
  menuBrowseCTAVisibilityChange,
  menuReceiveCollectionRecipes,
  menuReceiveMenu,
  menuReceiveMenuPending,
  loadRecipesForAllCollections,
  menuReceiveBoxPrices,
}

export function menuReceiveMenu(recipes) {
  return ({
    type: actionTypes.RECIPES_RECEIVE,
    recipes,
  })
}

export function menuReceiveCollectionRecipes(collectionId, recipes) {
  return ({
    type: actionTypes.MENU_COLLECTION_RECIPES_RECEIVE,
    collectionId,
    recipes,
  })
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

export function menuCollectionsReceive(collections) {
  return {
    type: actionTypes.MENU_COLLECTIONS_RECEIVE,
    collections,
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
    } else {
      dispatch(menuActions.menuReceiveMenuPending(false))
      if (__SERVER__) {
        if (!isFacebookUserAgent(state.request.get('userAgent'))) {
          const error = new Error('Slot is not found in menuLoadMenu')
          logger.error(error)
        }

        dispatch(redirect('/menu', true))
      }
    }
  }
}

export function menuLoadBoxPrices() {
  return async (dispatch, getState) => {
    try {
      const promoCode = getState().basket.get('promoCode')
      const orderId = getState().basket.get('orderId')
      const tariffId = getState().basket.get('tariffId')
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
    const accessToken = getState().auth.get('accessToken')
    const { data: order } = await fetchOrder(accessToken, orderId, { 'includes[]': 'shipping_address' })
    dispatch(basketReset())
    dispatch(menuActions.menuCutoffUntilReceive(order.shouldCutoffAt))

    dispatch(basketDateChange(order.deliveryDate))
    dispatch(basketNumPortionChange(order.box.numPortions, orderId))

    order.recipeItems.forEach(recipe => {
      const qty = Math.round(parseInt(recipe.quantity, 10) / parseInt(order.box.numPortions, 10))

      const adjustedQty = menuConfig.stockThreshold + qty
      dispatch(menuChangeRecipeStock({
        [recipe.recipeId]: { [order.box.numPortions]: adjustedQty },
      }))

      for (let i = 1; i <= qty; i++) {
        dispatch(basketRecipeAdd(recipe.recipeId))
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

    const grossTotal = order && order.prices && order.prices.grossTotal
    const netTotal = order && order.prices && order.prices.total

    dispatch(tempActions.temp('originalGrossTotal', grossTotal))
    dispatch(tempActions.temp('originalNetTotal', netTotal))

    await dispatch(basketPostcodeChange(order.shippingAddress.postcode)).then(() => {
      const coreSlotId = order.deliverySlot.id
      const slotId = findSlot(getState().boxSummaryDeliveryDays, coreSlotId)
      dispatch(basketSlotChange(slotId))
    })
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

export function menuAddEmptyStock() {
  return (dispatch, getState) => {
    const recipesIds = getState().menuRecipes
    const stocks = recipesIds.reduce((stock, recipeId) => ({ ...stock, [recipeId]: { 2: null, 4: null } }), {})

    dispatch({
      type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
      stock: stocks,
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

export const selectRecipeVariant = (originalRecipeId, variantId, collectionId) => ({
  type: actionTypes.MENU_RECIPE_VARIANT_SELECTED,
  payload: {
    collectionId,
    originalRecipeId,
    variantId
  }
})

export const clearSelectedRecipeVariants = () => ({
  type: actionTypes.MENU_CLEAR_SELECTED_RECIPE_VARIANTS
})

export const recipeVariantDropdownExpanded = (recipeId) => ({
  type: actionTypes.MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED,
  payload: {
    recipeId
  }
})

export default menuActions
