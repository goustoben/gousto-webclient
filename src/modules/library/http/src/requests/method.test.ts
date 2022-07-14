import { RequestConfig } from '../types'
import { setMethod } from './method'

const req = {} as RequestConfig

describe('method request middleware', () => {
  it('sets a method on the request config', () => {
    const middleware = setMethod('TRACE')
    const result = middleware(req, undefined) as RequestConfig
    expect(result.method).toBe('TRACE')
  })
})
