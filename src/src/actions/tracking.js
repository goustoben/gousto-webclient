/* global AWIN */
import { getUserOrderById } from 'utils/user'
import logger from 'utils/logger'
import globals from 'config/globals'
import actionTypes from 'actions/actionTypes'

export const trackFirstPurchase = (orderId, prices) => (
  (dispatch, getState) => {
    const { user } = getState()
    const goustoReference = user.get('goustoReference')
    const order = getUserOrderById(orderId, user.get('orders'))
    const orderTotal = prices && prices.get('total')
    const grossTotal = prices && prices.get('grossTotal')

    if (!goustoReference) {
      logger.warning('Missing user data for first purchase tracking: no user found in store')
    }

    if (!order.get('prices')) {
      logger.warning(`Missing order data for first purchase tracking: no user order "${orderId}" found in store`)
    }

    dispatch({
      type: actionTypes.TRACKING,
      trackingData:{
        actionType: actionTypes.TRACKING,
        asource: getState().tracking.get('asource'),
        goustoReference,
        event: 'firstPurchase',
        orderId,
        orderTotal,
        voucher: order.getIn(['prices', 'promoCode'], ''),
      },
      optimizelyData: {
        eventName: 'order_placed_gross',
        tags: {
          revenue: grossTotal
        }
      }
    })
    dispatch({
      type: actionTypes.TRACKING,
      optimizelyData: {
        eventName: 'order_placed_net',
        tags: {
          revenue: orderTotal
        }
      }
    })
  }
)

export const setAffiliateSource = asource => (
  dispatch => {
    dispatch({
      type: actionTypes.AFFILIATE_SOURCE_SET,
      asource,
    })
  }
)

export const trackAffiliatePurchase = ({ orderId, total, commissionGroup, promoCode }) => {
  if (globals.client) {
    if (typeof window.AWIN === "undefined" || typeof window.AWIN.Tracking === "undefined") {
      window.AWIN = {
        Tracking: {},
      }
    }

    window.AWIN.Tracking.Sale = {
      amount: total,
      channel: '',
      orderRef: orderId,
      parts:  `${commissionGroup}:${total}`,
      voucher: promoCode,
      currency:"GBP",
    }
  }
}

export const trackRecipeOrderDisplayed = (originalOrder, displayedOrder) => (
  (dispatch, getState) => {
    const date = getState().basket.get('date')
    const deliveryDayId = getState().boxSummaryDeliveryDays.getIn([date, 'id'])
    const orderId = getState().basket.get('orderId')
    const browseMode = getState().menuBrowseCtaShow
    const recommended = getState().recipes.some(recipe => recipe.get('isRecommended', false))
    const recipesVisible = !(getState().menu.get('filtersMenuVisible'))
    const collectionId = getState().filters.get('currentCollectionId')
    const dietTypes = Array.from(getState().filters.get('dietTypes', []))
    const dietaryAttributes = Array.from(getState().filters.get('dietaryAttributes', []))
    const totalTime = getState().filters.get('totalTime')

    if (recipesVisible) {
      dispatch({
        type: actionTypes.RECIPES_DISPLAYED_ORDER_TRACKING,
        originalOrder,
        displayedOrder,
        collectionId,
        dietTypes,
        dietaryAttributes,
        totalTime,
        deliveryDayId,
        orderId,
        recommended,
        browseMode,
      })
    }
  }
)

export const trackRecipeFiltersOpened = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_FILTERS_OPENED_TRACKING,
    })
  }
)

export const trackRecipeFiltersClosed = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_FILTERS_CLOSED_TRACKING,
    })
  }
)

export const trackRecipeFiltersCleared = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_FILTERS_CLEARED_TRACKING,
    })
  }
)

export const trackRecipeCollectionSelected = (collectionId) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_COLLECTION_SELECTED_TRACKING,
      collectionId,
    })
  }
)

export const trackRecipeTypeSelected = (dietType) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_FILTERS_DIET_TYPE_SELECTED_TRACKING,
      dietType,
    })
  }
)

export const trackRecipeTypeUnselected = (dietType) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_FILTERS_DIET_TYPE_UNSELECTED_TRACKING,
      dietType,
    })
  }
)

export const trackRecipeDietaryAttributeSelected = (dietaryAttribute) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_FILTERS_DIETARY_ATTRIBUTE_SELECTED_TRACKING,
      dietaryAttribute,
    })
  }
)

export const trackRecipeDietaryAttributeUnselected = (dietaryAttribute) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_FILTERS_DIETARY_ATTRIBUTE_UNSELECTED_TRACKING,
      dietaryAttribute,
    })
  }
)

export const trackRecipeTotalTimeSelected = (totalTime) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_FILTERS_TOTAL_TIME_SELECTED_TRACKING,
      totalTime,
    })
  }
)

export const trackRecipeFiltersApplied = (collectionId, dietTypes, dietaryAttributes, totalTime) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.RECIPE_FILTERS_APPLIED_TRACKING,
      collectionId,
      dietTypes,
      dietaryAttributes,
      totalTime,
    })
  }
)

export const trackCTAToAllRecipesClicked = () => (
  (dispatch) => {
    dispatch ({
      type: actionTypes.TRACKING_CTA_TO_ALL_RECIPES_CLICKED,
      trackingData: {
        actionType: 'All Recipe CTA Clicked',
      }
    })
  }
)

export default {
  trackFirstPurchase,
  setAffiliateSource,
  trackRecipeOrderDisplayed,
}
