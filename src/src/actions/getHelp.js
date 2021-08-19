import {
  validateIngredients,
  fetchOrderIssues as fetchOrderIssuesApi,
} from 'apis/getHelp'
import { appendFeatureToRequest } from 'routes/GetHelp/utils/appendFeatureToRequest'
import { getSelectedIngredients } from '../routes/GetHelp/selectors/selectors'
import { actionTypes } from './actionTypes'
import statusActions from './status'

/* action creators */
const selectOrderIssue = (issue) => ({
  type: actionTypes.GET_HELP_ORDER_ISSUE_SELECT,
  issue,
})

const trackIngredientIssues = (ingredientIssuesInfo) => ({
  type: actionTypes.GET_HELP_INGREDIENT_ISSUES_SELECT,
  ingredientIssuesInfo
})

const trackAcceptIngredientsRefund = (amount) => ({
  type: actionTypes.GET_HELP_INGREDIENTS_ACCEPT_REFUND,
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

const storeSelectedIngredients = (selectedIngredientsInfo) => ({
  type: actionTypes.GET_HELP_STORE_SELECTED_INGREDIENTS,
  selectedIngredientsInfo,
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

const trackRecipeCardClick = recipeId => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpRecipeCard Clicked',
    recipeId,
  }
})

const validateSelectedIngredients = ({
  accessToken,
  orderId,
  costumerId,
  ingredientUuids,
}) => async (dispatch) => {
  dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, true))
  dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, ''))

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
    dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, error.message))
    throw error
  } finally {
    dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, false))
  }
}

const fetchIngredientIssues = () => async (dispatch, getState) => {
  dispatch(statusActions.pending(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, true))
  dispatch(statusActions.error(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, null))

  try {
    const ingredientIssues = await fetchOrderIssuesApi(getState().auth.get('accessToken'))
    dispatch({ type: actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, ingredientIssues })

    const selectedIngredients = getSelectedIngredients(getState())
    const { id, name } = ingredientIssues.data[0].category
    Object.values(selectedIngredients).forEach(selectedIngredient => {
      const ingredientAndRecipeId = `${selectedIngredient.recipeId}&${selectedIngredient.ingredientUuid}`
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

export {
  selectOrderIssue,
  selectContactChannel,
  storeGetHelpOrderId,
  storeIngredientIssueDescriptions,
  storeSelectedIngredients,
  storeSelectedIngredientIssue,
  validateSelectedIngredients,
  fetchIngredientIssues,
  trackAcceptIngredientsRefund,
  trackIngredientIssues,
  trackRecipeCardClick,
}
