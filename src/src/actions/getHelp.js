import { validateIngredients, validateOrder } from 'apis/getHelp'
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
    dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, true))
    dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, ''))

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
      dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, error.message))
      throw error
    }
    finally {
      dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, false))
    }
  }
}

export const validateLatestOrder = ({ accessToken, orderId, costumerId }) => {
  return async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_ORDER, true))
    dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_ORDER, ''))

    try {
      await validateOrder(
        accessToken,
        {
          customer_id: Number(costumerId),
          order_id: Number(orderId),
        }
      )
    }
    catch (error) {
      dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_ORDER, error.message))
    }
    finally {
      dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_ORDER, false))
    }
  }
}
