import actionTypes from './actionTypes'

/* action creators */
export const selectOrderIssue = (issue) => (
	(dispatch) => {
		dispatch({
			type: actionTypes.GET_HELP_ORDER_ISSUE_SELECT,
			issue,
		})
	}
)

export const selectContactChannel = (channel) => (
	(dispatch) => {
		dispatch({
			type: actionTypes.GET_HELP_CONTACT_CHANNEL_SELECT,
			channel,
		})
	}
)
