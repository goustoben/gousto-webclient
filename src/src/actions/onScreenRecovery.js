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
      type: actionTypes.ON_SCREEN_RECOVERY_MODAL_VISIBILITY_CHANGE,
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

export const keepOrder = ({ orderId, deliveryDayId, status }) => (
  (dispatch, getState) => {
    const valueProposition = getState().onScreenRecovery.get('valueProposition')
    const offer = getState().onScreenRecovery.get('offer')

    dispatch({
      type: actionTypes.ON_SCREEN_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility: false,
      orderId,
      trackingData: {
        actionType: 'Order Kept',
        order_id: orderId,
        delivery_day_id: deliveryDayId,
        order_state: status,
        recovery_reasons: [
          valueProposition,
          offer,
        ],
      },
    })
  }
)

export const cancelPendingOrder = (orderId, deliveryDayId, variation = 'default') => (
  async (dispatch) => {
    try {
      await dispatch(orderCancel(orderId, deliveryDayId, variation))
    } catch (err) {
      logger.error(err)
    } finally {
      dispatch(redirect('/my-deliveries'))
      dispatch({
        type: actionTypes.ON_SCREEN_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: false,
      })
    }
  }
)

export const cancelProjectedOrder = (deliveryDayId, variation = 'default') => (
  async (dispatch) => {
    try {
      await dispatch(projectedOrderCancel(deliveryDayId, deliveryDayId, variation))
    } catch (err) {
      logger.error(err)
    } finally {
      dispatch(redirect('/my-deliveries'))
      dispatch({
        type: actionTypes.ON_SCREEN_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: false,
      })
    }
  }
)

export const getSkipRecoveryContent = ({ orderId, orderDate, deliveryDayId, status, actionTriggered }) => (
  async (dispatch, getState) => {
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
          cancelPendingOrder(orderId, deliveryDayId)
        } else {
          cancelProjectedOrder(deliveryDayId)
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
