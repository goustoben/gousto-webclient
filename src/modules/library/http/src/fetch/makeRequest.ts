import isomorphicFetch from 'isomorphic-fetch'

import { getUrl } from './url'
import { RequestConfig, RequestMiddleware, ResponseMiddleware } from '../types'

export async function makeRequest<Input, Output>(
  reduceRequest: RequestMiddleware<Input>,
  reduceResponse: ResponseMiddleware<Response, Output>,
  input: Input
): Promise<Output> {
  const defaultRequest: RequestConfig = {
    host: '',
    method: 'GET',
    paths: []
  }

  const req = await reduceRequest(defaultRequest, input)
  const url = getUrl(req)

  const response = await isomorphicFetch(url, req)

  return reduceResponse(response)
}
