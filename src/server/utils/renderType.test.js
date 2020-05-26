import { isServerSideRenderEligible } from './renderType'

describe('isServerSideRenderEligible', () => {
  let headers
  describe('when header contains x-pre-render false', () => {
    beforeEach(() => {
      headers = {
        'x-pre-render': 'false'
      }
    })
    test('should return false', () => {
      const result = isServerSideRenderEligible(headers)
      expect(result).toBe(false)
    })
  })
  describe('when header contains x-pre-render false', () => {
    beforeEach(() => {
      headers = {}
    })
    test('should return false', () => {
      const result = isServerSideRenderEligible(headers)
      expect(result).toBe(true)
    })
  })
})
