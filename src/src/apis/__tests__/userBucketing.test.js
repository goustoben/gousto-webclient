import fetch from 'utils/fetch'
import { getUserExperiments } from "apis/userBucketing/getUserExperiments"
import { updateUserExperiment } from "apis/userBucketing/updateUserExperiment"

jest.mock('utils/fetch')

describe('userBucketing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getUserExperiments', () => {
    beforeEach(() => {
      fetch.mockResolvedValue({ data: [{ mock: 'experiments' }] })
    })

    test('calls fetch with the correct arguments', async () => {
      await getUserExperiments('session-id', 'user-id')

      const expectedAccessToken = null
      const expectedUrl = 'https://production-api.gousto.co.uk/userbucketing/v1/user/experiments'
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

      expect(result).toEqual({ data: [{ mock: 'experiments' }] })
    })
  })

  describe('updateUserExperiment', () => {
    beforeEach(() => {
      fetch.mockResolvedValue({ data: { mock: 'mock-user-experiment' } })
    })

    test('calls fetch with the correct arguments', async () => {
      await updateUserExperiment('mock-user-experiment', 'session-id', 'user-id')

      const expectedAccessToken = null
      const expectedUrl = 'https://production-api.gousto.co.uk/userbucketing/v1/user/experiments/mock-user-experiment'
      const expectedReqParams = {}
      const expectedMethod = 'POST'
      const expectedCache = 'default'
      const expectedHeaders = {
        'x-gousto-device-id': 'session-id',
        'x-gousto-user-id': 'user-id'
      }

      expect(fetch).toHaveBeenCalledWith(expectedAccessToken, expectedUrl, expectedReqParams, expectedMethod, expectedCache, expectedHeaders)
    })

    test('returns correct response', async () => {
      const result = await getUserExperiments('mock-user-experiment', 'session-id', 'user-id')

      expect(result).toEqual({ data: { mock: 'mock-user-experiment' } })
    })
  })
})
