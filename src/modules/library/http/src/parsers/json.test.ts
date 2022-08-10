import { Response as ResponseShim } from 'node-fetch'

import { parseResponseToJSON } from './json'

describe('json parsers', () => {
  function makeResponse (json: string, status = 200) {
    const shimmed = new ResponseShim(json, { status }) as unknown
    return shimmed as Response
  }

  describe('parseResponseToJSON', () => {
    it('can parse a healthy response', async () => {
      const response = makeResponse('{"state": "success"}')
      const result = await parseResponseToJSON(response)
      expect(result).toStrictEqual({
        state: 'success'
      })
    })

    it('can reject a non-OK response', async () => {
      const response = makeResponse('{"state": "failure"}', 500)
      await expect(
        () => parseResponseToJSON(response)
      ).rejects.toThrow(/@library\/http ResponseError/g)
    })

    it('can reject bad JSON', async () => {
      const response = makeResponse('{boo')
      await expect(
        () => parseResponseToJSON(response)
      ).rejects.toThrow(/@library\/http ParseJSONError/g)
    })
  })
})
