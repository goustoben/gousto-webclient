import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'
import { fetchRecipes } from 'apis/recipes'
import { getCutoffDateTime } from 'utils/deliveries'
import { loadRecipes } from '../recipes'

jest.mock('apis/recipes', () => ({
  fetchRecipes: jest.fn()
}))

jest.mock('utils/deliveries', () => ({
  getCutoffDateTime: jest.fn()
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
})
