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

      const [isFetchLoading, fetchResponse, fetchError] = result.current

      expect(global.fetch).toHaveBeenCalledWith('http://mock', { headers: {} })
      expect(isFetchLoading).toBe(true)
      expect(fetchResponse).toBe(undefined)
      expect(fetchError).toBe(false)

      await waitForNextUpdate()
    })

    test('and query params have been added', async () => {
      global.fetch.mockResponse(JSON.stringify(PAYLOAD))
      const { waitForNextUpdate } = renderHook(
        () => useFetch({ url: URL, parameters: { testParam: 'test_param' } }),
        fetchWrapper,
      )

      expect(global.fetch).toHaveBeenCalledWith('http://mock/?testParam=test_param', { headers: {} })

      await waitForNextUpdate()
    })
  })

  describe('when making a request triggered by a state change', () => {
    describe('and shouldRequest is false', () => {
      test('then request is not made', async () => {
        global.fetch.mockResponse(JSON.stringify(PAYLOAD))

        renderHook(
          () => useFetch({
            url: URL,
            trigger: {
              shouldRequest: false,
              setShouldRequest: () => { }
            }
          }),
          fetchWrapper,
        )

        expect(global.fetch).not.toHaveBeenCalled()
      })
    })

    describe('and shouldRequest is true', () => {
      test('then request is made', async () => {
        global.fetch.mockResponse(JSON.stringify(PAYLOAD))

        const { waitForNextUpdate } = renderHook(
          () => useFetch({
            url: URL,
            trigger: {
              shouldRequest: true,
              setShouldRequest: () => { }
            }
          }),
          fetchWrapper,
        )

        await waitForNextUpdate()
        expect(global.fetch).toHaveBeenCalledTimes(1)
      })

      test('then trigger is reset after request', async () => {
        const setShouldRequest = jest.fn()
        global.fetch.mockResponse(JSON.stringify(PAYLOAD))

        const { waitForNextUpdate } = renderHook(
          () => useFetch({
            url: URL,
            trigger: {
              shouldRequest: true,
              setShouldRequest
            }
          }),
          fetchWrapper,
        )

        await waitForNextUpdate()

        expect(setShouldRequest).toHaveBeenCalledWith(false)
      })
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

      const [isFetchLoading, fetchResponse, fetchError] = result.current

      expect(isFetchLoading).toBe(false)
      expect(fetchResponse).toEqual(PAYLOAD)
      expect(fetchError).toBe(false)
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

      const [isFetchLoading, fetchResponse, fetchError] = result.current

      expect(isFetchLoading).toBe(false)
      expect(fetchResponse).toEqual(undefined)
      expect(fetchError).toBe(ERROR)
    })

    test('as access token is undefined on an authorised path', async () => {
      const { result } = renderHook(
        () => useFetch({ url: URL, needsAuthorization: true }),
        fetchWrapper,
      )

      const [isFetchLoading, fetchResponse, fetchError] = result.current

      expect(isFetchLoading).toBe(false)
      expect(fetchResponse).toEqual(undefined)
      expect(fetchError).toEqual(AUTH_ERROR)
    })
  })
})
