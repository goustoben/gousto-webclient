/* global AWIN */
import { getUserOrderById } from 'utils/user'
import logger from 'utils/logger'
import globals from 'config/globals'
import actionTypes from 'actions/actionTypes'
import moment from 'moment'

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
      trackingData: {
        actionType: actionTypes.TRACKING,
        asource: getState().tracking.get('asource'),
        goustoReference,
        event: 'firstPurchase',
        orderId,
        orderTotal,
        voucher: order.getIn(['prices', 'promoCode'], ''),
      },
      optimizelyData: {
        type: 'event',
        eventName: 'order_placed_gross',
        tags: {
          revenue: grossTotal
        }
      }
    })
    dispatch({
      type: actionTypes.TRACKING,
      optimizelyData: {
        type: 'event',
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
    if (typeof window.AWIN === 'undefined' || typeof window.AWIN.Tracking === 'undefined') {
      window.AWIN = {
        Tracking: {},
      }
    }

    window.AWIN.Tracking.Sale = {
      amount: total,
      channel: '',
      orderRef: orderId,
      parts: `${commissionGroup}:${total}`,
      voucher: promoCode,
      currency: "GBP",
    }

    if (typeof window.AWIN.Tracking.run === 'function') {
      window.AWIN.Tracking.run()
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
    const collectionId = getState().filters.get('currentCollectionId')

    dispatch({
      type: actionTypes.RECIPES_DISPLAYED_ORDER_TRACKING,
      originalOrder,
      displayedOrder,
      collectionId,
      deliveryDayId,
      orderId,
      recommended,
      browseMode,
    })
  }
)

export const trackCTAToAllRecipesClicked = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.TRACKING_CTA_TO_ALL_RECIPES_CLICKED,
      trackingData: {
        actionType: 'All Recipe CTA Clicked',
      }
    })
  }
)

export const trackNavigationClick = (actionType) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType
      }
    })
  }
)

export const trackUserAttributes = () => (
  (dispatch, getState) => {
    const signupDate = getState().user.getIn(['subscription', 'createdAt'], '')
    const isSignupInLast30Days = moment().isSameOrBefore(moment(signupDate).add(30, 'days'))

    if (signupDate) {
      dispatch({
        type: actionTypes.TRACKING,
        optimizelyData: {
          type: 'user',
          eventName: 'user_subscription_start',
          attributes: {
            isSignupInLast30Days,
          }
        }
      })
    }
  }
)

export default {
  trackFirstPurchase,
  setAffiliateSource,
  trackRecipeOrderDisplayed,
}
