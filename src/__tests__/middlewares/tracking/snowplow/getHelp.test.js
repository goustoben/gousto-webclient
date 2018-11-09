import getHelpTracking from 'middlewares/tracking/snowplow/getHelp'
import actions from 'actions/actionTypes'

describe('snowplow get help tracking events', () => {
  const { selectOrderIssue, selectContactChannel } = getHelpTracking

  test('selectOrderIssue works correctly', () => {
    const action = {
      type: actions.GET_HELP_ORDER_ISSUE_SELECT,
      issue: 'ingredients'
    }

    expect(getHelpTracking.selectOrderIssue(action)).toEqual({
      data: {
        order_issue: 'ingredients',
      },
      seCategory: 'Order Get Help',
      type: 'OrderIssue Selected'
    })
  })

  test('selectContactChannel works correctly', () => {
    const action = {
      type: actions.GET_HELP_CONTACT_CHANNEL_SELECT,
      channel: 'email'
    }

    expect(getHelpTracking.selectContactChannel(action)).toEqual({
      data: {
        channel: 'email',
      },
      seCategory: 'Order Get Help',
      type: 'GoustoAgent Contact'
    })
  })
})
