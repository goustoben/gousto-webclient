import { renderHook } from '@testing-library/react-hooks'
import { useFetch } from '../useFetch'

describe('useFetch', () => {
  const PAYLOAD = { test: 'test' }
  const URL = 'http://mock'
  const ERROR = new Error('Ooups!')
  const AUTH_ERROR = new Error('Authorization access token is not present')

  const fetchWrapper = {
    wrapper: ({ children }) => children
  }

  beforeEach(() => {
    global.fetch.resetMocks()
  })

  describe('when performing a request', () => {
    test('returns the loading as true, error as false and response as undefined', async () => {
      global.fetch.mockResponse(JSON.stringify(PAYLOAD))
      const { result, waitForNextUpdate } = renderHook(
        () => useFetch({ url: URL }),
        fetchWrapper,
      )

      expect(global.fetch).toHaveBeenCalledWith('http://mock/', { headers: {} })
      expect(result.current.isFetchLoading).toBe(true)
      expect(result.current.fetchResponse).toBe(undefined)
      expect(result.current.fetchError).toBe(false)

      await waitForNextUpdate()
    })

    test('and query params have been added', async () => {
      global.fetch.mockResponse(JSON.stringify(PAYLOAD))
      const { waitForNextUpdate } = renderHook(
        () => useFetch({ url: URL, parameters: { testParam: 'test_param' }}),
        fetchWrapper,
      )

      expect(global.fetch).toHaveBeenCalledWith('http://mock/?testParam=test_param', { headers: {} })

      await waitForNextUpdate()
    })
  })

  describe('when the request succeeds', () => {
    test('returns the loading as false, error as false and response as the payload', async () => {
      global.fetch.mockResponse(JSON.stringify(PAYLOAD))
      const { result, waitForNextUpdate } = renderHook(
        () => useFetch({ url: URL }),
        fetchWrapper,
      )

      await waitForNextUpdate()

      expect(result.current.isFetchLoading).toBe(false)
      expect(result.current.fetchResponse).toEqual(PAYLOAD)
      expect(result.current.fetchError).toBe(false)
    })
  })

  describe('when the request fails', () => {
    test('returns the loading as false, error with a message and response as undefined', async () => {
      global.fetch.mockReject(ERROR)
      const { result, waitForNextUpdate } = renderHook(
        () => useFetch({ url: URL }),
        fetchWrapper,
      )

      await waitForNextUpdate()

      expect(result.current.isFetchLoading).toBe(false)
      expect(result.current.fetchResponse).toEqual(undefined)
      expect(result.current.fetchError).toBe(ERROR)
    })

    test('as access token is undefined on an authorised path', async () => {
      const { result } = renderHook(
        () => useFetch({ url: URL, needsAuthorization: true }),
        fetchWrapper,
      )

      expect(result.current.isFetchLoading).toBe(false)
      expect(result.current.fetchResponse).toEqual(undefined)
      expect(result.current.fetchError).toEqual(AUTH_ERROR)
    })
  })
})
