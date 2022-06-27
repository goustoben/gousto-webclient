import { Rec, TypeAssert } from '../test-utils'
import { HttpCtx, RequestConfig, RequestMiddleware } from '../types'
import { composeRequest } from './request'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Helpers
 * ============================================================================
 *
 * These helpers describe some contrived request middleware where we expect
 * the developer to pass a payload of increasingly specific requirements
 */
const rqmOfNumber: RequestMiddleware<number> = {} as any
const rqmOfRecord: RequestMiddleware<Rec> = {} as any
const rqmOfDict: RequestMiddleware<Rec<string>> = {} as any
const rqmOfDictOf3: RequestMiddleware<Rec<'foo' | 'bar' | 'baz'>> = {} as any
const rqmOfDictOf2: RequestMiddleware<Rec<'foo' | 'bar'>> = {} as any
const rqmOfDictOf1: RequestMiddleware<Rec<'foo'>> = {} as any

/**
 * Type system
 * ============================================================================
 */

/**
 * Level 1 inference
 */
const request1 = composeRequest(rqmOfNumber)
const request1TypeInferred: TypeAssert<
  typeof request1,
  RequestMiddleware<number>
> = true

/**
 * Level 2 inference. Type should be most specific (record of strings, not record of unknowns)
 */
const request2 = composeRequest(rqmOfDict, rqmOfRecord)

const request2TypeInferred: TypeAssert<
  typeof request2,
  RequestMiddleware<Rec<string>>
> = true

const request2TypeSpecific: TypeAssert<
  typeof request2,
  RequestMiddleware<Rec<unknown>>
> = false

/**
 * Level 3 inference
 */
const request3 = composeRequest(rqmOfRecord, rqmOfDict, rqmOfDictOf3)

const request3TypeInferred: TypeAssert<
  typeof request3,
  RequestMiddleware<Rec<'foo' | 'bar' | 'baz'>>
> = true

const request3TypeSpecific: TypeAssert<
  typeof request3,
  RequestMiddleware<Rec<string>>
> = false

/**
 * Level 4 inference
 */
const request4 = composeRequest(
  rqmOfDict,
  rqmOfDictOf3,
  rqmOfRecord,
  rqmOfDictOf2
)

const request4TypeInferred: TypeAssert<
  typeof request4,
  RequestMiddleware<Rec<'foo' | 'bar'>>
> = true

const request4TypeSpecific: TypeAssert<
  typeof request4,
  RequestMiddleware<Rec<'foo' | 'bar' | 'baz'>>
> = false

/**
 * Level 5 inference
 */
const request5 = composeRequest(
  rqmOfRecord,
  rqmOfDict,
  rqmOfDictOf1,
  rqmOfDictOf2,
  rqmOfDictOf3
)

const request5TypeInferred: TypeAssert<
  typeof request5,
  RequestMiddleware<Rec<'foo'>>
> = true

const request5TypeSpecific: TypeAssert<
  typeof request5,
  RequestMiddleware<Rec<'foo' | 'bar'>>
> = false

/**
 * Runtime tests
 * ============================================================================
 */

describe('composeRequest (composing request middleware)', () => {
  const setHost = jest.fn(
    (req: RequestConfig, ctx: HttpCtx, input: unknown) => {
      req.host = 'setHost'
      return req
    }
  )

  const setHeader = jest.fn(
    (req: RequestConfig, ctx: HttpCtx, input: unknown) => {
      req.headers = {
        test: 'setHeader'
      }
      return req
    }
  )

  const setPath = jest.fn(
    (req: RequestConfig, ctx: HttpCtx, input: unknown) => {
      req.paths = ['setPath']
      return req
    }
  )

  const composed = composeRequest(setHost, setHeader, setPath)
  const testCtx: HttpCtx = {} as any
  const testInput = {}

  it('returns a function with stacktrace name "composedMiddleware"', () => {
    expect(composed.name).toBe('composedMiddleware')
  })

  describe('composed function', () => {
    it('mutates passed requestConfig using all the middlewares', () => {
      const req: RequestConfig = {
        host: 'unset',
        method: 'GET'
      }

      composed(req, testCtx, testInput)

      expect(req).toStrictEqual({
        host: 'setHost',
        headers: {
          test: 'setHeader'
        },
        method: 'GET',
        paths: ['setPath']
      })
    })

    it('passes the context object to each middleware', () => {
      expect(setHost.mock.calls[0][1]).toBe(testCtx)
      expect(setHeader.mock.calls[0][1]).toBe(testCtx)
      expect(setPath.mock.calls[0][1]).toBe(testCtx)
    })

    it('passes the input value to each middleware', () => {
      expect(setHost.mock.calls[0][2]).toBe(testInput)
      expect(setHeader.mock.calls[0][2]).toBe(testInput)
      expect(setPath.mock.calls[0][2]).toBe(testInput)
    })
  })
})
