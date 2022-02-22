// global AWIN
import moment from 'moment'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import globals from 'config/globals'
import { translateCheckoutErrorToMessageCode } from 'utils/checkout'
import logger from 'utils/logger'
import { getUserOrderById } from 'utils/user'
import { getUTM } from 'utils/utm'
import { getPreviewOrderId } from 'selectors/basket'
import { getCurrentPaymentMethod } from 'selectors/payment'
import { getUTMAndPromoCode, getTransactionType } from 'selectors/tracking'
import { feLoggingLogEvent, logLevels } from 'actions/log'
import { trackOrder } from 'apis/tracking'
import { canUseWindow } from 'utils/browserEnvironment'

const collectionRecommendationSlug = 'recommendations'

export const trackFirstPurchase = (orderId, prices) => (
  (dispatch, getState) => {
    const { user } = getState()
    const goustoReference = user.get('goustoReference')
    const order = getUserOrderById(orderId, user.get('orders'))
    const orderTotal = prices?.total
    const grossTotal = prices?.grossTotal

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

export const setAwinClickChecksum = (awc) => (
  dispatch => {
    dispatch({
      type: actionTypes.AWIN_CLICK_CHECKSUM_SET,
      awc,
    })
  }
)

export const setTapjoyTransactionId = (transactionId) => ({
  type: actionTypes.SET_TAPJOY_TRANSACTION_ID,
  transactionId,
})

export const clearTapjoy = () => setTapjoyTransactionId('')

export const trackAffiliatePurchase = ({
  orderId,
  total,
  commissionGroup,
  promoCode,
  isSignup = false
}) =>
  async (dispatch, getState) => {
    const awinEnabled = !!(canUseWindow() && window.AWIN)
    const { tracking } = getState()
    const awc = tracking.get('awc')
    const tapjoy = tracking.get('tapjoy')
    let sendData = false

    if (!orderId) {
      await dispatch(
        feLoggingLogEvent(
          logLevels.error,
          'trackAffiliatePurchase: missing orderId',
          { orderId, total, commissionGroup, promoCode }
        )
      )

      return
    }

    if (!awinEnabled) {
      await dispatch(
        feLoggingLogEvent(
          logLevels.error,
          'trackAffiliatePurchase: Awin not in execution context',
          { orderId, total, commissionGroup, promoCode }
        )
      )
    }

    if (awinEnabled) {
      const sale = {
        amount: total,
        channel: '',
        orderRef: orderId,
        parts: `${commissionGroup}:${total}`,
        voucher: promoCode,
        currency: 'GBP',
        test: globals.env === 'production' ? '0' : '1',
      }

      await dispatch(
        feLoggingLogEvent(logLevels.info, 'trackAffiliatePurchase: sending awin request', { sale })
      )

      // Example #2 from
      // https://wiki.awin.com/index.php/Advertiser_Tracking_Guide/Standard_Implementation#Conversion_Tag
      window.AWIN.Tracking.Sale = sale
      window.AWIN.Tracking.run()
    }

    const request = {
      common: {
        order_id: orderId
      }
    }

    if (awinEnabled && awc) {
      sendData = true
      request.awin = {
        merchant: '5070',
        cr: 'GBR',
        amount: total,
        parts: `${commissionGroup}:${total}`,
        cks: awc,
      }
    }

    if (isSignup && tapjoy) {
      sendData = true
      request.tapjoy = {
        transaction_id: tapjoy
      }
    }

    if (sendData) {
      try {
        await trackOrder(request)
      } catch (err) {
        feLoggingLogEvent(
          logLevels.error,
          'trackAffiliatePurchase: failed to send order data',
          request
        )
      }
    } else {
      feLoggingLogEvent(
        logLevels.info,
        'trackAffiliatePurchase: no marketing partners data',
        request
      )
    }
  }

export const trackRecipeOrderDisplayed = (displayedOrder) => (
  (dispatch, getState) => {
    const state = getState()
    const date = state.basket.get('date')
    const currentMenuId = state.basket.get('currentMenuId')
    const transactionType = getTransactionType(state)
    const deliveryDayId = state.boxSummaryDeliveryDays.getIn([date, 'id'])
    const orderId = state.basket.get('orderId')
    const browseMode = state.menuBrowseCtaShow
    const recommended = state.recipes.some(recipe => recipe.get('isRecommended', false))
    const collectionId = state.filters.get('currentCollectionId')
    const recommenderVersion = state.menuService.meta.recommendations && state.menuService.meta.recommendations.version
    const isRecommendationsShown = Boolean(state.menuService.collection && Object.values(state.menuService.collection).find(collection => collection.attributes.slug === collectionRecommendationSlug))

    dispatch({
      type: actionTypes.RECIPES_DISPLAYED_ORDER_TRACKING,
      displayedOrder,
      collectionId,
      deliveryDayId,
      orderId,
      recommended,
      browseMode,
      recommenderVersion,
      isRecommendationsShown,
      currentMenuId,
      transactionType
    })
  }
)

export const trackNavigationClick = (trackingData) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData
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

export const setUTMSource = () => (dispatch, getState) => {
  const { tracking } = getState()

  if (!tracking.get('utmSource')) {
    dispatch({
      type: actionTypes.SET_UTM_SOURCE,
      payload: {
        ...getUTM()
      }
    })
  }
}

export const trackGetStarted = (section) => (dispatch, getState) => {
  const { promoCode, UTM } = getUTMAndPromoCode(getState())
  const type = trackingKeys.clickGetStarted

  dispatch({
    type,
    trackingData: {
      actionType: type,
      section,
      ...UTM,
      promoCode
    }
  })
}

export const trackSubmitOrderEvent = () => (dispatch, getState) => {
  const state = getState()
  const { promoCode, UTM } = getUTMAndPromoCode(state)
  const paymentMethod = getCurrentPaymentMethod(state)
  const type = trackingKeys.clickSubmitOrder

  dispatch({
    type,
    trackingData: {
      actionType: type,
      ...UTM,
      promoCode,
      paymentMethod,
    }
  })
}

export const trackUTMAndPromoCode = (keyType, additionalData = {}) => (dispatch, getState) => {
  const { promoCode, UTM } = getUTMAndPromoCode(getState())
  // eslint-disable-next-line import/namespace
  const type = trackingKeys[keyType] || keyType

  dispatch({
    type,
    trackingData: {
      actionType: type,
      ...additionalData,
      ...UTM,
      promoCode,
    }
  })
}

const getNewRecordStatus = (record) => (record ? 'success' : 'failed')

export const trackNewUser = (userId) => (dispatch, getState) => {
  const state = getState()
  const { UTM, promoCode } = getUTMAndPromoCode(state)
  const paymentMethod = getCurrentPaymentMethod(state)
  const status = getNewRecordStatus(userId)
  const type = trackingKeys.createUser

  dispatch({
    type,
    trackingData: {
      actionType: type,
      promoCode,
      ...UTM,
      paymentMethod,
      userId,
      status,
    }
  })
}

export const trackNewOrder = (orderId, userId) => (dispatch, getState) => {
  const state = getState()
  const { UTM, promoCode } = getUTMAndPromoCode(state)
  const paymentMethod = getCurrentPaymentMethod(state)
  const status = getNewRecordStatus(userId)
  const type = trackingKeys.createOrder

  dispatch({
    type,
    trackingData: {
      actionType: type,
      promoCode,
      ...UTM,
      paymentMethod,
      orderId,
      userId,
      status,
    }
  })
}

export const trackSubscriptionCreated = ({ pricing }) => (dispatch, getState) => {
  const state = getState()
  const { UTM } = getUTMAndPromoCode(state)
  const { promoCode } = pricing
  const paymentMethod = getCurrentPaymentMethod(state)
  const orderId = getPreviewOrderId(state)
  const userId = state.user.get('id')
  const subscriptionId = state.user.get('subscription').get('id')
  const type = trackingKeys.subscriptionCreated

  dispatch({
    type,
    trackingData: {
      actionType: type,
      promoCode,
      ...UTM,
      paymentMethod,
      userId,
      orderId,
      subscriptionId,
    }
  })
}

export const trackingOrderCheckout = ({ pricing }) => (dispatch, getState) => {
  const { basket, user, temp } = getState()
  const basketOrderId = basket.get('orderId')
  const editingBox = basket.get('editBox')
  const orders = user.get('orders')
  const subscription = user.get('subscription')
  const isActiveSubsc = subscription && (subscription.get('state') === 'active')
  const originalGrossTotal = temp.get('originalGrossTotal')
  const originalNetTotal = temp.get('originalNetTotal')
  const orderTotal = pricing?.total
  const grossTotal = pricing?.grossTotal
  const editedGrossTotal = originalGrossTotal && grossTotal ? (grossTotal - originalGrossTotal).toFixed(2) : ''
  const editedNetTotal = originalNetTotal && orderTotal ? (orderTotal - originalNetTotal).toFixed(2) : ''
  const promoCode = pricing?.promoCode

  if (orders.get(basketOrderId)) {
    const orderItems = orders.get(basketOrderId).get('recipeItems')
    if (orderItems.size) {
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'Order Edited',
          order_id: basketOrderId,
          order_total: orderTotal,
          promo_code: promoCode,
          signp: false,
          subscription_active: isActiveSubsc,
        },
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_gross',
          tags: {
            revenue: editedGrossTotal
          }
        }
      })
      dispatch({
        type: actionTypes.TRACKING,
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_net',
          tags: {
            revenue: editedNetTotal
          }
        }
      })
    } else {
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: trackingKeys.placeOrder,
          order_id: basketOrderId,
          order_total: orderTotal,
          promo_code: promoCode,
          signp: false,
          subscription_active: isActiveSubsc,
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
  } else if (editingBox) {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'Order Edited',
        order_id: basketOrderId,
        order_total: orderTotal,
        promo_code: promoCode,
        signp: false,
        subscription_active: isActiveSubsc,
      },
      optimizelyData: {
        type: 'event',
        eventName: 'order_edited_gross',
        tags: {
          revenue: editedGrossTotal
        }
      }
    })
    dispatch({
      type: actionTypes.TRACKING,
      optimizelyData: {
        type: 'event',
        eventName: 'order_edited_net',
        tags: {
          revenue: editedNetTotal
        }
      }
    })
  } else {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: trackingKeys.placeOrder,
        order_id: basketOrderId,
        order_total: orderTotal,
        promo_code: promoCode,
        signp: false,
        subscription_active: isActiveSubsc,
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
}

export const trackClickBuildMyBox = (boxSize, destination) => (dispatch, getState) => {
  const { UTM, promoCode } = getUTMAndPromoCode(getState())
  const type = trackingKeys.clickBuildMyBox

  dispatch({
    type,
    trackingData: {
      actionType: type,
      promoCode,
      ...UTM,
      boxSize,
      destination
    }
  })
}

export const trackDiscountVisibilityBannerAppearance = (wizardStep) => (dispatch, getState) => {
  const { UTM, promoCode } = getUTMAndPromoCode(getState())
  const type = trackingKeys.discountVisibilityBannerDisplayed

  dispatch({
    type,
    trackingData: {
      actionType: type,
      ...UTM,
      promoCode,
      step: wizardStep
    }
  })
}

export const trackCheckoutNavigationLinks = (checkoutStep) => (dispatch, getState) => {
  const { UTM, promoCode } = getUTMAndPromoCode(getState())
  // eslint-disable-next-line import/namespace
  const type = trackingKeys[`click${checkoutStep}Breadcrumb`]

  dispatch({
    type,
    trackingData: {
      actionType: type,
      ...UTM,
      promoCode
    }
  })
}

export const trackCheckoutError = (errorName, errorValue, initiator) => (dispatch, getState) => {
  const { UTM, promoCode } = getUTMAndPromoCode(getState())
  const actionType = trackingKeys.checkoutError

  const messageCode = translateCheckoutErrorToMessageCode(errorName, errorValue)

  dispatch({
    type: actionType,
    trackingData: {
      actionType,
      ...UTM,
      promoCode,
      initiator,
      errorName,
      errorValue,
      messageCode,
    }
  })
}

export const trackShowcaseMenuAction = (type, additionalData = {}) => (dispatch, getState) => {
  const { promoCode, UTM } = getUTMAndPromoCode(getState())

  dispatch({
    type,
    trackingData: {
      actionType: type,
      ...UTM,
      promoCode,
      ...additionalData
    }
  })
}

export const trackUnexpectedSignup = () => (dispatch, getState) => {
  const state = getState()
  const { user } = state
  const { promoCode, UTM } = getUTMAndPromoCode(getState())
  const type = trackingKeys.unexpectedSignup

  dispatch({
    type,
    trackingData: {
      actionType: type,
      ...UTM,
      promoCode,
      orderId: getPreviewOrderId(state),
      userId: user.get('id'),
    }
  })
}
