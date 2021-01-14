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

  test.each(['almond',
    'almonds',
    'barley',
    'brazil',
    'nut',
    'nuts',
    'cashew',
    'celeriac',
    'celery',
    'crustacean',
    'egg',
    'eggs',
    'fish',
    'hazelnut',
    'hazelnuts',
    'kamut',
    'lupin',
    'macadamia',
    'macadamia',
    'macadamias',
    'milk',
    'mollusc',
    'mustard',
    'oat',
    'oatmeal',
    'oats',
    'peanut',
    'peanuts',
    'pecan',
    'pecans',
    'pistachio',
    'pistachios',
    'queensland',
    'rye',
    'sesame',
    'soy',
    'soya',
    'spelt',
    'sulphites',
    'sulphur',
    'dioxide',
    'walnut',
    'walnuts',
    'wheat'])(
    'should return true if the ingredient (%s) is part of the hardcoded list of allergens',
    (ingredient) => {
      expect(isAllergen(allergens, ingredient)).toEqual(true)
    }
  )
})
