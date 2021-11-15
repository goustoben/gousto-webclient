/* action creators */
import { actionTypes } from "actions/actionTypes"

const selectOrderIssue = (issue) => ({
  type: actionTypes.GET_HELP_ORDER_ISSUE_SELECT,
  issue,
})
export { selectOrderIssue }
