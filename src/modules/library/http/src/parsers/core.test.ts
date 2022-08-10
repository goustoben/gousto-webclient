import { extractCoreData, parseValueToCoreData } from './core'
import { makeResponse } from '../test-utils'

describe('Core response parsers', () => {
  describe('extractCoreData', () => {
    // This parser just composes other well-tested components, and the type system ensures those
    // components should interop. But it's worth having a vertical test of a success and failure case too.

    it('can extract data from a successful response', async () => {
      const validData = {
        status: 'ok',
        result: {
          data: 'content'
        }
      }
      const response = makeResponse(JSON.stringify(validData))
      const middleware = extractCoreData<string>()
      const result = await middleware(response)
      expect(result).toBe('content')
    })

    it('can reject if given a bad response', async () => {
      const invalidData = {
        status: 'ok',
        result: null
      }
      const response = makeResponse(JSON.stringify(invalidData))
      const middleware = extractCoreData()
      await expect(
        () => middleware(response)
      ).rejects.toThrow(
        /^@library\/http ParseCoreDataError/g
      )
    })
  })

  describe('parseValueToCoreData', () => {
    it.each([
      {
        json: '"notObject"',
        err: '@library/http ParseCoreDataError: must be non-null object, was string=notObject'
      },
      {
        json: 'null',
        err: '@library/http ParseCoreDataError: must be non-null object, was object=null'
      },
      {
        json: 'null',
        err: '@library/http ParseCoreDataError: must be non-null object, was object=null'
      },
      {
        json: '{"status": "fail"}',
        err: '@library/http ParseCoreDataError: *.status is not "ok", was string=fail'
      },
      {
        json: '{"status": "ok"}',
        err: '@library/http ParseCoreDataError: *.result does not exist'
      },
      {
        json: '{"status": "ok", "result": "notObject"}',
        err: '@library/http ParseCoreDataError: *.result must be non-null object, was string=notObject'
      },
      {
        json: '{"status": "ok", "result": {}}',
        err: '@library/http ParseCoreDataError: *.result.data does not exist'
      },
    ])('throws errors if CoreData is malformed', (testCase) => {
      const json = JSON.parse(testCase.json)
      expect(() => parseValueToCoreData(json)).toThrow(testCase.err)
    })

    it('can parse valid data', () => {
      const validData = {
        status: 'ok',
        result: {
          data: 'data'
        }
      }
      expect(() => parseValueToCoreData(validData)).not.toThrow()
    })
  })
})
