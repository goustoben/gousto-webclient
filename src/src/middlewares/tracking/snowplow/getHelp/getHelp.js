import seActions from './seActions'

const seCategory = 'Order Get Help'

function orderIssueSelected(action) {
	return {
		type: seActions[action.type],
		data: { order_issue: action.issue },
		seCategory,
	}
}

export {
	orderIssueSelected,
}
