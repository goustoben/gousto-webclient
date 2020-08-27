import Immutable from 'immutable'
import { getMenuRecipeSidesModalRecipe } from '../menuRecipeSidesModal'

describe('getMenuRecipeSidesModalRecipeId', () => {
  describe('when no sidesModalRecipe', () => {
    const menu = Immutable.fromJS({
      sidesModalRecipe: null,
    })

    test('should return null', () => {
      const result = getMenuRecipeSidesModalRecipe.resultFunc(menu)

      expect(result).toEqual(null)
    })
  })

  describe('when sidesModalRecipe is set', () => {
    const menu = Immutable.fromJS({
      sidesModalRecipe: '123',
    })

    test('should return correct recipe ID', () => {
      const result = getMenuRecipeSidesModalRecipe.resultFunc(menu)

      expect(result).toEqual('123')
    })
  })
})
