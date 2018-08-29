import getHelpTracking from 'middlewares/tracking/snowplow/getHelp'
import actions from 'actions/actionTypes'

describe('snowplow get help tracking events', () => {
	describe('order issue', () => {
		const action = {
			type: actions.GET_HELP_ORDER_ISSUE_SELECTED,
			issue: 'ingredients'
		}

		test('orderIssueSelected works correctly', () => {
			expect(getHelpTracking.orderIssueSelected(action)).toEqual({
				data: {
					order_issue: 'ingredients',
				},
				seCategory: 'Order Get Help',
				type: 'OrderIssue Selected'
			})
		})
	})
})
