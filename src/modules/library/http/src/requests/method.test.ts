import { HttpCtx, RequestConfig } from '../types'
import { setMethod } from './method'

const req = {} as RequestConfig
const ctx = {} as HttpCtx

describe('method request middleware', () => {
  it('sets a method on the request config', () => {
    const middleware = setMethod('TRACE')
    const result = middleware(req, ctx, undefined) as RequestConfig
    expect(result.method).toBe('TRACE')
  })
})
