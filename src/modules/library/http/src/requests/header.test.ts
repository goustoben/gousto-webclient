import { RequestConfig } from '../types'
import { setHeader, setHeaders } from './header'

describe('header request middlewares', () => {
  let req: RequestConfig
  beforeEach(() => {
    req = {} as RequestConfig
  })

  describe('setHeader (single)', () => {
    it('can set a static header', () => {
      const middleware = setHeader('foo', 'bar')
      const result = middleware(req, undefined) as RequestConfig
      expect(result.headers).toStrictEqual({
        foo: 'bar'
      })
    })

    it('can set a dynamic, synchronous header', () => {
      const fn = jest.fn((_: Record<string, unknown>) => 'bar')
      const middleware = setHeader('foo', fn)
      const payload = { input: 'test' }
      const result = middleware(req, payload) as RequestConfig

      expect(fn).toHaveBeenCalledWith(payload)
      expect(result.headers).toStrictEqual({
        foo: 'bar'
      })
    })

    it('can set a dynamic, asynchronously defined header', async () => {
      const fn = jest.fn((_: Record<string, unknown>) => Promise.resolve('bar'))
      const middleware = setHeader('foo', fn)
      const payload = { input: 'test' }
      const result = middleware(req, payload) as Promise<RequestConfig>

      expect(fn).toHaveBeenCalledWith(payload)
      expect(result).toBeInstanceOf(Promise)
      expect((await result).headers).toStrictEqual({
        foo: 'bar'
      })
    })

    it('merges changes into existing headers', () => {
      req.headers = {
        alpha: 'old',
        beta: 'preserved'
      }
      const middleware = setHeader('alpha', 'updated')
      const result = middleware(req, undefined) as RequestConfig

      expect(result.headers).toStrictEqual({
        alpha: 'updated',
        beta: 'preserved'
      })
    })
  })

  describe('setHeaders (multiple)', () => {
    it('can set a static dict of headers', () => {
      const middleware = setHeaders({
        foo: 'bar',
        baz: 'bam'
      })
      const result = middleware(req, undefined) as RequestConfig

      expect(result.headers).toStrictEqual({
        foo: 'bar',
        baz: 'bam'
      })
    })

    it('can set a dynamic, synchronous dict of headers', () => {
      const fn = jest.fn((_: Record<string, unknown>) => ({
        foo: 'bar',
        baz: 'bam'
      }))
      const middleware = setHeaders(fn)
      const payload = { input: 'test' }
      const result = middleware(req, payload) as RequestConfig

      expect(fn).toHaveBeenCalledWith(payload)
      expect(result.headers).toStrictEqual({
        foo: 'bar',
        baz: 'bam'
      })
    })

    it('can set a dynamic, asynchronous dict of headers', async () => {
      const fn = jest.fn((_: Record<string, unknown>) => Promise.resolve({
        foo: 'bar',
        baz: 'bam'
      }))
      const middleware = setHeaders(fn)
      const payload = { input: 'test' }
      const result = middleware(req, payload) as Promise<RequestConfig>

      expect(fn).toHaveBeenCalledWith(payload)
      expect(result).toBeInstanceOf(Promise)
      expect((await result).headers).toStrictEqual({
        foo: 'bar',
        baz: 'bam'
      })
    })

    it('merges changes into existing headers', () => {
      req.headers = {
        alpha: 'old',
        beta: 'preserved'
      }
      const middleware = setHeaders({
        alpha: 'updated'
      })
      const result = middleware(req, undefined) as RequestConfig

      expect(result.headers).toStrictEqual({
        alpha: 'updated',
        beta: 'preserved'
      })
    })
  })
})
