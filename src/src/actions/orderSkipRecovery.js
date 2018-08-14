import actionTypes from './actionTypes'
import { orderCancel } from './order'
import { redirect } from './redirect'
import logger from 'utils/logger'

export const keepOrder = ({ orderId, status }) => (
    (dispatch) => {
        dispatch({
            type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
            modalVisibility: false,
            orderId,
            trackingData: {
                type: 'Order Kept',
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
            dispatch(orderCancel(orderId))
        } catch (err) {
            logger.error(err.message)
        } finally {
            dispatch({
                type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
                modalVisibility: false,
                orderId,
            })
            dispatch(redirect('/my-deliveries'))
        }
    }
)
