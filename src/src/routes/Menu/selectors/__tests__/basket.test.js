import Immutable from 'immutable'
import { okRecipes } from 'utils/basket'
import { getOkRecipeIds } from '../basket'

describe('the composed selectors', () => {
  describe('getOkRecipeIds', () => {
    let basketRecipes
    let menuRecipeIds
    let stock
    let numPortions

    beforeEach(() => {
      basketRecipes = Immutable.Map({ '100': 1 })
      menuRecipeIds = Immutable.fromJS(['100', '200'])
      stock = Immutable.fromJS({
        '100': {
          '2': 1000,
          '4': 1000,
          '8': 0,
        },
        '200': {
          '2': 1000,
          '4': 1000,
          '8': 0,
        }
      })
      numPortions = 2
    })

    test('calls the okRecipes function with correct arguments', () => {
      expect(getOkRecipeIds.resultFunc(basketRecipes, menuRecipeIds, stock, numPortions))
        .toEqual(okRecipes(basketRecipes, menuRecipeIds, stock, numPortions))
    })
  })
})
