import { HttpCtx, RequestConfig } from '../types'
import { setQueryParam, setQueryParams } from './query'

describe('header request middlewares', () => {
  const ctx = {} as HttpCtx

  let req: RequestConfig
  beforeEach(() => {
    req = {} as RequestConfig
  })

  describe('setQueryParam (single)', () => {
    it('can set a static queryparam', () => {
      const middleware = setQueryParam('foo', 'bar')
      const result = middleware(req, ctx, undefined) as RequestConfig
      expect(result.queryParams).toStrictEqual({
        foo: 'bar'
      })
    })

    it('can set a dynamic, synchronous queryparam', () => {
      const fn = jest.fn((_: Record<string, unknown>) => 'bar')
      const middleware = setQueryParam('foo', fn)
      const payload = { input: 'test' }
      const result = middleware(req, ctx, payload) as RequestConfig

      expect(fn).toHaveBeenCalledWith(payload, ctx)
      expect(result.queryParams).toStrictEqual({
        foo: 'bar'
      })
    })

    it('can set a dynamic, asynchronously defined queryparam', async () => {
      const fn = jest.fn((_: Record<string, unknown>) => Promise.resolve('bar'))
      const middleware = setQueryParam('foo', fn)
      const payload = { input: 'test' }
      const result = middleware(req, ctx, payload) as Promise<RequestConfig>

      expect(fn).toHaveBeenCalledWith(payload, ctx)
      expect(result).toBeInstanceOf(Promise)
      expect((await result).queryParams).toStrictEqual({
        foo: 'bar'
      })
    })

    it('merges changes into existing queryparams', () => {
      req.queryParams = {
        alpha: 'old',
        beta: 'preserved'
      }
      const middleware = setQueryParam('alpha', 'updated')
      const result = middleware(req, ctx, undefined) as RequestConfig

      expect(result.queryParams).toStrictEqual({
        alpha: 'updated',
        beta: 'preserved'
      })
    })
  })

  describe('setQueryParams (multiple)', () => {
    it('can set a static dict of queryparams', () => {
      const middleware = setQueryParams({
        foo: 'bar',
        baz: 'bam'
      })
      const result = middleware(req, ctx, undefined) as RequestConfig

      expect(result.queryParams).toStrictEqual({
        foo: 'bar',
        baz: 'bam'
      })
    })

    it('can set a dynamic, synchronous dict of queryparams', () => {
      const fn = jest.fn((_: Record<string, unknown>) => ({
        foo: 'bar',
        baz: 'bam'
      }))
      const middleware = setQueryParams(fn)
      const payload = { input: 'test' }
      const result = middleware(req, ctx, payload) as RequestConfig

      expect(result.queryParams).toStrictEqual({
        foo: 'bar',
        baz: 'bam'
      })
    })

    it('can set a dynamic, asynchronous dict of queryparams', async () => {
      const fn = jest.fn((_: Record<string, unknown>) => Promise.resolve({
        foo: 'bar',
        baz: 'bam'
      }))
      const middleware = setQueryParams(fn)
      const payload = { input: 'test' }
      const result = middleware(req, ctx, payload) as Promise<RequestConfig>

      expect(result).toBeInstanceOf(Promise)
      expect((await result).queryParams).toStrictEqual({
        foo: 'bar',
        baz: 'bam'
      })
    })

    it('merges changes into existing queryparams', () => {
      req.queryParams = {
        alpha: 'old',
        beta: 'preserved'
      }
      const middleware = setQueryParams({
        alpha: 'updated'
      })
      const result = middleware(req, ctx, undefined) as RequestConfig

      expect(result.queryParams).toStrictEqual({
        alpha: 'updated',
        beta: 'preserved'
      })
    })
  })
})
