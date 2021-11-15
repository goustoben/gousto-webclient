import { client as clientRoutes } from "config/routes"
import { applyDeliveryCompensation } from "apis/getHelp/applyDeliveryCompensation"
import { browserHistory } from "react-router"
import { asyncAndDispatch } from "routes/GetHelp/actions/utils"
import { actionTypes } from "routes/GetHelp/actions/actionTypes"

export const applyDeliveryRefund = (
    userId,
    orderId,
    complaintCategory,
) => async (dispatch, getState) => {
    const getPayload = async () => {
        const accessToken = getState().auth.get('accessToken')
        const {index, confirmation} = clientRoutes.getHelp
        await applyDeliveryCompensation(accessToken, userId, orderId, complaintCategory)
        browserHistory.push(`${index}/${confirmation}`)
    }

    await asyncAndDispatch({
        dispatch,
        actionType: actionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
        getPayload,
        errorMessage: `Failed to applyDeliveryRefund for userId: ${userId}, orderId: ${orderId}`,
    })
}
