import { validateDelivery } from "apis/getHelp/validateDelivery"
import { actionTypes } from "routes/GetHelp/actions/actionTypes"
import { asyncAndDispatch } from "routes/GetHelp/actions/utils"

export const validateDeliveryAction = (customerId, orderId) => async (dispatch, getState) => {
    const getPayload = async () => {
        const accessToken = getState().auth.get('accessToken')
        const response = await validateDelivery(accessToken, customerId, orderId)
        const {compensation} = response.data

        return {compensation, isValid: true}
    }

    const handleError = () => {
        dispatch({
            type: actionTypes.GET_HELP_VALIDATE_DELIVERY,
            payload: {compensation: null, isValid: false}
        })
    }

    await asyncAndDispatch({
        dispatch,
        actionType: actionTypes.GET_HELP_VALIDATE_DELIVERY,
        getPayload,
        handleError,
        errorMessage: `Delivery validation errored for customerId: ${customerId}, orderId: ${orderId}`,
    })
}
