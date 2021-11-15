import { actionTypes } from "actions/actionTypes"

const storeIngredientIssueDescriptions = (issueReasons) => ({
  type: actionTypes.GET_HELP_STORE_INGREDIENT_ISSUE_REASONS,
  issueReasons,
})
export { storeIngredientIssueDescriptions }
