import { actionTypes } from "actions/actionTypes"

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
