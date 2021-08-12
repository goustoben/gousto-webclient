import { getAccessToken } from 'selectors/auth'
import { getUserId } from 'selectors/user'
import { fetchRefundAmount } from 'apis/getHelp'
import { getOrderId, getSelectedIngredients } from '../selectors/selectors'
import { asyncAndDispatch } from './utils'
import { actionTypes } from './actionTypes'

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
    const { value, type } = response.data

    return { amount: value, type }
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_LOAD_REFUND_AMOUNT,
    getPayload,
    errorMessage: `Failed to loadRefundAmount for orderId: ${orderId}, userId: ${userId}, ingredientIds: ${ingredientUuids}`
  })
}
