import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { appendFeatureToRequest } from "routes/GetHelp/utils/appendFeatureToRequest"
import { validateIngredients } from "apis/getHelp/validateIngredients"

const validateSelectedIngredients = ({
                                       accessToken,
                                       orderId,
                                       costumerId,
                                       ingredientUuids,
                                     }) => async (dispatch) => {
  dispatch(pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, true))
  dispatch(error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, ''))

  const validateIngredientsParams = [
    accessToken,
    appendFeatureToRequest({
      body: {
        customer_id: Number(costumerId),
        order_id: Number(orderId),
        ingredient_ids: ingredientUuids
      },
    })
  ]

  try {
    await validateIngredients(...validateIngredientsParams)
  } catch (error) {
    dispatch(error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, error.message))
    throw error
  } finally {
    dispatch(pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, false))
  }
}
export { validateSelectedIngredients }
