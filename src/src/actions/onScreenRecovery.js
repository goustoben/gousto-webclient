import logger from 'utils/logger'
import actionTypes from './actionTypes'
import { orderCancel, projectedOrderCancel } from './order'
import { redirect } from './redirect'
import { fetchOrderSkipContent } from '../apis/onScreenRecovery'

export const modalVisibilityChange = ({
  orderId,
  deliveryDayId,
  status,
  actionTriggered,
  data = {},
}) => (
  (dispatch) => {

    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility: true,
      orderId,
      deliveryDayId,
      title: data.title,
      offer: data.offer,
      orderType: status,
      callToActions: data.callToActions,
      valueProposition: data.valueProposition,
      trackingData: {
        actionType: `Order ${actionTriggered}`,
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
    const actionTriggered = (status === 'pending') ? 'Cancel' : 'Skip'
    const accessToken = getState().auth.get('accessToken')
    try {
      const { data } = await fetchOrderSkipContent(accessToken, orderId, orderDate)
      if (data.intervene) {
        dispatch(modalVisibilityChange({
          orderId,
          deliveryDayId,
          status,
          actionTriggered,
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
        actionTriggered,
      }))

      logger.error(err)
    }
  }
)

export const onKeep = () => (
  async (dispatch, getState) => {
    dispatch(keepOrder()(dispatch, getState))
  }
)

export const onConfirm = () => (
  async (dispatch, getState) => {
    const orderType = getState().onScreenRecovery.get('orderType')
    if (orderType === 'pending') {
      dispatch(cancelPendingOrder()(dispatch, getState))
    } else {
      dispatch(cancelProjectedOrder()(dispatch, getState))
    }
  }
)

export const getRecoveryContent = () => (
  async (dispatch, getState) => {
    dispatch(getSkipRecoveryContent()(dispatch, getState))
  }
)
