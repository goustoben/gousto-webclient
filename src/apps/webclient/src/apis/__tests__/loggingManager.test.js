import fetch from 'utils/fetch'
import { triggerLoggingManagerEvent } from '../loggingManager'

jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version}`)
)

jest.mock('config/routes', () => ({
  version: {
    content: 'v2',
  }
}))

describe('loggingManager api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('triggerLoggingManagerEvent', () => {
    describe('when an event is dispatched to the logging manager', () => {
      beforeEach(async () => {
        await triggerLoggingManagerEvent({
          accessToken: 'mock-access-token',
          loggingManagerRequest: {
            eventName: 'test-event',
            data: {
              auth_user_id: '12345',
            },
          }
        })
      })

      test('then the correct url should be fetched', async () => {
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'mock-access-token',
          'endpoint-loggingmanager/log',
          {
            eventName: 'test-event',
            data: {
              auth_user_id: '12345',
            },
          },
          'POST',
          'no-cache',
          { 'Content-Type': 'application/json' },
        )
      })
    })
  })
})
