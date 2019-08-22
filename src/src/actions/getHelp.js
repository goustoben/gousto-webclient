import {
  validateIngredients,
  validateOrder,
  fetchOrderIssues as fetchOrderIssuesApi,
} from 'apis/getHelp'
import actionTypes from './actionTypes'
import statusActions from './status'

/* action creators */
const selectOrderIssue = (issue) => ({
  type: actionTypes.GET_HELP_ORDER_ISSUE_SELECT,
  issue,
})

const trackIngredientIssues = (ingredientAndRecipeIdsWithIssueName) => ({
  type: actionTypes.GET_HELP_INGREDIENT_ISSUES_SELECT,
  ingredientAndRecipeIdsWithIssueName
})

const trackAcceptRefund = (amount) => ({
  type: actionTypes.GET_HELP_ACCEPT_REFUND,
  amount
})

const selectContactChannel = (channel) => ({
  type: actionTypes.GET_HELP_CONTACT_CHANNEL_SELECT,
  channel,
})

const storeGetHelpOrderId = (id) => ({
  type: actionTypes.GET_HELP_STORE_ORDER_ID,
  id,
})

const storeSelectedIngredients = (selectedIngredientAndRecipeIds) => ({
  type: actionTypes.GET_HELP_STORE_SELECTED_INGREDIENTS,
  selectedIngredientAndRecipeIds,
})

const storeSelectedIngredientIssue = (ingredientAndRecipeId, issueId, issueName) => ({
  type: actionTypes.GET_HELP_STORE_SELECTED_INGREDIENT_ISSUE,
  ingredientAndRecipeId,
  issueId,
  issueName,
})

const storeIngredientIssueDescriptions = (issueReasons) => ({
  type: actionTypes.GET_HELP_STORE_INGREDIENT_ISSUE_REASONS,
  issueReasons,
})

const validateSelectedIngredients = ({ accessToken, orderId, costumerId, ingredientIds }) => {
  return async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, true))
    dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, ''))

    try {
      await validateIngredients(
        accessToken,
        {
          customer_id: Number(costumerId),
          order_id: Number(orderId),
          ingredient_ids: ingredientIds
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

const validateLatestOrder = ({ accessToken, orderId, costumerId }) => {
  return async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_ORDER, true))
    dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_ORDER, ''))

    try {
      return await validateOrder(
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

const fetchIngredientIssues = () => {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, true))
    dispatch(statusActions.error(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, null))

    try {
      const ingredientIssues = await fetchOrderIssuesApi(getState().auth.get('accessToken'))
      dispatch({ type: actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, ingredientIssues })

      const selectedIngredients = getState().getHelp.get('selectedIngredients')
      const { id, name } = ingredientIssues.data[0].category
      selectedIngredients.forEach(selectedIngredient => {
        const ingredientAndRecipeId = `${selectedIngredient.get('recipeId')}-${selectedIngredient.get('ingredientId')}`
        dispatch({
          type: actionTypes.GET_HELP_STORE_SELECTED_INGREDIENT_ISSUE,
          ingredientAndRecipeId,
          issueId: id,
          issueName: name,
        })
      })
    } catch (error) {
      dispatch(statusActions.error(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, error.message))
    } finally {
      dispatch(statusActions.pending(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, false))
    }
  }
}

export {
  selectOrderIssue,
  selectContactChannel,
  storeGetHelpOrderId,
  storeIngredientIssueDescriptions,
  storeSelectedIngredients,
  storeSelectedIngredientIssue,
  validateSelectedIngredients,
  validateLatestOrder,
  fetchIngredientIssues,
  trackAcceptRefund,
  trackIngredientIssues,
}
