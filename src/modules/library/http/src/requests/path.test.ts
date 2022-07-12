import { HttpCtx, RequestConfig } from '../types'
import { addPath } from './path'

describe('path request middleware', () => {
  const ctx = {} as HttpCtx

  let req: RequestConfig
  beforeEach(() => {
    req = {
      paths: ['first']
    } as RequestConfig
  })

  it('can set a static path', () => {
    const middleware = addPath('second')
    const result = middleware(req, ctx, undefined) as RequestConfig
    expect(result.paths).toStrictEqual(['first', 'second'])
  })

  it('can set a dynamic path', () => {
    const fn = jest.fn((_: Record<string, unknown>) => 'second')
    const middleware = addPath(fn)
    const payload = {}
    const result = middleware(req, ctx, payload) as RequestConfig
    expect(result.paths).toStrictEqual(['first', 'second'])
  })

  it('can set a dynamic path, asynchronously', async () => {
    const fn = jest.fn((_: Record<string, unknown>) => Promise.resolve('second'))
    const middleware = addPath(fn)
    const payload = {}
    const result = middleware(req, ctx, payload) as Promise<RequestConfig>

    expect(result).toBeInstanceOf(Promise)
    expect((await result).paths).toStrictEqual(['first', 'second'])
  })
})
