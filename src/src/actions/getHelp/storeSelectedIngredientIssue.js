import { actionTypes } from "actions/actionTypes"

const storeSelectedIngredientIssue = (ingredientAndRecipeId, issueId, issueName) => ({
  type: actionTypes.GET_HELP_STORE_SELECTED_INGREDIENT_ISSUE,
  ingredientAndRecipeId,
  issueId,
  issueName,
})
export { storeSelectedIngredientIssue }
