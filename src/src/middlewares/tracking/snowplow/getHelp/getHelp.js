import seActions from './seActions'

const seCategory = 'Order Get Help'

function selectOrderIssue(action) {
	return {
		type: seActions[action.type],
		data: { order_issue: action.issue },
		seCategory,
	}
}

function selectContactChannel(action) {
	return {
		type: seActions[action.type],
		data: { channel: action.channel },
		seCategory,
	}
}

export {
	selectOrderIssue,
	selectContactChannel,
}
