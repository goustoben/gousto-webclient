import { micronutrientsTransformer, promotionsTransformer, surchargeTransformer, isNewTransformer } from './recipeHelpers'

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

describe('promotionsTransformer', () => {
  describe('when attributes has promotions', () => {
    const attributes = {
      promotions: [
        { slug: 'some-promotion-name' },
        { slug: 'another-cool-promotion' }
      ]
    }

    test('should return promotions from attributes', () => {
      const expected = ['some-promotion-name', 'another-cool-promotion']

      const result = promotionsTransformer(attributes)
      expect(result).toEqual(expected)
    })
  })

  describe('when attributes has no promotions', () => {
    const attributes = { }

    test('should return empty array', () => {
      const expected = []

      const result = promotionsTransformer(attributes)
      expect(result).toEqual(expected)
    })
  })
})

describe('surchargeTransformer', () => {
  test('should return decimal price', () => {
    const surcharge = 399
    const result = surchargeTransformer(surcharge)
    const expectedPrice = 3.99
    expect(result).toEqual({listPrice: expectedPrice})
  })
})

describe('isNewTransformer', () => {
  let debutRecipes
  const recipeId = '1234'
  describe('when there is no debut recipes', () => {
    beforeEach(() => {
      debutRecipes = {
        data: []
      }
    })
    test('should return false', () => {
      const result = isNewTransformer(debutRecipes, recipeId)
      expect(result).toBe(false)
    })
  })

  describe('when debut recipes contain recipe id', () => {
    beforeEach(() => {
      debutRecipes = {
        data: [{
          core_recipe_id: '1234'
        }]
      }
    })
    test('should return true', () => {
      const result = isNewTransformer(debutRecipes, recipeId)
      expect(result).toBe(true)
    })
  })

  describe('when debut recipes doesn not contain recipe id', () => {
    beforeEach(() => {
      debutRecipes = {
        data: [{
          core_recipe_id: '2345'
        }]
      }
    })
    test('should return true', () => {
      const result = isNewTransformer(debutRecipes, recipeId)
      expect(result).toBe(false)
    })
  })
})
