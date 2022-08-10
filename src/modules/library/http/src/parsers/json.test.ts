import { parseResponseToJSON } from './json'
import { makeResponse } from '../test-utils'

describe('json parsers', () => {
  describe('parseResponseToJSON', () => {
    it('can parse a healthy response', async () => {
      const response = makeResponse('{"state": "success"}')
      const result = await parseResponseToJSON(response)
      expect(result).toStrictEqual({
        state: 'success',
      })
    })

    it('can reject a non-OK response', async () => {
      const response = makeResponse('{"state": "failure"}', 500)
      await expect(() => parseResponseToJSON(response)).rejects.toThrow(
        /@library\/http ResponseError/g,
      )
    })

    it('can reject bad JSON', async () => {
      const response = makeResponse('{boo')
      await expect(() => parseResponseToJSON(response)).rejects.toThrow(
        /@library\/http ParseJSONError/g,
      )
    })
  })
})
