import actionTypes from './actionTypes'
import { orderCancel, projectedOrderCancel } from './order'
import { redirect } from './redirect'
import logger from 'utils/logger'
import { fetchOrderSkipContent } from '../apis/orderSkipRecovery'

const modalVisibilityChange = ({ orderId, status, actionTriggered, reasons }) => (
    (dispatch) => {
        dispatch({
            type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
            modalVisibility: true,
            orderId,
            trackingData: {
                actionType: `Order ${actionTriggered}`,
                order_id: orderId,
                order_state: status,
                recovery_reasons: reasons,
            },
        })
    }
)

export const keepOrder = ({ orderId, status }) => (
    (dispatch) => {
        dispatch({
            type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
            modalVisibility: false,
            orderId,
            trackingData: {
                actionType: 'Order Kept',
                order_id: orderId,
                order_state: status,
                recovery_reasons: [],
            },
        })
    }
)

export const cancelPendingOrder = (orderId) => (
    async (dispatch) => {
        try {
            await dispatch(orderCancel(orderId))
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

export const cancelProjectedOrder = (dayId) => (
    async (dispatch) => {
        try {
           await dispatch(projectedOrderCancel(dayId, dayId))
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

export const getSkipRecoveryContent = ({ orderId, dayId, status, actionTriggered }) => (
    async (dispatch, getState) => {
        const accessToken = getState().auth.get('accessToken')
		try {
            // await call to server (maybe send accessToken)
            const { data: callAnswer = [] }  = await fetchOrderSkipContent(accessToken, orderId)
            const reasons = [callAnswer.offer, callAnswer.value_proposition]
            if (callAnswer.intervene) {
                dispatch(modalVisibilityChange(orderId, status, actionTriggered, reasons))
            } else {
                if (status === 'pending') {
                    cancelPendingOrder(orderId)
                } else {
                    cancelProjectedOrder(dayId)
                }
            }
		} catch (err) {
			//
		} finally {
			//
		}
    }
)
