import Immutable from 'immutable'

import { isAllergen } from './SubIngredients'

describe('isAllergen', () => {
  let allergens
  beforeEach(() => {
    allergens = Immutable.List(['soya', 'wheat-gluten', 'milk', 'sulphites'])
  })
  test('should return false if the ingredient passed is not part of the list of allergens', () => {
    expect(isAllergen(allergens, 'cheese')).toEqual(false)
  })
  test('should return true if the ingredient passed is part of the list of allergens', () => {
    expect(isAllergen(allergens, 'wheat')).toEqual(true)
  })

  test.each([
    'celery', 'celeriac', 'wheat', 'rye',
    'barley', 'oats', 'oat', 'oatmeal',
    'spelt', 'kamut', 'crustacean',
    'egg', 'eggs', 'fish', 'lupin', 'milk',
    'mollusc', 'mustard', 'almond', 'almonds',
    'hazelnut', 'hazelnuts', 'cashew nut', 'cashew nuts',
    'pecan nut', 'pecan nuts', 'pecans',
    'brazil nut', 'brazil nuts',
    'pistachio nut', 'pistachio nuts', 'pistachios',
    'macadmaia nut', 'macadamia nuts', 'macadmamias',
    'queensland nut', 'walnut', 'walnuts',
    'peanut', 'peanuts', 'sesame',
    'soy', 'soya', 'sulphites', 'sulphur dioxide'
  ])(
    'should return true if the ingredient (%s) is part of the hardcoded list of allergens',
    (ingredient) => {
      expect(isAllergen(allergens, ingredient)).toEqual(true)
    }
  )
})
