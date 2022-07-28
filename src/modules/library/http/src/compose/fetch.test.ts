import { Fetcher, RequestConfig, RequestMiddleware, ResponseMiddleware } from '../types'
import { composeFetch } from './fetch'
import { makeRequest } from '../fetch'
import { TypeAssert } from '../test-utils'

jest.mock('../fetch/makeRequest')

const reduceRequest: RequestMiddleware<void> = (req: RequestConfig) => req
const reduceResponse: ResponseMiddleware<Response, number> = (resp: Response) =>
  resp.json() as Promise<number>

/**
 * Type system
 * ============================================================================
 */

/**
 * Infer type for fetcher with result type
 */
const fetcherWithResult = composeFetch(reduceRequest, reduceResponse)
const fetcherWithResultTyped: TypeAssert<typeof fetcherWithResult, Fetcher<void, number>> = true

/**
 * Infer type for fetcher without result type
 */
const fetcherNoResult = composeFetch(reduceRequest)
const fetcherNoResultTyped: TypeAssert<typeof fetcherNoResult, Fetcher<void, Response>> = true

/**
 * Runtime tests
 * ============================================================================
 */

describe('composeFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('given a request and response middleware', () => {
    const fetcher = composeFetch(reduceRequest, reduceResponse)

    it('passes request and response middleware to makeRequest', async () => {
      await fetcher()
      expect(makeRequest).toHaveBeenCalledWith(reduceRequest, reduceResponse, undefined)
    })

    it('passes the input through to makeRequest', async () => {
      await fetcher(3 as unknown as void)
      expect(makeRequest).toHaveBeenCalledWith(expect.anything(), expect.anything(), 3)
    })
  })

  describe('given only a request middleware', () => {
    const fetcher = composeFetch(reduceRequest)

    it('passes the request middleware to makeRequest', async () => {
      await fetcher()
      expect(makeRequest).toHaveBeenCalledWith(reduceRequest, expect.anything(), undefined)
    })

    it('passes an identity function as response middleware to makeRequest', async () => {
      await fetcher()
      const [ _, identityFn ] = jest.mocked(makeRequest).mock.calls[0]

      const mockResponse = {} as Response
      expect(identityFn(mockResponse)).toBe(mockResponse)
    })

    it('passes the input through to makeRequest', async () => {
      await fetcher(3 as unknown as void)
      expect(makeRequest).toHaveBeenCalledWith(expect.anything(), expect.anything(), 3)
    })
  })
})
