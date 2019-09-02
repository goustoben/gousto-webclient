import {
  validateIngredients,
  validateIngredientsV2,
  validateOrder,
  fetchOrderIssues as fetchOrderIssuesApi,
} from 'apis/getHelp'
import logger from 'utils/logger'
import { fetchRecipes } from 'apis/recipes'
import { fetchOrder } from 'apis/orders'
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

const validateSelectedIngredients = ({
  accessToken,
  orderId,
  costumerId,
  ingredientIds,
  featureSSRValidationV2,
}) => {
  return async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, true))
    dispatch(statusActions.error(actionTypes.GET_HELP_VALIDATE_INGREDIENTS, ''))

    const validateIngredientsParams = [
      accessToken,
      {
        customer_id: Number(costumerId),
        order_id: Number(orderId),
        ingredient_ids: ingredientIds
      }
    ]

    try {
      if (featureSSRValidationV2 && featureSSRValidationV2.value) {
        await validateIngredientsV2(...validateIngredientsParams)
      } else {
        await validateIngredients(...validateIngredientsParams)
      }
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

const loadRecipesById = (recipeIds = []) => (
  async (dispatch, getState) => {
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
)

const loadOrderById = ({ accessToken, orderId }) => {
  return async (dispatch) => {
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
  validateLatestOrder,
  fetchIngredientIssues,
  trackAcceptRefund,
  trackIngredientIssues,
}
