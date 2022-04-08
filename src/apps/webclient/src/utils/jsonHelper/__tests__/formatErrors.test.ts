import { formatBadStatus, formatMalformed, formatUnmatched } from '../formatErrors'

describe('jsonHelper formatErrors utils', () => {
  describe('formatBadStatus', () => {
    test('given values for response and meta, returns those as a struct', () => {
      const response = { foo: 1 }
      const meta = { bar: true }
      const result = formatBadStatus(response, meta)
      expect(result).toEqual({
        response,
        meta,
      })
    })
  })

  describe('formatMalformed', () => {
    test('returns error message', () => {
      expect(formatMalformed()).toBe('Response is malformed')
    })
  })

  describe('formatUnmatched', () => {
    test('given an object, returns it', () => {
      const input = { contents: 'foo', 1: 'bar' }
      const result = formatUnmatched(input)
      expect(result).toBe(input)
    })
  })
})
