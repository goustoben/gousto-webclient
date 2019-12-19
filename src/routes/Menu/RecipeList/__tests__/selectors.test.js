import Immutable from 'immutable'
import { getRecipes } from 'routes/Menu/selectors/sorting'
import { getSortedRecipesForRecipeList } from '../selectors'

jest.mock('routes/Menu/selectors/sorting')

describe('RecipeList selectors', () => {
  const collectionId = 'collectionId'
  const recipe1Id = '1234'
  const recipe2Id = '4567'

  const state = {
    menuCollectionRecipes: Immutable.fromJS({
      'collectionId': [
        recipe1Id
      ]
    })
  }

  let recipes

  beforeEach (() => {
    recipes = [
      Immutable.fromJS({ id: recipe1Id }),
      Immutable.fromJS({ id: recipe2Id })
    ]

    getRecipes.mockReturnValue(recipes)
  })

  afterEach (() => {
    jest.clearAllMocks()
  })

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

    describe('wrong collection id provided', () => {
      test('should return all recipes', () => {
        const props = {
          menuCurrentCollectionId: 'unexisting-collection-id'
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

    describe('no recipe id', () => {
      const recipesWithMissingId = [
        Immutable.fromJS({ id: recipe1Id }),
        Immutable.fromJS({ })
      ]

      getRecipes.mockReturnValue(recipesWithMissingId)

      test('should return false', () => {
        const props = {
          menuCurrentCollectionId: collectionId
        }

        const result = getSortedRecipesForRecipeList(state, props)

        expect(result).toHaveLength(1)
        expect(result[0].get('id')).toEqual('1234')
      })
    })
  })
})
