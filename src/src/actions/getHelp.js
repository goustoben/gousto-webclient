import actionTypes from './actionTypes'

/* action creators */
export const orderIssueSelected = (issue) => (
	(dispatch) => {
		dispatch({
			type: actionTypes.GET_HELP_ORDER_ISSUE_SELECTED,
			issue,
		})
	}
)
