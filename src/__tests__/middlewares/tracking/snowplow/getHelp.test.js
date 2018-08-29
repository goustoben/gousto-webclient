import getHelpTracking from 'middlewares/tracking/snowplow/getHelp'
import seActions from 'middlewares/tracking/snowplow/getHelp/seActions'

describe('snowplow get help tracking events', () => {
	describe('order issue', () => {
		const action = {
            type: seActions.GET_HELP_ORDER_ISSUE_SELECTED,
            issue: 'ingredients'
        }

        test('orderIssueSelected works correctly', () => {
            expect(getHelpTracking.orderIssueSelected(action)).toEqual({
                data: {
                    order_issue: 'ingredients',
                },
                seCategory: 'Order Get Help',
                type: undefined
            })
        })
	})
})
