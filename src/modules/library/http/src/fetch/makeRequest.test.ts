import isomorphicFetch from 'isomorphic-fetch'

import { composeRequest, composeHttp, composeParser } from '../compose'
import { RequestConfig } from '../types'
import { makeRequest } from './makeRequest'
import { getUrl } from './url'

jest.mock('isomorphic-fetch', () =>
  jest.fn(() =>
    Promise.resolve({
      statusText: 'mockResponse'
    })
  )
)

jest.mock('./url', () => ({
  getUrl: jest.fn(() => 'https://makeRequest.test/path/to/endpoint')
}))

describe('makeRequest', () => {
  const requestOptions: RequestConfig = {
    host: 'https://makeRequest.test',
    method: 'DELETE',
    paths: []
  }

  const requestMiddleware = jest.fn(
    (req: RequestConfig, input: unknown) => requestOptions
  )

  const responseMiddleware = jest.fn((_: Response) => 'reducedResponse')

  const endpointConfig = composeHttp(
    composeRequest(requestMiddleware),
    composeParser(responseMiddleware)
  )

  const payload = {
    foo: 'bar'
  }

  let result: string
  beforeAll(async () => {
    result = await makeRequest(endpointConfig, payload)
  })

  describe('reducing the request', () => {
    it('passes a request with default host and method', () => {
      const [defaultRequest] = requestMiddleware.mock.calls[0]
      expect(defaultRequest.host).toBe('defaultVal')
      expect(defaultRequest.method).toBe('GET')
    })

    it('passes the provided input', () => {
      const [_, input] = requestMiddleware.mock.calls[0]
      expect(input).toBe(payload)
    })
  })

  it('uses the reduced request config to generate a URL', () => {
    const [req] = (getUrl as jest.MockedFn<typeof getUrl>).mock.calls[0]
    expect(req).toEqual(requestOptions)
  })

  describe('fetch call', () => {
    const { mock } = isomorphicFetch as jest.MockedFn<typeof isomorphicFetch>

    it('passes the URL provided by getUrl', () => {
      const [url] = mock.calls[0]
      expect(url).toBe('https://makeRequest.test/path/to/endpoint')
    })

    it('passes the request options provided by the reducer', () => {
      const [_, requestInit] = mock.calls[0]
      expect(requestInit).toEqual(requestOptions)
    })
  })

  describe('result parsing', () => {
    const { mock } = responseMiddleware

    it('passes the response from calling fetch into the response middleware', () => {
      const [response] = mock.calls[0]
      expect(response.statusText).toBe('mockResponse')
    })

    it('returns the result of the response middleware', () => {
      expect(result).toBe('reducedResponse')
    })
  })
})
