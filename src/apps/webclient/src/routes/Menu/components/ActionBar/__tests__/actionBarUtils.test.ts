import { ordinal, formatOptionalPrice } from '../actionBarUtils'

describe('actionBarUtils', () => {
  describe('given ordinal is called', () => {
    test('then it should return correct strings', () => {
      expect(ordinal(1)).toBe('1st')
      expect(ordinal(2)).toBe('2nd')
      expect(ordinal(3)).toBe('3rd')
      expect(ordinal(4)).toBe('4th')
    })
  })

  describe('given formatOptionalPrice is called', () => {
    test('then it should return correct strings', () => {
      expect(formatOptionalPrice(undefined)).toBe('£—')
      expect(formatOptionalPrice(null)).toBe('£—')
      expect(formatOptionalPrice('')).toBe('£—')
      expect(formatOptionalPrice('some-string')).toBe('£—')
      // sometimes BE-returned prices have four digits after the separator
      expect(formatOptionalPrice('12.3456')).toBe('£12.35')
    })
  })
})
