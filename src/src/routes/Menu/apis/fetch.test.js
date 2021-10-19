import isomorphicFetch from 'isomorphic-fetch'
import * as cookieHelper2 from 'utils/cookieHelper2'
import { get, post } from './fetch'

jest.mock('isomorphic-fetch', () => jest.fn())

const cookieHelper2GetSpy = jest.spyOn(cookieHelper2, 'get').mockImplementation((_cookies, key, withVersionPrefix, shouldDecode) => {
  if (key === 'gousto_session_id' && !withVersionPrefix && !shouldDecode) {
    return 'session-id'
  }
})

const setMockFetchResult = (data, status = 200) => (
  isomorphicFetch.mockResolvedValue({
    json: () => data,
    status,
  })
)

describe('Menu > apis > fetch', () => {
  const authOptions = {
    accessToken: 'access-token',
    sessionId: 'session-id',
    userId: 'user-id'
  }

  const url = 'http://example.com/foo'

  beforeEach(() => {
    isomorphicFetch.mockClear()
    setMockFetchResult({}, 200)
  })

  describe('when GET is sent', () => {
    test('should make GET request', async () => {
      await get(authOptions, url)

      expect(isomorphicFetch).toHaveBeenCalledWith(url, expect.objectContaining({ method: 'GET' }))
    })

    describe('when data attached', () => {
      const data = { a: 3, b: 2 }

      test('should add params to query string', async () => {
        const expectedUrl = `${url}?a=3&b=2`

        await get(authOptions, url, data)

        expect(isomorphicFetch).toHaveBeenCalledWith(expectedUrl, expect.anything())
      })
    })
  })

  describe('base fetch functionality', () => {
    /**
     * {@link post} is used for the 'base functionality' as it has no specific behaviours
     */

    test('should use correct method', async () => {
      await post(authOptions, url)

      expect(isomorphicFetch).toHaveBeenCalledWith(url, expect.objectContaining({
        method: 'POST'
      }))
    })

    test('should attach only Content-Type header if no auth options provided', async () => {
      cookieHelper2GetSpy.mockImplementationOnce(() => null)
      const expectedHeaders = {
        'Content-Type': 'application/json'
      }

      await post({}, url)

      expect(isomorphicFetch).toHaveBeenCalledWith(url, expect.objectContaining({
        headers: expectedHeaders
      }))
    })

    test('should attach Content-Type header', async () => {
      const expectedHeaders = {
        'Content-Type': 'application/json'
      }

      await post({}, url)

      expect(isomorphicFetch).toHaveBeenCalledWith(url, expect.objectContaining({
        headers: expect.objectContaining(expectedHeaders)
      }))
    })

    test('should attach auth headers', async () => {
      const expectedHeaders = {
        'x-gousto-device-id': authOptions.sessionId,
        'x-gousto-user-id': authOptions.userId,
        Authorization: `Bearer ${authOptions.accessToken}`
      }

      await post(authOptions, url)

      expect(isomorphicFetch).toHaveBeenCalledWith(url, expect.objectContaining({
        headers: expect.objectContaining(expectedHeaders)
      }))
    })

    describe('when accessToken not provided', async () => {
      test('should not attach authorisation header', async () => {
        await post({
          ...authOptions,
          accessToken: null
        }, url)

        const fetchCallParams = isomorphicFetch.mock.calls[0]
        const requestOptions = fetchCallParams[1]

        expect(requestOptions.headers).not.toHaveProperty('Authorization')
      })
    })

    describe('when data attached', () => {
      describe('when data is an object', () => {
        const data = { a: 3, b: 2 }

        test('should add data to body', async () => {
          await post(authOptions, url, data)

          expect(isomorphicFetch).toHaveBeenCalledWith(url, expect.objectContaining({
            body: JSON.stringify(data)
          }))
        })
      })

      describe('when data is a string', () => {
        const data = JSON.stringify({ a: 3, b: 2 })

        test('should add data to body', async () => {
          await post(authOptions, url, data)

          expect(isomorphicFetch).toHaveBeenCalledWith(url, expect.objectContaining({
            body: data
          }))
        })
      })
    })

    describe('when headers attached', () => {
      const data = null
      const customHeaders = { 'my-cool-header': 'foo' }

      test('should attach headers', async () => {
        await post(authOptions, url, data, customHeaders)

        expect(isomorphicFetch).toHaveBeenCalledWith(url, expect.objectContaining({
          headers: expect.objectContaining(customHeaders)
        }))
      })
    })

    describe('when request succeeds', () => {
      const successStatus = 200
      const response = { data: [1, 2, 3, 4] }

      beforeEach(() => {
        setMockFetchResult(response, successStatus)
      })

      test('should return correct values', async () => {
        const [ actual, error, status ] = await post(authOptions, url)

        expect(actual).toEqual(response)
        expect(error).toEqual(null)
        expect(status).toEqual(successStatus)
      })
    })

    describe('when request has no content', () => {
      const noContentStatus = 204

      beforeEach(() => {
        setMockFetchResult(undefined, noContentStatus)
      })

      test('should return correct values', async () => {
        const [ actual, error, status ] = await post(authOptions, url)

        expect(actual).toEqual(null)
        expect(error).toEqual(null)
        expect(status).toEqual(noContentStatus)
      })
    })

    describe.each([
      400, 401, 403, 404,
      500, 502, 503, 504
    ])('when request fails with status %i', (failStatus) => {
      const mockResponse = { data: [1, 2, 3, 4] }

      beforeEach(() => {
        setMockFetchResult(mockResponse, failStatus)
      })

      test('should return the correct values', async () => {
        const [ response, error, status ] = await post(authOptions, url)

        expect(response).toEqual(null)
        expect(error).toEqual(mockResponse)
        expect(status).toEqual(failStatus)
      })
    })
  })
})
