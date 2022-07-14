import isomorphicFetch from 'isomorphic-fetch'

import { getUrl } from './url'
import { HttpConfig, RequestConfig } from '../types'

export async function makeRequest<Input, Output>(
  config: HttpConfig<Input, Response, Output>,
  input: Input
): Promise<Output> {
  const { reduceRequest, reduceResponse } = config

  const defaultRequest: RequestConfig = {
    host: 'defaultVal', // todo fetch from library
    method: 'GET',
    paths: []
  }

  const req = await reduceRequest(defaultRequest, input)
  const url = getUrl(req)

  const response = await isomorphicFetch(url, req)

  return reduceResponse(response)
}
