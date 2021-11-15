import { actionTypes } from "actions/actionTypes"

const trackIngredientIssues = (ingredientIssuesInfo) => ({
  type: actionTypes.GET_HELP_INGREDIENT_ISSUES_SELECT,
  ingredientIssuesInfo
})
export { trackIngredientIssues }
