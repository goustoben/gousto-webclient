import { actionTypes } from "actions/actionTypes"

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
