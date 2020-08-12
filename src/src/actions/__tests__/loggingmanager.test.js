import Immutable from 'immutable'
import { logEventToServer } from 'apis/loggingManager'
import {
  trackUserFreeFoodPageView,
} from 'actions/loggingmanager'

jest.mock('apis/loggingManager', () => ({
  logEventToServer: jest.fn(),
}))

describe('trackUserFreeFoodPageView', () => {
  let getState
  let dispatch
  const id = 'mock-user-id'
  const browser = 'mobile'
  const accessToken = '12345'

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
      expect(logEventToServer).toHaveBeenCalledWith({
        eventName: 'rafPage-visited',
        authUserId: id,
        data: {
          device: browser,
        }
      })
    })
  })
})
