import fetch from 'utils/fetch'
import newsletterSignup from '../newsletter'

const mockFetchResult = { data: [1, 2, 3] }
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
  core: {
    newsletter: '/newsletter'
  }
}))

describe('newsletter api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('newsletterSignup', () => {
    test('should fetch the correct url', async () => {
      await newsletterSignup('token', 'foo@example.com')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/newsletter', { email: 'foo@example.com' }, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await newsletterSignup('token', 'foo@example.com')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
