import logger from 'utils/logger'
import actionTypes from './actionTypes'
import { orderCancel, projectedOrderCancel } from './order'
import { redirect } from './redirect'
import { fetchOrderSkipContent } from '../apis/orderSkipRecovery'

export const modalVisibilityChange = ({
  orderId,
  dayId,
  status,
  actionTriggered,
  data = {},
}) => (
  (dispatch, getState) => {
    const featureFlag = getState().features.getIn(['skipRecovery', 'value'])

    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility: true,
      orderId,
      dayId,
      title: data.title,
      offer: data.offer,
      orderType: status,
      callToActions: data.callToActions,
      valueProposition: data.valueProposition,
      trackingData: {
        actionType: `Order ${actionTriggered}`,
        order_id: orderId,
        delivery_day_id: dayId,
        order_state: status,
        cms_variation: data.variation || 'default',
        featureFlag,
        recovery_reasons: [
          data.valueProposition,
          data.offer,
        ],
      },
    })
  }
)

export const keepOrder = ({ orderId, dayId, status }) => (
  (dispatch, getState) => {
    const valueProposition = getState().orderSkipRecovery.get('valueProposition')
    const offer = getState().orderSkipRecovery.get('offer')
    const featureFlag = getState().features.getIn(['skipRecovery', 'value'])

    dispatch({
      type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
      modalVisibility: false,
      orderId,
      trackingData: {
        actionType: 'Order Kept',
        order_id: orderId,
        delivery_day_id: dayId,
        order_state: status,
        featureFlag,
        recovery_reasons: [
          valueProposition,
          offer,
        ],
      },
    })
  }
)

export const cancelPendingOrder = (orderId, dayId, variation = 'default') => (
  async (dispatch) => {
    try {
      await dispatch(orderCancel(orderId, dayId, variation))
    } catch (err) {
      logger.error(err.message)
    } finally {
      dispatch(redirect('/my-deliveries'))
      dispatch({
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: false,
      })
    }
  }
)

export const cancelProjectedOrder = (dayId, variation = 'default') => (
  async (dispatch) => {
    try {
      await dispatch(projectedOrderCancel(dayId, dayId, variation))
    } catch (err) {
      logger.error(err.message)
    } finally {
      dispatch(redirect('/my-deliveries'))
      dispatch({
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: false,
      })
    }
  }
)

export const getSkipRecoveryContent = ({ orderId, orderDate, dayId, status, actionTriggered }) => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    try {
      const { data } = await fetchOrderSkipContent(accessToken, orderId, orderDate)

      if (data.intervene) {
        dispatch(modalVisibilityChange({
          orderId,
          dayId,
          status,
          actionTriggered,
          data,
        }))
      } else {
        if (status === 'pending') {
          cancelPendingOrder(orderId)
        } else {
          cancelProjectedOrder(dayId)
        }
      }
    } catch (err) {
      dispatch(modalVisibilityChange({
        orderId,
        dayId,
        status,
        actionTriggered,
      }))
      logger.notice(err)
    }
  }
)
