import Immutable from 'immutable' /* eslint-disable new-cap */

import { isAllergen } from 'Recipe/Detail/SubIngredients/SubIngredients'

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
})
