import Immutable from 'immutable'
import { loadRecipesForSingleCollection } from 'actions/loadRecipesForSingleCollection'
import { menuReceiveCollectionRecipes, menuReceiveMenu } from 'actions/menu'

jest.mock('actions/menu', () => ({
  menuReceiveCollectionRecipes: jest.fn(),
  menuReceiveMenu: jest.fn(),
}))

describe('loadRecipesForSingleCollection with menuService', () => {
  let getState
  let dispatch
  let transformedRecipes
  let transformedCollectionRecipesIds
  beforeEach(() => {
    transformedRecipes = [
      { coreRecipeId: '1234' },
      { coreRecipeId: '5678' },
      { coreRecipeId: '9101' },
    ]

    transformedCollectionRecipesIds = {
      testCollectionId1: [
        {
          core_recipe_id: 1234,
          type: 'recipe'
        },
        {
          core_recipe_id: 5678,
          type: 'recipe'
        }],
      testCollectionId2: [
        {
          core_recipe_id: 1234,
          type: 'recipe'
        },
        {
          core_recipe_id: 9101,
          type: 'recipe'
        }
      ]
    }

    dispatch = jest.fn()

    const state = {
      auth: Immutable.fromJS({
        accessToken: 'testAccessToken'
      }),
      features: Immutable.fromJS({
        menu_id: {
          value: false
        }
      })
    }

    getState = () => state
  })

  afterEach(() => {
    menuReceiveCollectionRecipes.mockClear()
  })

  test('should dispatch menuReceiveCollectionRecipes when recipes are returned if idsOnly is true', async () => {
    const idsOnly = true

    await loadRecipesForSingleCollection('testCollectionId1', idsOnly, transformedRecipes, transformedCollectionRecipesIds)(dispatch, getState)
    expect(menuReceiveCollectionRecipes).toHaveBeenCalledWith('testCollectionId1', [{ coreRecipeId: '1234' }, { coreRecipeId: '5678' }])
  })

  test('should dispatch menuReceiveMenu when recipes are returned if idsOnly is false', async () => {
    const idsOnly = false

    await loadRecipesForSingleCollection('testCollectionId', idsOnly, transformedRecipes, transformedCollectionRecipesIds)(dispatch, getState)
    expect(menuReceiveMenu).toHaveBeenCalledWith([{ coreRecipeId: '1234' }, { coreRecipeId: '5678' }, { coreRecipeId: '9101' }])
  })
})

