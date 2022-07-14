import { RequestConfig } from '../types'
import { addPath } from './path'

describe('path request middleware', () => {
  let req: RequestConfig
  beforeEach(() => {
    req = {
      paths: ['first']
    } as RequestConfig
  })

  it('can set a static path', () => {
    const middleware = addPath('second')
    const result = middleware(req, undefined) as RequestConfig
    expect(result.paths).toStrictEqual(['first', 'second'])
  })

  it('can set a dynamic path', () => {
    const fn = jest.fn((_: Record<string, unknown>) => 'second')
    const middleware = addPath(fn)
    const payload = {}
    const result = middleware(req, payload) as RequestConfig

    expect(fn).toHaveBeenCalledWith(payload)
    expect(result.paths).toStrictEqual(['first', 'second'])
  })

  it('can set a dynamic path, asynchronously', async () => {
    const fn = jest.fn((_: Record<string, unknown>) => Promise.resolve('second'))
    const middleware = addPath(fn)
    const payload = {}
    const result = middleware(req, payload) as Promise<RequestConfig>

    expect(fn).toHaveBeenCalledWith(payload)
    expect(result).toBeInstanceOf(Promise)
    expect((await result).paths).toStrictEqual(['first', 'second'])
  })
})
