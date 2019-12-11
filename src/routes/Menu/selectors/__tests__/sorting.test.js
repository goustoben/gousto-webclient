import Immutable from 'immutable'
import { getRecipes } from 'routes/Menu/selectors/sorting.js'

describe('sorting', () => {
  describe('getRecipes', () => {
    const firstRecipe = Immutable.fromJS({ id: '327' })
    const secondRecipe = Immutable.fromJS({ id: '819' })
    const thirdRecipe = Immutable.fromJS({ id: '777' })
    const filteredRecipes = Immutable.fromJS([firstRecipe, secondRecipe, thirdRecipe])
    const inStockRecipes = Immutable.fromJS([secondRecipe])

    it('should return the recipes with in stock first', () => {
      const result = getRecipes.resultFunc(filteredRecipes, inStockRecipes)
      expect(result).toEqual(Immutable.fromJS([
        secondRecipe, firstRecipe, thirdRecipe
      ]))
    })
  })
})
