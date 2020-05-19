import { micronutrientsTransformer } from './recipeHelpers'

describe('micronutrientsTransformer', () => {
  test('should return micronutrients from nutritional information', () => {
    const micronutrients = [
      {
        name: 'Iron',
        content: {
          amount: 100,
          unit: 'mg',
        },
        nrv_percent: 23,
      }
    ]
    const expectedFormat = [
      {
        name: 'Iron',
        content: {
          amount: 100,
          unit: 'mg',
        },
        nrvPercent: 23,
      }
    ]
    const result = micronutrientsTransformer(micronutrients)
    expect(result).toEqual(expectedFormat)
  })
})
