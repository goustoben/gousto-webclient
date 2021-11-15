import { generateModalTrackingData } from "actions/onScreenRecovery/generateModalTrackingData"
import { actionTypes } from "actions/actionTypes"

export const modalVisibilityChange = ({
                                          orderId,
                                          deliveryDayId,
                                          status,
                                          modalType,
                                          data = {},
                                          modalVisibility = true,
                                      }) => (
    (dispatch) => {
        const trackingData = generateModalTrackingData({
            modalVisibility,
            status,
            modalType,
            orderId,
            deliveryDayId,
            data,
        })

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
            trackingData,
        })
    }
)
