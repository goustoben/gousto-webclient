import { areEqualArrays } from './utils'

describe('given areEqualArrays function', () => {
  let first: any[] | null
  let second: any[] | null

  describe('when first and second array is the same object', () => {
    it('should return true', () => {
      first = []
      second = first

      const result = areEqualArrays(first, second)

      expect(result).toBe(true)
    })
  })

  describe('when first argument is not an array', () => {
    it('should return false', () => {
      first = null
      second = []

      const result = areEqualArrays(first, second)

      expect(result).toBe(false)
    })
  })

  describe('when second argument is not an array', () => {
    it('should return false', () => {
      first = []
      second = null

      const result = areEqualArrays(first, second)

      expect(result).toBe(false)
    })
  })

  describe('when one array is a subset of another', () => {
    it('should return false', () => {
      first = [1, 2, 3, 4]
      second = [1, 2, 3]

      const result = areEqualArrays(first, second)

      expect(result).toBe(false)
    })
  })

  describe('when arrays has the same items but sorted differently', () => {
    it('should return false', () => {
      first = [1, 2, 3, 4]
      second = [2, 3, 1, 4]

      const result = areEqualArrays(first, second)

      expect(result).toBe(false)
    })
  })

  describe('when arrays has the same items and sorting', () => {
    it('should return true', () => {
      first = [1, 2, 3, 4]
      second = [1, 2, 3, 4]

      const result = areEqualArrays(first, second)

      expect(result).toBe(true)
    })
  })
})
