import { allergenNamesInParentheses } from '../Allergens'

describe('Allergens', () => {
  describe('allergenNamesInParentheses', () => {
    test('should render a string of allergens within parentheses when passed an array of allergens', () => {
      const allergensMock = ['wheat', 'milk', 'celery']

      const result = allergenNamesInParentheses(allergensMock)

      expect(result).toEqual('(wheat, milk, celery)')
    })

    test('should render "gluten" as "cereals containing gluten"', () => {
      const allergensMock = ['wheat', 'gluten', 'celery']

      const result = allergenNamesInParentheses(allergensMock)

      expect(result).toEqual('(wheat, cereals containing gluten, celery)')
    })
  })
})
