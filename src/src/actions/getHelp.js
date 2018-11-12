import { validateIngredients } from 'apis/getHelp'
import actionTypes from './actionTypes'
import statusActions from './status'

const dispatcher = (action) => (dispatch) => dispatch(action)

/* action creators */
export const selectOrderIssue = (issue) => dispatcher({
  type: actionTypes.GET_HELP_ORDER_ISSUE_SELECT,
  issue,
})

export const selectContactChannel = (channel) => dispatcher({
  type: actionTypes.GET_HELP_CONTACT_CHANNEL_SELECT,
  channel,
})

export const storeGetHelpOrderId = (id) => dispatcher({
  type: actionTypes.GET_HELP_STORE_ORDER_ID,
  id,
})

export const validateSelectedIngredients = ({ accessToken, orderId, costumerId, ingredients }) => {
  return async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.GET_HELP_GET_INGREDIENTS, true))
    dispatch(statusActions.error(actionTypes.GET_HELP_GET_INGREDIENTS, ''))

    try {
      await validateIngredients(
        accessToken,
        {
          customer_id: Number(costumerId),
          order_id: Number(orderId),
          ingredients
        }
      )
    }
    catch (error) {
      dispatch(statusActions.error(actionTypes.GET_HELP_GET_INGREDIENTS, error.message))
    }
    finally {
      dispatch(statusActions.pending(actionTypes.GET_HELP_GET_INGREDIENTS, false))
    }
  }
}
