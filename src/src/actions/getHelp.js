import {
  validateIngredients,
  fetchOrderIssues as fetchOrderIssuesApi,
} from 'apis/getHelp'
import logger from 'utils/logger'
import { fetchRecipes } from 'apis/recipes'
import { fetchOrder } from 'apis/orders'
import { appendFeatureToRequest } from 'routes/GetHelp/utils/appendFeatureToRequest'
import { getFeatureShorterCompensationPeriod } from 'selectors/features'
import { actionTypes } from './actionTypes'
import statusActions from './status'

const SE_CATEGORY_HELP = 'help'

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

const trackRecipeCardClick = recipeId => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpRecipeCard Clicked',
    recipeId,
  }
})

const trackUserCannotGetCompensation = () => ({
  type: actionTypes.TRACKING,
  trackingData: {
    seCategory: SE_CATEGORY_HELP,
    actionType: 'ssr_ingredients_user_not_eligible_for_compensation',
  }
})

const validateSelectedIngredients = ({
  accessToken,
  orderId,
  costumerId,
  ingredientUuids,
}) => async (dispatch, getState) => {
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
      featureShorterCompensationPeriod: getFeatureShorterCompensationPeriod(getState()),
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

    const selectedIngredients = getState().getHelp.get('selectedIngredients')
    const { id, name } = ingredientIssues.data[0].category
    selectedIngredients.forEach(selectedIngredient => {
      const ingredientAndRecipeId = `${selectedIngredient.get('recipeId')}&${selectedIngredient.get('ingredientUuid')}`
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

const loadRecipesById = (recipeIds = []) => (
  async (dispatch, getState) => {
    if (recipeIds && recipeIds.length > 0) {
      dispatch(statusActions.pending(actionTypes.GET_HELP_RECIPES_RECEIVE, true))
      try {
        const params = {
          includes: ['ingredients'],
          'filters[recipe_ids]': recipeIds,
        }
        const accessToken = getState().auth.get('accessToken')
        const { data: recipes } = await fetchRecipes(accessToken, '', params)

        dispatch({ type: actionTypes.GET_HELP_RECIPES_RECEIVE, recipes })
      } catch (err) {
        dispatch(statusActions.error(actionTypes.GET_HELP_RECIPES_RECEIVE, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionTypes.GET_HELP_RECIPES_RECEIVE, false))
      }
    }
  }
)

const loadOrderById = ({ accessToken, orderId }) => async (dispatch) => {
  dispatch(statusActions.pending(actionTypes.GET_HELP_LOAD_ORDERS_BY_ID, true))
  dispatch(statusActions.error(actionTypes.GET_HELP_LOAD_ORDERS_BY_ID, null))

  try {
    const { data: order } = await fetchOrder(
      accessToken,
      orderId
    )

    dispatch({
      type: actionTypes.GET_HELP_LOAD_ORDERS_BY_ID,
      order,
    })
  } catch (err) {
    dispatch(statusActions.error(actionTypes.GET_HELP_LOAD_ORDERS_BY_ID, err.message))
    logger.error(err)
    throw err
  } finally {
    dispatch(statusActions.pending(actionTypes.GET_HELP_LOAD_ORDERS_BY_ID, false))
  }
}

export {
  loadOrderById,
  loadRecipesById,
  selectOrderIssue,
  selectContactChannel,
  storeGetHelpOrderId,
  storeIngredientIssueDescriptions,
  storeSelectedIngredients,
  storeSelectedIngredientIssue,
  validateSelectedIngredients,
  fetchIngredientIssues,
  trackAcceptRefund,
  trackIngredientIssues,
  trackRecipeCardClick,
  trackUserCannotGetCompensation,
}
