import logger from 'utils/logger'
import actionTypes from './actionTypes'
import { orderCancel, projectedOrderCancel } from './order'
import { redirect } from './redirect'
import subPauseActions from './subscriptionPause'
import userActions from './user'
import { fetchOrderSkipContent, fetchSubscriptionPauseContent } from '../apis/onScreenRecovery'

export const modalVisibilityChange = ({
  orderId,
  deliveryDayId,
  status,
  modalType,
  data = {},
  modalVisibility = true,
}) => (
  (dispatch) => {

    const actionType = (status === 'pending') ? 'Order Cancel' : 'Order Skip'

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
      trackingData: {
        actionType: actionType,
        order_id: orderId,
        delivery_day_id: deliveryDayId,
        order_state: status,
        cms_variation: data.variation || 'default',
        recovery_reasons: [
          data.valueProposition,
          data.offer,
        ],
      },
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
      errorInApplyPromo
      const errorInApplyPromo = getState().error && getState().error.get(actionTypes.PROMO_APPLY)

      if (errorInApplyPromo) {
        dispatch({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: 'Failed in applying OSR promo code',
            promoCode,
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
        actionType: 'Subscription KeptActive',
        customerId: userId,
      },
    })
  }
)

export const cancelPendingOrder = (variation = 'default') => (
  async (dispatch, getState) => {
    const orderId = getState().onScreenRecovery.get('orderId')
    const deliveryDayId = getState().onScreenRecovery.get('deliveryDayId')

    try {
      await dispatch(orderCancel(orderId, deliveryDayId, variation))
    } catch (err) {
      logger.error(err)
    } finally {
      dispatch(redirect('/my-deliveries'))
      modalVisibilityChange({ modalVisibility: false })(dispatch)
    }
  }
)

export const cancelProjectedOrder = (variation = 'default') => (
  async (dispatch, getState) => {
    const deliveryDayId = getState().onScreenRecovery.get('deliveryDayId')

    try {
      await dispatch(projectedOrderCancel(deliveryDayId, deliveryDayId, variation))
    } catch (err) {
      logger.error(err)
    } finally {
      dispatch(redirect('/my-deliveries'))
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
      } else {
        if (status === 'pending') {
          await cancelPendingOrder(orderId, deliveryDayId)(dispatch, getState)
        } else {
          await cancelProjectedOrder(deliveryDayId)(dispatch, getState)
        }
      }
    } catch (err) {
      dispatch(modalVisibilityChange({
        orderId,
        deliveryDayId,
        status,
        modalType,
      }))

      logger.error(err)
    }
  }
)

export const getPauseRecoveryContent = () => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const modalType = 'subscription'
    try {
      const { data } = await fetchSubscriptionPauseContent(accessToken)
      if (data.intervene) {
        dispatch(modalVisibilityChange({
          data,
          modalType
        }))

        const orders = getState().user.get('orders')
        const orderCount = Math.max(
          ...(orders.toArray().filter(
            (o) => o.get('state') === 'committed'
          ).map(
            (o) => Number(o.get('number'))
          )),
          0
        )
        const offer = getState().onScreenRecovery.get('offer')
        const hasPendingPromo = offer === null ? null : offer.formattedValue
        const hasPendingPromoWithSubCondition = offer === null ? null : offer.requireActiveSubscription
        dispatch({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: 'Subscription Pause',
            orderCount,
            hasPendingPromo,
            hasPendingPromoWithSubCondition,
          },
        })
      } else {
        dispatch(subPauseActions.subscriptionDeactivate())
      }
    } catch (err) {
      logger.error(err)
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

    const userId = getState().user.get('id')
    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility: false,
      trackingData: {
        actionType: 'Subscription Paused',
        customerId: userId,
      },
    })

    dispatch(redirect('/my-subscription'))
  }
)

export const onKeep = () => (
  async (dispatch, getState) => {
    const modalType = getState().onScreenRecovery.get('modalType')
    if(modalType === 'order') {
      keepOrder()(dispatch, getState)
    } else if (modalType === 'subscription') {
      keepSubscription()(dispatch, getState)
    }
  }
)

export const onConfirm = () => (
  async (dispatch, getState) => {
    const modalType = getState().onScreenRecovery.get('modalType')
    if(modalType === 'order') {
      cancelOrder()(dispatch, getState)
    } else if (modalType === 'subscription') {
      pauseSubscription()(dispatch, getState)
    }
  }
)

export const getRecoveryContent = () => (
  async (dispatch, getState) => {
    const modalType = getState().onScreenRecovery.get('modalType')

    if(modalType === 'order'){
      getSkipRecoveryContent()(dispatch, getState)
    } else if (modalType === 'subscription') {
      getPauseRecoveryContent()(dispatch, getState)
    }
  }
)
