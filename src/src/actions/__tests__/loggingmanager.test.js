import Immutable from 'immutable'
import { triggerLoggingManagerEvent } from 'apis/loggingManager'
import {
  trackUserFreeFoodPageView,
} from 'actions/loggingmanager'

jest.mock('actions/auth', () => ({
  authenticateClient: jest.fn().mockReturnValue({ accessToken: '12345' }),
}))

jest.mock('apis/loggingManager', () => ({
  triggerLoggingManagerEvent: jest.fn(),
}))

describe('trackUserFreeFoodPageView', () => {
  let getState
  let dispatch
  const id = 'mock-user-id'
  const browser = 'mobile'
  const accessToken = '12345'
  const eventName = 'rafPage-visited'

  const state = {
    request: Immutable.fromJS({
      browser,
    }),
    auth: Immutable.fromJS({
      client: Immutable.fromJS({
        accessToken,
      }),
      id,
    }),
  }

  describe('when the free food page is viewed', async () => {
    beforeEach(async () => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserFreeFoodPageView()(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken,
        body: {
          eventName,
          data: {
            auth_user_id: id,
            event: eventName,
            device: browser,
          }
        },
      })
    })
  })
})
