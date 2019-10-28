import Immutable from 'immutable'
import { getRecipes } from 'routes/Menu/selectors/sorting'
import { getSortedRecipesForRecipeList } from '../selectors'

jest.mock('routes/Menu/selectors/sorting')

describe('RecipeList selectors', () => {
  const collectionId = '6b045b7e-3691-4299-8953-d24a2afddad3'
  const recipe1Id = '1234'
  const recipe2Id = '4567'

  const state = {
    menuCollectionRecipes: Immutable.fromJS({
      '6b045b7e-3691-4299-8953-d24a2afddad3': [
        recipe1Id
      ]
    })
  }

  const recipes = [
    Immutable.fromJS({ id: recipe1Id }),
    Immutable.fromJS({ id: recipe2Id })
  ]
  getRecipes.mockReturnValue(recipes)

  describe('getSortedRecipesForRecipeList', () => {
    describe('no collection id provided', () => {
      test('should return all recipes', () => {
        const props = {
          menuCurrentCollectionId: null
        }
  
        const result = getSortedRecipesForRecipeList(state, props)
  
        expect(result).toEqual(recipes)
      })
    })

    describe('collection id provided', () => {
      test('should return recipes in collection', () => {
        const props = {
          menuCurrentCollectionId: collectionId
        }
  
        const result = getSortedRecipesForRecipeList(state, props)
  
        expect(result).toHaveLength(1)
        expect(result[0]).toEqual(recipes[0])
      })
    })
  })
})
