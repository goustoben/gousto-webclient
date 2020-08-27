import Immutable from 'immutable'
import {
  getMenuRecipeSidesModalRecipeId,
} from '../menuRecipeSidesModal'

describe('getMenuRecipeSidesModalRecipeId', () => {
  describe('when no sidesModalRecipeId', () => {
    const menu = Immutable.fromJS({
      sidesModalRecipeId: null,
    })

    test('should return null', () => {
      const result = getMenuRecipeSidesModalRecipeId.resultFunc(menu)

      expect(result).toEqual(null)
    })
  })

  describe('when sidesModalRecipeId is set', () => {
    const menu = Immutable.fromJS({
      sidesModalRecipeId: '123',
    })

    test('should return correct recipe ID', () => {
      const result = getMenuRecipeSidesModalRecipeId.resultFunc(menu)

      expect(result).toEqual('123')
    })
  })
})
