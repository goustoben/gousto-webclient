import Immutable from 'immutable'
import { flattenRecipes } from '../MenuContainer'

describe('flattenRecipes', () => {
  let recipesFromBasket, expectedResult
  beforeEach(() => {
    recipesFromBasket = Immutable.Map({
      'abc123cds': 1,
      'bds345fvf': 1
    })
  })
  test('should return flatten recipes array', () => {
    const result = flattenRecipes(recipesFromBasket)
    expectedResult = ['abc123cds', 'bds345fvf']
    expect(result).toEqual(expectedResult)
  })
})
