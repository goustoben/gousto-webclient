import { RequestConfig } from '../types'
import { setHost } from './host'

describe('host request middleware', () => {
  let req: RequestConfig
  beforeEach(() => {
    req = {
      host: 'init'
    } as RequestConfig
  })

  it('can set a static host', () => {
    const middleware = setHost('static')
    const result = middleware(req, undefined) as RequestConfig
    expect(result.host).toBe('static')
  })

  it('can set a dynamic host', () => {
    const fn = jest.fn((props: { hostName: string }) => props.hostName)
    const middleware = setHost(fn)
    const payload = { hostName: 'dynamicHost' }
    const result = middleware(req, payload) as RequestConfig

    expect(fn).toHaveBeenCalledWith(payload)
    expect(result.host).toBe('dynamicHost')
  })

  it('can set a dynamic host, asynchronously', async () => {
    const fn = jest.fn((props: { hostName: string }) => Promise.resolve(props.hostName))
    const middleware = setHost(fn)
    const payload = { hostName: 'dynamicHost' }
    const result = middleware(req, payload) as RequestConfig

    expect(fn).toHaveBeenCalledWith(payload)
    expect(result).toBeInstanceOf(Promise)
    expect((await result).host).toStrictEqual('dynamicHost')
  })
})
