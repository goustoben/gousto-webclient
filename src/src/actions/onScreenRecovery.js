import logger from 'utils/logger'
import actionTypes from './actionTypes'
import { orderCancel, projectedOrderCancel } from './order'
import { redirect } from './redirect'
import subPauseActions from './subscriptionPause'
import { fetchOrderSkipContent, fetchSubscriptionPauseContent } from '../apis/onScreenRecovery'

export const modalVisibilityChange = ({
  orderId,
  deliveryDayId,
  status,
  modalType,
  data = {},
}) => (
  (dispatch) => {

    const actionType = (status === 'pending') ? 'Order Cancel' : 'Order Skip'

    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility: true,
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
      dispatch({
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: false,
      })
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
      dispatch({
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: false,
      })
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
      } else {
        dispatch(subPauseActions.subscriptionDeactivate())
      }
    } catch (err) {
      logger.error(err)
    }
  }
)

export const onKeep = () => (
  async (dispatch, getState) => {
    keepOrder()(dispatch, getState)
  }
)

export const cancelOrder = () => {
  async (dispatch, getState) => {
    const orderType = getState().onScreenRecovery.get('orderType')
    if (orderType === 'pending') {
      cancelPendingOrder()(dispatch, getState)
    } else {
      cancelProjectedOrder()(dispatch, getState)
    }
  }
}

export const onConfirm = () => (
  async (dispatch, getState) => {
    const modalType = getState().onScreenRecovery.get('modalType')
    if(modalType === 'order') {
      cancelOrder()(dispatch, getState)
    } else if (modalType === 'subscription') {
      subPauseActions.subscriptionDeactivate()(dispatch, getState)
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
