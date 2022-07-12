import isomorphicFetch from 'isomorphic-fetch'

import { getUrl } from './url'
import { HttpConfig, HttpCtx, RequestConfig } from '../types'

export async function makeRequest<Input, Output>(
  ctx: HttpCtx,
  config: HttpConfig<Input, Response, Output>,
  input: Input
): Promise<Output> {
  const { reduceRequest, reduceResponse } = config

  const defaultRequest: RequestConfig = {
    host: ctx.apiUrl,
    method: 'GET',
    paths: []
  }

  const req = await reduceRequest(defaultRequest, ctx, input)
  const url = getUrl(req)

  const response = await isomorphicFetch(url, req)

  return reduceResponse(response)
}
