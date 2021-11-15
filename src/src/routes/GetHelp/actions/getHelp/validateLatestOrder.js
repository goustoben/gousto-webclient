import { pending } from "actions/status/pending"
import { actionTypes as webClientActionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import { validateOrder } from "apis/getHelp/validateOrder"
import { appendFeatureToRequest } from "routes/GetHelp/utils/appendFeatureToRequest"

export const validateLatestOrder = ({
                                        accessToken,
                                        orderId,
                                        costumerId
                                    }) => async (dispatch) => {
    dispatch(pending(webClientActionTypes.GET_HELP_VALIDATE_ORDER, true))
    dispatch(error(webClientActionTypes.GET_HELP_VALIDATE_ORDER, ''))

    try {
        const response = await validateOrder(
            accessToken,
            appendFeatureToRequest({
                body: {
                    customer_id: Number(costumerId),
                    order_id: Number(orderId),
                },
            })
        )
        const {massIssueIneligibleIngredientUuids, otherIssueIneligibleIngredientUuids} = response.data

        dispatch({
            type: webClientActionTypes.GET_HELP_VALIDATE_ORDER,
            massIssueIneligibleIngredientUuids,
            otherIssueIneligibleIngredientUuids,
        })
    } catch (error) {
        dispatch(error(webClientActionTypes.GET_HELP_VALIDATE_ORDER, error.message))
    } finally {
        dispatch(pending(webClientActionTypes.GET_HELP_VALIDATE_ORDER, false))
    }
}
