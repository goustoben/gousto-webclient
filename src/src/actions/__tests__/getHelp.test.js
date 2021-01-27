import { Map } from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import * as recipesAPI from 'apis/recipes'
import logger from 'utils/logger'
import { safeJestMock } from '_testing/mocks'
import { loadRecipesById } from '../getHelp'

const fetchRecipes = safeJestMock(recipesAPI, 'fetchRecipes')
safeJestMock(logger, 'error')

const RECIPE_IDS = ['10', '20', '30']
const ACCESS_TOKEN = '12234'
const FETCH_RECIPES_RESPONSE = {
  data: {
    10: {
      id: '10',
      title: 'aa',
      url: 'url10',
      ingredients: [
        { uuid: '1000', label: 'label1000', more: 'props' },
        { uuid: '1001', label: 'label1001', more: 'props' },
      ],
      more: 'props',
    },
    20: {
      id: '20',
      title: 'bb',
      url: 'url20',
      ingredients: [
        { uuid: '1002', label: 'label1002', more: 'props' },
        { uuid: '1003', label: 'label1003', more: 'props' },
      ],
      more: 'props',
    },
  }
}
const FETCH_RECIPES_ERROR = {
  status: 'error',
  message: 'error api',
}

const getState = () => ({
  auth: Map({ accessToken: ACCESS_TOKEN }),
})
const dispatchMock = jest.fn()

describe('getHelp actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('action thunk loadRecipesById', () => {
    describe('Given the action is called and recipes are fetched successfully', () => {
      beforeEach(async () => {
        fetchRecipes.mockResolvedValueOnce(FETCH_RECIPES_RESPONSE)
        await loadRecipesById(RECIPE_IDS)(dispatchMock, getState)
      })

      test('it calls fetchRecipes with the right parameters', () => {
        expect(fetchRecipes).toHaveBeenCalledWith(ACCESS_TOKEN, '', {
          includes: ['ingredients'],
          'filters[recipe_ids]': RECIPE_IDS,
        })
      })

      test('it dispatches a pending action to true', () => {
        expect(dispatchMock).toHaveBeenCalledWith({
          type: actionTypes.PENDING,
          key: actionTypes.GET_HELP_RECIPES_RECEIVE,
          value: true,
        })
      })

      test('it dispatches the recipes', () => {
        expect(dispatchMock).toHaveBeenCalledWith({
          type: actionTypes.GET_HELP_RECIPES_RECEIVE,
          recipes: FETCH_RECIPES_RESPONSE.data,
        })
      })

      test('it dispatches a pending action to false', () => {
        expect(dispatchMock).toHaveBeenCalledWith({
          type: actionTypes.PENDING,
          key: actionTypes.GET_HELP_RECIPES_RECEIVE,
          value: false,
        })
      })
    })

    describe('Given the action is called and fetching the recipes throws an error', () => {
      beforeEach(async () => {
        fetchRecipes.mockRejectedValueOnce(FETCH_RECIPES_ERROR)
        await loadRecipesById(RECIPE_IDS)(dispatchMock, getState)
      })

      test('it dispatches a pending action to true', () => {
        expect(dispatchMock).toHaveBeenCalledWith({
          type: actionTypes.PENDING,
          key: actionTypes.GET_HELP_RECIPES_RECEIVE,
          value: true,
        })
      })

      test('it dispatches an error action with the error message', () => {
        expect(dispatchMock).toHaveBeenCalledWith({
          type: actionTypes.ERROR,
          key: actionTypes.GET_HELP_RECIPES_RECEIVE,
          value: FETCH_RECIPES_ERROR.message,
        })
      })

      test('it logs the error', () => {
        expect(logger.error).toHaveBeenCalledWith(FETCH_RECIPES_ERROR)
      })

      test('it dispatches a pending action to false', () => {
        expect(dispatchMock).toHaveBeenCalledWith({
          type: actionTypes.PENDING,
          key: actionTypes.GET_HELP_RECIPES_RECEIVE,
          value: false,
        })
      })
    })

    describe('Given the action is called with no recipeIds', () => {
      beforeEach(async () => {
        await loadRecipesById()(dispatchMock, getState)
      })

      test('nothing is dispatched', () => {
        expect(dispatchMock).not.toHaveBeenCalled()
      })

      test('fetchRecipes is not called', () => {
        expect(fetchRecipes).not.toHaveBeenCalled()
      })
    })
  })
})
