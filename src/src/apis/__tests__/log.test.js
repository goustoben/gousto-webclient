import { fetch } from 'utils/fetch'
import { log } from "apis/log/log"

jest.mock('utils/fetch', () => ({
  fetch: jest.fn(() => Promise.resolve())
}))

jest.mock('config/routes', () => ({
  logs: {
    event: '/event'
  }
}))

describe('log api', () => {
  describe('log', () => {
    test('should log event', async () => {
      const url = 'https://production-api.gousto.co.uk/felogging/v1/event'
      const request = {
        client: 'webclient',
        detail: {
          message: 'Log message',
          extra: {
            foo: 'bar'
          },
        },
        name: 'gousto-webclient',
        time: expect.any(String),
        logLevel: 'info'
      }
      const headers = {
        'Content-Type': 'application/json',
      }

      await log('info', 'Log message', {
        foo: 'bar'
      })

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, url, request, 'POST', 'default', headers)
    })
  })
})
