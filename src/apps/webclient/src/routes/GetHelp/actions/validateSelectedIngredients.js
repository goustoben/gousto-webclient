import {validateIngredients} from '../apis/ssrIngredients'
import statusActions from '../../../actions/status'
import { actionTypes } from '../../../actions/actionTypes'

export const validateSelectedIngredients = ({
  accessToken,
  orderId,
  customerId,
  ingredients,
}) => async (dispatch) => {
  dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, true))
  dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, ''))
  const validateIngredientsParams = [
    accessToken,
    {
      customer_id: customerId,
      order_id: orderId,
      ingredients: JSON.stringify(ingredients),
    },
  ]

  try {
    await validateIngredients(...validateIngredientsParams)
  } catch (error) {
    dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, error.message))
    throw error
  } finally {
    dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, false))
  }
}
