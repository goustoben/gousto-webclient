import { fetchDeliveryConsignment } from "apis/deliveries/fetchDeliveryConsignment"
import { asyncAndDispatch } from "routes/GetHelp/actions/utils"
import { actionTypes } from "routes/GetHelp/actions/actionTypes"

export const loadTrackingUrl = (orderId) => async (dispatch, getState) => {
    const getPayload = async () => {
        const accessToken = getState().auth.get('accessToken')
        const response = await fetchDeliveryConsignment(accessToken, orderId)
        const {trackingUrl} = response.data[0]

        return {trackingUrl}
    }

    await asyncAndDispatch({
        dispatch,
        actionType: actionTypes.GET_HELP_LOAD_TRACKING_URL,
        getPayload,
        errorMessage: `Failed to loadTrackingUrl for orderId: ${orderId}`,
    })
}
