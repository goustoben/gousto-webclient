import { getAccessToken } from 'selectors/auth'
import { getUserId } from 'selectors/user'
import { fetchRefundAmount } from '../apis/ssrIngredients'
import { getOrderId, getSelectedIngredients } from '../selectors/selectors'
import { getIsAutoAcceptEnabled } from '../../../selectors/features'
import { trackIngredientsAutoAcceptCheck } from './getHelp'
import { asyncAndDispatch } from './utils'
import { actionTypes } from './actionTypes'

export const loadRefundAmount = () => async (dispatch, getState) => {
  const state = getState()
  const accessToken = getAccessToken(state)
  const userId = getUserId(state)
  const orderId = getOrderId(state)
  const selectedIngredients = getSelectedIngredients(state)
  const isAutoAcceptEnabled = getIsAutoAcceptEnabled(state)
  const ingredients = Object.keys(selectedIngredients).map(
    key => ({
      ingredient_uuid: selectedIngredients[key].ingredientUuid,
      recipe_gousto_reference: selectedIngredients[key].recipeGoustoReference
    })
  )

  const body = {
    customer_id: Number(userId),
    order_id: Number(orderId),
    ingredients: JSON.stringify(ingredients),
  }

  const getPayload = async () => {
    const { data } = await fetchRefundAmount(accessToken, body)
    const mappedResponse = {
      ...data,
      value: Number(data.value),
      multiComplaintTotalValue: Number(data.multiComplaintTotalValue),
    }
    const { value, type, multiComplaintTotalValue } = mappedResponse

    const MAX_AUTO_ACCEPT_AMOUNT = 2.0
    const MAX_AUTO_ACCEPT_INGREDIENTS = 1
    const isAutoAccept = isAutoAcceptEnabled
      && value <= MAX_AUTO_ACCEPT_AMOUNT
      && ingredients.length <= MAX_AUTO_ACCEPT_INGREDIENTS

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
    errorMessage: `Failed to loadRefundAmount for orderId: ${orderId}, userId: ${userId}, ingredients: ${ingredients}`
  })
}
