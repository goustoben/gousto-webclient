import { client as clientRoutes } from 'config/routes'
import logger from 'utils/logger'
import { seActions } from 'middlewares/tracking/snowplow/pauseSubscription/seActions'
import * as windowUtils from 'utils/window'
import { actionTypes } from './actionTypes'
import { orderCancel, projectedOrderCancel } from './order'
import { redirect } from './redirect'
import subPauseActions from './subscriptionPause'
import userActions from './user'
import statusActions from './status'

import { fetchOrderSkipContent, fetchSubscriptionPauseContent } from '../apis/onScreenRecovery'

const SERVER_ERROR_500 = 500

export const generateModalTrackingData = ({
  modalVisibility,
  status,
  modalType,
  orderId,
  deliveryDayId,
  data,
}) => {
  if (modalType === 'subscription') {
    return modalVisibility
      ? null
      : { actionType: seActions.SUBSCRIPTION_KEPT_ACTIVE }
  }

  const actionType = (status === 'pending') ? 'Order Cancel' : 'Order Skip'

  return {
    actionType,
    order_id: orderId,
    delivery_day_id: deliveryDayId,
    order_state: status,
    cms_variation: data.variation || 'default',
    recovery_reasons: [
      data.valueProposition,
      data.offer,
    ],
  }
}

export const trackViewDiscountReminder = () => (dispatch) => dispatch({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: seActions.VIEW_PAUSE_DISCOUNT_REMINDER_OFFER_SCREEN
  }
})

export const modalVisibilityChange = ({
  orderId,
  deliveryDayId,
  status,
  modalType,
  data = {},
  modalVisibility = true,
}) => (
  (dispatch) => {
    const trackingData = generateModalTrackingData({
      modalVisibility,
      status,
      modalType,
      orderId,
      deliveryDayId,
      data,
    })

    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility,
      orderId,
      deliveryDayId,
      modalType,
      title: data.title,
      offer: data.offer,
      orderType: status,
      callToActions: data.callToActions,
      valueProposition: data.valueProposition,
      trackingData,
    })
  }
)

export const keepOrder = () => (
  (dispatch, getState) => {
    const valueProposition = getState().onScreenRecovery.get('valueProposition')
    const orderId = getState().onScreenRecovery.get('orderId')
    const deliveryDayId = getState().onScreenRecovery.get('deliveryDayId')
    const orderType = getState().onScreenRecovery.get('orderType')
    const offer = getState().onScreenRecovery.get('offer')

    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility: false,
      orderId,
      trackingData: {
        actionType: 'Order Kept',
        order_id: orderId,
        delivery_day_id: deliveryDayId,
        order_state: orderType,
        recovery_reasons: [
          valueProposition,
          offer,
        ],
      },
    })
  }
)

export const keepSubscription = () => (
  async (dispatch, getState) => {
    const userId = getState().user.get('id')
    const offer = getState().onScreenRecovery.get('offer')
    const promoCode = offer ? offer.promoCode : null
    if (promoCode) {
      await dispatch(userActions.userPromoApplyCode(promoCode))
      const errorInApplyPromo = getState().error && getState().error.get(actionTypes.PROMO_APPLY)

      if (errorInApplyPromo) {
        dispatch({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: 'Failed in applying OSR promo code',
            osrDiscount: promoCode,
          },
        })

        /*
          Early return to prevent modal close
          Because a user failed to apply OSR promo code.
          // TODO show error message or notification
        */
        return
      }
    }
    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility: false,
      trackingData: {
        actionType: seActions.SUBSCRIPTION_KEPT_ACTIVE,
        customerId: userId,
        osrDiscount: promoCode,
      },
    })
  }
)

export const cancelPendingOrder = (variation = 'default') => (
  async (dispatch, getState) => {
    const orderId = getState().onScreenRecovery.get('orderId')
    const deliveryDayId = getState().onScreenRecovery.get('deliveryDayId')
    const forceRefresh = getState().onScreenRecovery.get('forceRefresh')

    try {
      await dispatch(orderCancel(orderId, deliveryDayId, variation))
    } catch (err) {
      logger.error(err)
    } finally {
      if (forceRefresh) {
        dispatch(redirect('/my-deliveries'))
      }

      modalVisibilityChange({ modalVisibility: false })(dispatch)
    }
  }
)

export const cancelProjectedOrder = (variation = 'default') => (
  async (dispatch, getState) => {
    const deliveryDayId = getState().onScreenRecovery.get('deliveryDayId')
    const forceRefresh = getState().onScreenRecovery.get('forceRefresh')

    try {
      await dispatch(projectedOrderCancel(deliveryDayId, deliveryDayId, variation))
    } catch (err) {
      logger.error(err)
    } finally {
      if (forceRefresh) {
        dispatch(redirect('/my-deliveries'))
      }
      modalVisibilityChange({ modalVisibility: false })(dispatch)
    }
  }
)

export const getSkipRecoveryContent = () => (
  async (dispatch, getState) => {
    const orderDate = getState().onScreenRecovery.get('orderDate')
    const orderId = getState().onScreenRecovery.get('orderId')
    const deliveryDayId = getState().onScreenRecovery.get('deliveryDayId')
    const status = getState().onScreenRecovery.get('orderType')
    const modalType = 'order'
    const accessToken = getState().auth.get('accessToken')
    dispatch(statusActions.pending(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, true))
    dispatch(statusActions.error(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, null))
    try {
      const { data } = await fetchOrderSkipContent(accessToken, orderId, orderDate)
      if (data.intervene) {
        dispatch(modalVisibilityChange({
          orderId,
          deliveryDayId,
          status,
          modalType,
          data,
        }))
      } else if (status === 'pending') {
        await cancelPendingOrder(orderId, deliveryDayId)(dispatch, getState)
      } else {
        await cancelProjectedOrder(deliveryDayId)(dispatch, getState)
      }
    } catch (err) {
      dispatch(modalVisibilityChange({
        orderId,
        deliveryDayId,
        status,
        modalType,
      }))

      logger.error(err)
      dispatch(statusActions.error(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, false))
    }
  }
)

export const getPauseRecoveryContent = (enableOffer = true) => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const modalType = 'subscription'

    dispatch(statusActions.pending(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, true))
    dispatch(statusActions.error(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, null))

    let isIntervened = true

    try {
      const { data } = await fetchSubscriptionPauseContent(accessToken, enableOffer)

      isIntervened = data.intervene

      if (data.intervene) {
        dispatch(modalVisibilityChange({
          data,
          modalType
        }))

        const offer = getState().onScreenRecovery.get('offer')
        const promoCode = offer ? offer.promoCode : null
        const hasPendingPromo = offer === null ? null : offer.formattedValue
        const hasPendingPromoWithSubCondition = offer === null ? null : offer.requireActiveSubscription
        dispatch({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: seActions.SUBSCRIPTION_PAUSE_ATTEMPT,
            hasPendingPromo,
            hasPendingPromoWithSubCondition,
            osrDiscount: promoCode,
          },
        })
      } else {
        dispatch(subPauseActions.subscriptionDeactivate())
      }
    } catch (err) {
      logger.error(err)
      // subpauseosr might return 5xx error, do not block the end user, let it deactivate its subscription
      if (err.code >= SERVER_ERROR_500 && isIntervened) {
        await dispatch(pauseSubscription())

        return
      }
      dispatch(statusActions.error(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, false))
    }
  }
)

export const cancelOrder = () => (
  async (dispatch, getState) => {
    const orderType = getState().onScreenRecovery.get('orderType')
    if (orderType === 'pending') {
      cancelPendingOrder()(dispatch, getState)
    } else {
      cancelProjectedOrder()(dispatch, getState)
    }
  }
)

export const pauseSubscription = () => (
  async (dispatch, getState) => {
    await dispatch(subPauseActions.subscriptionDeactivate())

    const { user, onScreenRecovery } = getState()
    const userId = user.get('id')
    const offer = onScreenRecovery.get('offer')
    const promoCode = offer ? offer.promoCode : null
    const subscriptionPageURL = clientRoutes.mySubscription

    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility: false,
      trackingData: {
        actionType: seActions.SUBSCRIPTION_PAUSED,
        customerId: userId,
        osrDiscount: promoCode,
      },
    })

    windowUtils.redirect(subscriptionPageURL)
  }
)

export const onKeep = () => (
  async (dispatch, getState) => {
    const modalType = getState().onScreenRecovery.get('modalType')
    if (modalType === 'order') {
      keepOrder()(dispatch, getState)
    } else if (modalType === 'subscription') {
      keepSubscription()(dispatch, getState)
    }
  }
)

export const onConfirm = () => (
  async (dispatch, getState) => {
    const modalType = getState().onScreenRecovery.get('modalType')
    if (modalType === 'order') {
      cancelOrder()(dispatch, getState)
    } else if (modalType === 'subscription') {
      pauseSubscription()(dispatch, getState)
    }
  }
)

export const getRecoveryContent = () => (
  async (dispatch, getState) => {
    const modalType = getState().onScreenRecovery.get('modalType')

    if (modalType === 'order') {
      getSkipRecoveryContent()(dispatch, getState)
    } else if (modalType === 'subscription') {
      getPauseRecoveryContent()(dispatch, getState)
    }
  }
)

export const orderCancelStart = (
  orderId,
  deliveryDayId,
  orderDate,
  orderType
) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
      triggered: true,
      orderId,
      deliveryDayId,
      orderDate,
      modalType: 'order',
      orderType,
    })
  }
)

export const startOnScreenRecoverySubscriptionFlow = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
      triggered: true,
      modalType: 'subscription',
    })
  }
)
