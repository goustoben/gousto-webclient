import { fetch } from 'utils/fetch'
import { getUserFeedbackCount } from '../feedback'

jest.mock('utils/fetch')

describe('feedback', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getUserFeedbackCount', () => {
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
