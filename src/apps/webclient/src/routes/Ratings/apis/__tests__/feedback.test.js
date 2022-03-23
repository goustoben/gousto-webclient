import { fetch } from 'utils/fetch'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import { getUserFeedbackCount } from '../feedback'

jest.mock('utils/fetch')

describe('feedback', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getUserFeedbackCount', () => {
    // mock the environment and domain config used by these tests to generate endpoints
    withMockEnvironmentAndDomain('production', 'gousto.co.uk')

    beforeEach(() => {
      fetch.mockResolvedValue({ data: [{ mock: 'feedback' }] })
    })

    test('calls fetch with the correct arguments', async () => {
      const expectedAccessToken = 'token'
      const reqData = { totalCount: 5 }
      const expectedUrl = 'https://production-api.gousto.co.uk/userfeedback/v1/feedback'
      const expectedMethod = 'GET'

      await getUserFeedbackCount(expectedAccessToken, reqData)
      expect(fetch).toHaveBeenCalledWith(expectedAccessToken, expectedUrl, reqData, expectedMethod)
    })

    test('returns correct response', async () => {
      const expectedAccessToken = 'token'
      const reqData = { totalCount: 5 }
      const result = await getUserFeedbackCount(expectedAccessToken, reqData)

      expect(result).toEqual({ data: [{ mock: 'feedback' }] })
    })
  })
})
