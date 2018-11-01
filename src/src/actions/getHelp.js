import actionTypes from './actionTypes'

const dispatcher = (action) => (dispatch) => dispatch(action)

/* action creators */
export const selectOrderIssue = (issue) => dispatcher({
	type: actionTypes.GET_HELP_ORDER_ISSUE_SELECT,
	issue,
})

export const selectContactChannel = (channel) => dispatcher({
	type: actionTypes.GET_HELP_CONTACT_CHANNEL_SELECT,
	channel,
})

export const storeGetHelpOrderId = (id) => dispatcher({
	type: actionTypes.GET_HELP_STORE_ORDER_ID,
	id,
})
