import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { getSelectedIngredients } from "routes/GetHelp/selectors/selectors"
import { fetchOrderIssues as fetchOrderIssuesApi } from "apis/getHelp/fetchOrderIssues"

const fetchIngredientIssues = () => async (dispatch, getState) => {
  dispatch(pending(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, true))
  dispatch(error(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, null))

  try {
    const ingredientIssues = await fetchOrderIssuesApi(getState().auth.get('accessToken'))
    dispatch({type: actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, ingredientIssues})

    const selectedIngredients = getSelectedIngredients(getState())
    const {id, name} = ingredientIssues.data[0].category
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
    dispatch(error(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, error.message))
  } finally {
    dispatch(pending(actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES, false))
  }
}
export { fetchIngredientIssues }
