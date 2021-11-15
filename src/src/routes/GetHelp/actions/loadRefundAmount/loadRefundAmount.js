import { getAccessToken } from "selectors/auth"
import { getUserId } from "selectors/user"
import { getOrderId, getSelectedIngredients } from "routes/GetHelp/selectors/selectors"
import { fetchRefundAmount } from "apis/getHelp/fetchRefundAmount"
import { trackIngredientsAutoAcceptCheck } from "routes/GetHelp/actions/getHelp/trackIngredientsAutoAcceptCheck"
import { asyncAndDispatch } from "routes/GetHelp/actions/utils"
import { actionTypes } from "routes/GetHelp/actions/actionTypes"

export const loadRefundAmount = () => async (dispatch, getState) => {
    const state = getState()
    const accessToken = getAccessToken(state)
    const userId = getUserId(state)
    const orderId = getOrderId(state)
    const selectedIngredients = getSelectedIngredients(state)
    const ingredientUuids = Object.keys(selectedIngredients).map(
        key => selectedIngredients[key].ingredientUuid
    )
    const body = {
        customer_id: Number(userId),
        order_id: Number(orderId),
        ingredient_ids: ingredientUuids,
    }

    const getPayload = async () => {
        const response = await fetchRefundAmount(accessToken, body)
        const {value, type, multiComplaintTotalValue} = response.data

        const MAX_AUTO_ACCEPT_AMOUNT = 2.0
        const MAX_AUTO_ACCEPT_INGREDIENTS = 1

        const isAutoAccept = value <= MAX_AUTO_ACCEPT_AMOUNT
            && ingredientUuids.length <= MAX_AUTO_ACCEPT_INGREDIENTS

        const isMultiComplaint = Boolean(multiComplaintTotalValue)

        dispatch(trackIngredientsAutoAcceptCheck(isAutoAccept, isMultiComplaint))

        return {
            amount: value,
            totalAmount: multiComplaintTotalValue,
            type,
            isAutoAccept
        }
    }

    await asyncAndDispatch({
        dispatch,
        actionType: actionTypes.GET_HELP_LOAD_REFUND_AMOUNT,
        getPayload,
        errorMessage: `Failed to loadRefundAmount for orderId: ${orderId}, userId: ${userId}, ingredientIds: ${ingredientUuids}`
    })
}
