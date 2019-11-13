import Immutable from 'immutable'
import { loadMenuCollectionsWithMenuService, getStockAvailability } from 'actions/menuActionHelper'
import { menuLoadCollections, menuLoadCollectionsRecipes } from 'actions/menuCollections'

const mockActiveMenuForDateTransformer = jest.fn()

jest.mock('actions/menuCollections')

jest.mock('apis/transformers/activeMenuForDate', () => ({
  activeMenuForDateTransformer: () => {
    return mockActiveMenuForDateTransformer
  },
}))

jest.mock('apis/transformers/collections', () => ({
  collectionsTransformer: () => {
    return 'mock collection'
  },
}))

jest.mock('apis/transformers/recipes', () => ({
  recipesTransformer: () => {
    return 'mock recipe'
  },
}))

jest.mock('apis/transformers/collectionRecipes', () => ({
  collectionRecipesTransformer: () => {
    return 'mock collection recipes'
  },
}))

describe('callMenuService', () => {
  test('calls menuLoadCollections and menuLoadCollectionsRecipes with menuservice data', async () => {
    const getState = () => {
      return {
        menuService: {
          toJS: () => {
            return 'fakeServiceData'
          }
        }
      }
    }

    const dispatch = () => {}
    const background = true

    const mockMenuLoadDispatcher = jest.fn()
    menuLoadCollections.mockImplementation(() => (mockMenuLoadDispatcher))
    menuLoadCollectionsRecipes.mockImplementation(() => (mockMenuLoadDispatcher))

    await loadMenuCollectionsWithMenuService(getState, dispatch, 'any Date', background)

    expect(menuLoadCollections).toHaveBeenCalledWith('any Date', background, 'mock collection')
    expect(mockMenuLoadDispatcher).toHaveBeenCalledWith(dispatch, getState)
    expect(menuLoadCollectionsRecipes).toHaveBeenCalledWith('any Date', 'mock recipe', 'mock collection recipes')
  })
})

describe('getStockAvailability', () => {
  test('should set availablilty by mapping new ids to old ids', async () => {
    const recipeStock = {
      '123': {
        committed: '1',
        recipeId: 123,
        number: '5',
        familyNumber: '4'
      }
    }
    const getState = () => {
      return {
        recipes: Immutable.Map({
          '07cc774f-c233-4212-9478-bc9c7912f793': {
            id: '07cc774f-c233-4212-9478-bc9c7912f793',
            coreRecipeId: '123'
          }
        })
      }
    }

    const result = getStockAvailability(getState, recipeStock)

    expect(result).toEqual({
      "07cc774f-c233-4212-9478-bc9c7912f793": {
        "2": 5,
        "4": 4,
        "committed": true,
      },
    })
  })

  test('should handle recipe ids that are in stock but have not been returned by menuservice', async () => {
    // We have seen occations when the menu service has not been updated with the
    // latest recipe but the stock request has so we need to protect against it
    const recipeStock = {
      '123': {
        committed: '1',
        recipeId: 123,
        number: '5',
        familyNumber: '4'
      },
    }
    const getState = () => {
      return {
        recipes: Immutable.Map({
          '07cc774f-c233-4212-9478-bc9c7912f793': {
            id: '07cc774f-c233-4212-9478-bc9c7912f793',
            coreRecipeId: '123'
          },
          '473c49e7-2414-4c1e-89a1-a91907927e20': {
            id: '473c49e7-2414-4c1e-89a1-a91907927e20',
            coreRecipeId: '456'
          }
        })
      }
    }

    const result = getStockAvailability(getState, recipeStock)

    expect(result).toEqual({
      "07cc774f-c233-4212-9478-bc9c7912f793": {
        "2": 5,
        "4": 4,
        "committed": true,
      },
    })
  })
})

