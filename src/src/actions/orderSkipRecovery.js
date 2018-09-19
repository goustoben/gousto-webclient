import actionTypes from './actionTypes'
import { orderCancel, projectedOrderCancel } from './order'
import { redirect } from './redirect'
import logger from 'utils/logger'
import { fetchOrderSkipContent } from '../apis/orderSkipRecovery'

export const modalVisibilityChange = ({
    orderId,
    status,
    actionTriggered,
    data = {},
}) => (
    (dispatch) => {
        dispatch({
            type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
            modalVisibility: true,
            orderId,
            title: data.title,
            valueProposition: data.value_proposition,
            callToActions: data.call_to_actions,
            trackingData: {
                actionType: `Order ${actionTriggered}`,
                order_id: orderId,
                order_state: status,
                cms_variation: data.variation || 'default',
                recovery_reasons: [
                    data.value_proposition,
                ],
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

export const getSkipRecoveryContent = ({ orderId, orderDate, dayId, status, actionTriggered }) => (
    async (dispatch, getState) => {
        const accessToken = getState().auth.get('accessToken')
		try {
            const { data }  = await fetchOrderSkipContent(accessToken, orderId, orderDate)

            if (data.intervene) {
                dispatch(modalVisibilityChange({
                    orderId,
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
            logger.notice(err)

            modalVisibilityChange({
                orderId,
                status,
                actionTriggered,
            })
		}
    }
)
