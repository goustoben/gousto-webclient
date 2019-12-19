import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'
import statusActions from 'actions/status'
import { fetchRecipes } from 'apis/recipes'
import { getCutoffDateTime } from 'utils/deliveries'
import recipeActions, { loadRecipes } from '../recipes'

jest.mock('apis/recipes', () => ({
  fetchRecipes: jest.fn()
}))

jest.mock('utils/deliveries', () => ({
  getCutoffDateTime: jest.fn()
}))

jest.mock('actions/status', () => ({
  pending: jest.fn(),
  error: jest.fn()
}))

const dispatchSpy = jest.fn()
const getStateSpy = jest.fn()

describe('recipes actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('loadRecipes', () => {
    it('calls fetchRecipes with the expected values', async () => {
      const mockedTime = 'mockedTime'
      getCutoffDateTime.mockReturnValue(mockedTime)
      fetchRecipes.mockReturnValue({ data: 'mock recipes' })
      const state = {
        auth: Immutable.Map({
          accessToken: 'access-token'
        })
      }
      getStateSpy.mockReturnValue(state)

      await loadRecipes()(dispatchSpy, getStateSpy)

      expect(fetchRecipes).toHaveBeenCalledWith('access-token', '', { 'filters[available_on]': mockedTime })
      expect(dispatchSpy).toHaveBeenCalledWith({ type: actionTypes.RECIPES_RECEIVE, recipes: 'mock recipes' })
    })
  })

  describe('recipesLoadRecipesById', () => {
    let fetchRecipesMock

    beforeEach(() => {
      fetchRecipes.mockReturnValue(Promise.resolve({ data: ['2', '4', '5', '6'] }))

      const state = {
        auth: Immutable.fromJS({ accessToken: 'accessToken' }),
        recipes: Immutable.fromJS({
          1: { id: '1', title: 'Title 1' },
          3: { id: '3', title: 'Title 2' },
          7: { id: '7', title: 'Title 3' },
        }),
      }

      getStateSpy.mockReturnValue(state)
    })

    it('should dispatch status "pending" true for RECIPES_RECEIVE action before fetching recipes', async () => {
      await recipeActions.recipesLoadRecipesById(['1', '2', '3', '4'])(dispatchSpy, getStateSpy)
      expect(statusActions.pending.mock.calls[0][0]).toEqual(actionTypes.RECIPES_RECEIVE)
      expect(statusActions.pending.mock.calls[0][1]).toEqual(true)
    })

    it('should dispatch status "pending" false for RECIPES_RECEIVE action after fetching recipes', async () => {
      await recipeActions.recipesLoadRecipesById(['1', '2', '3', '4'])(dispatchSpy, getStateSpy)
      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.pending.mock.calls[1][0]).toEqual(actionTypes.RECIPES_RECEIVE)
      expect(statusActions.pending.mock.calls[1][1]).toEqual(false)
    })

    it('should dispatch status "error" true for RECIPES_RECEIVE action if an error occurs while fetching recipes', async () => {
      fetchRecipesMock = fetchRecipes.mockReturnValue(new Promise(() => { throw new Error('error!') }))

      await recipeActions.recipesLoadRecipesById(['1', '2', '3', '4'])(dispatchSpy, getStateSpy)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(statusActions.error.mock.calls[0][0]).toEqual(actionTypes.RECIPES_RECEIVE)
      expect(statusActions.error.mock.calls[0][1]).toEqual('error!')
    })

    it('should fetch recipes for each specified id if not already fetched ', async () => {
      await recipeActions.recipesLoadRecipesById(['1', '2', '3', '4', '5', '6', '7'])(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledTimes(3)
      const dispatchSpyCalls = dispatchSpy.mock.calls[1]
      expect(dispatchSpyCalls[0]).toEqual({
        type: actionTypes.RECIPES_RECEIVE,
        recipes: ['2', '4', '5', '6']
      })

      expect(fetchRecipesMock).toHaveBeenCalledTimes(1)
      const fetchRecipesMockCalls = fetchRecipesMock.mock.calls[0]
      expect(fetchRecipesMockCalls[0]).toEqual('accessToken')
      expect(fetchRecipesMockCalls[1]).toEqual('')
      expect(fetchRecipesMockCalls[2]).toEqual({
        'filters[recipe_ids]': ['2', '4', '5', '6'],
        'includes': ['ingredients', 'allergens', 'taxonomy'],
      })
    })

    it('should not fetch recipes if no new recipes are found in ids requested', async () => {
      await recipeActions.recipesLoadRecipesById(['1', '3', '7'])(dispatchSpy, getStateSpy)
      expect(fetchRecipesMock).not.toHaveBeenCalled()
    })

    describe('isCookbook = true', () => {

      test('should dispatch a COOKBOOK_RECIPES_RECEIVE action', async () => {
        await recipeActions.recipesLoadRecipesById(['1', '2', '3', '4'], true)(dispatchSpy, getStateSpy)

        expect(dispatchSpy.mock.calls[1][0].type).toEqual(actionTypes.COOKBOOK_RECIPES_RECEIVE)
      })

      test('should call fetchRecipes with original recipe ids, despite existing in recipe state', async () => {
        await recipeActions.recipesLoadRecipesById(['1', '2', '3', '4'], true)(dispatchSpy, getStateSpy)

        expect(fetchRecipes).toHaveBeenCalledWith('accessToken', '', {
          'includes': ['ingredients', 'allergens', 'taxonomy'],
          'filters[recipe_ids]': ['1', '2', '3', '4']
        })
      })

    })
  })
})
