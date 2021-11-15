import { getAccessToken } from "selectors/auth"
import { getUserId } from "selectors/user"
import { getOrderId, getSelectedIngredients } from "routes/GetHelp/selectors/selectors"
import { getCompensation } from "routes/GetHelp/selectors/compensationSelectors"
import { sanitize } from "utils/sanitizer"
import { setComplaint } from "apis/getHelp/setComplaint"
import { trackAcceptIngredientsRefund } from "actions/getHelp/trackAcceptIngredientsRefund"
import { push } from "react-router-redux"
import { client } from "config/routes"
import { asyncAndDispatch } from "routes/GetHelp/actions/utils"
import { actionTypes } from "routes/GetHelp/actions/actionTypes"

export const createComplaint = (isAutoAccept) => async (dispatch, getState) => {
    const state = getState()
    const accessToken = getAccessToken(state)
    const userId = getUserId(state)
    const orderId = getOrderId(state)
    const selectedIngredients = getSelectedIngredients(state)
    const {amount, type} = getCompensation(state)

    const issues = Object.keys(selectedIngredients).map(key => {
        const {
            issueId,
            ingredientUuid,
            issueDescription,
            recipeGoustoReference,
        } = selectedIngredients[key]

        return {
            category_id: Number(issueId),
            ingredient_id: ingredientUuid,
            description: sanitize(issueDescription),
            recipe_gousto_reference: recipeGoustoReference,
        }
    })

    const body = {
        customer_id: Number(userId),
        order_id: Number(orderId),
        type,
        value: amount,
        issues
    }

    const getPayload = async () => {
        await setComplaint(accessToken, body)
        dispatch(trackAcceptIngredientsRefund())

        if (isAutoAccept) {
            dispatch(push(`${client.getHelp.index}/${client.getHelp.autoAcceptConfirmation}`))
        } else {
            dispatch(push(`${client.getHelp.index}/${client.getHelp.confirmation}`))
        }

        return null
    }

    await asyncAndDispatch({
        dispatch,
        actionType: actionTypes.GET_HELP_CREATE_COMPLAINT,
        getPayload,
        errorMessage: `Failed to createComplaint for orderId: ${orderId}, userId: ${userId}`
    })
}
