import { getPercentageFromCookingTime } from './recipeUtils'

describe('Cooking time percentage', () => {
  describe('when given 0 cookingTime', () => {
    test('should return 0', () => {
      const percentage = getPercentageFromCookingTime(0)

      expect(percentage).toBe(0)
    })
  })

  describe('when given 30 cookingTime', () => {
    test('should return 50', () => {
      const percentage = getPercentageFromCookingTime(30)

      expect(percentage).toBe(50)
    })
  })

  describe('when given 60 cookingTime', () => {
    test('should return 100', () => {
      const percentage = getPercentageFromCookingTime(60)

      expect(percentage).toBe(100)
    })
  })

  describe('when given 70 cookingTime', () => {
    test('should return 100', () => {
      const percentage = getPercentageFromCookingTime(70)

      expect(percentage).toBe(100)
    })
  })
})
