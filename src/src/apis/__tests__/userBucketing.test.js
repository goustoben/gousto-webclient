import fetch from 'utils/fetch'
import { getUserExperiments } from '../userBucketing'

jest.mock('utils/fetch')
jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}/${version}`)
)

describe('userBucketing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getUserExperiments', () => {
    beforeEach(() => {
      fetch.mockResolvedValue({ data: { mock: 'experiments' } })
    })

    test('calls fetch with the arguments', async () => {
      await getUserExperiments('session-id', 'user-id')

      const expectedAccessToken = null
      const expectedUrl = 'endpoint-userbucketing/v1/user/experiments'
      const expectedReqParams = {}
      const expectedMethod = 'GET'
      const expectedCache = 'default'
      const expectedHeaders = {
        'x-gousto-device-id': 'session-id',
        'x-gousto-user-id': 'user-id'
      }

      expect(fetch).toHaveBeenCalledWith(expectedAccessToken, expectedUrl, expectedReqParams, expectedMethod, expectedCache, expectedHeaders)
    })

    test('returns correct response', async () => {
      const result = await getUserExperiments('session-id', 'user-id')

      expect(result).toEqual({ data: { mock: 'experiments' } })
    })
  })
})
