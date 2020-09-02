import Immutable from 'immutable'
import { push } from 'react-router-redux'
import * as trackingKeys from '../../../../actions/trackingKeys'
import { actionTypes } from '../../../../actions/actionTypes'
import * as menuRecipeDetailsActions from '../menuRecipeDetails'
import * as recipeListSelectors from '../../selectors/recipeList'
import { safeJestMock } from '../../../../_testing/mocks'
jest.mock('react-router-redux', () => ({
  push: jest.fn()
}))

describe('showDetailRecipe', () => {
  const state = {
    menuRecipeDetails: Immutable.fromJS({
      recipeId: null
    }),
    recipes: Immutable.Map({
      1234: {}
    })
  }
  let dispatch
  describe('when boxSummaryShow is true', () => {
    beforeAll(() => {
      safeJestMock(recipeListSelectors, 'replaceSideRecipeIdWithBaseRecipeId').mockImplementation((_, { recipeId }) => recipeId)

      dispatch = jest.fn()
      const stateWithTrueBoxSummaryShow = {
        ...state,
        boxSummaryShow: Immutable.fromJS({
          show: false
        }),
        routing: {
          locationBeforeTransitions: {
            query: ''
          }
        }
      }
      const getStateForTest = () => stateWithTrueBoxSummaryShow

      menuRecipeDetailsActions.showDetailRecipe('1234', false)(dispatch, getStateForTest)
    })

    test('should call menuRecipeDetailVisibilityChange', () => {
      expect(dispatch).toHaveBeenCalledWith({
        recipeId: '1234',
        type: 'MENU_RECIPE_DETAIL_VISIBILITY_CHANGE',
        trackingData: {
          actionType: trackingKeys.changeMenuRecipeDetailVisibility,
          recipeId: '1234',
          show: true
        },
      })
    })
  })
})

describe('menuRecipeDetailVisibilityChange', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    getState.mockReturnValue({
      auth: Immutable.Map({
        accessToken: 'an-access-token',
        isAuthenticated: false
      }),
      features: Immutable.fromJS({}),
      routing: {
        locationBeforeTransitions: {
          query: {}
        }
      },
      menuCollections: Immutable.fromJS({}),
      recipes: Immutable.Map({
        123: {},
      })
    })
  })

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
  })

  test('should dispatch TRACKING_VIEW_RECIPE_DETAILS action if second param is true', () => {
    menuRecipeDetailsActions.menuRecipeDetailVisibilityChange('123', true)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.TRACKING_VIEW_RECIPE_DETAILS,
      trackingData: {
        actionType: 'View Details clicked',
      }
    })
  })

  test('should not dispatch TRACKING_VIEW_RECIPE_DETAILS action if second param is false', () => {
    menuRecipeDetailsActions.menuRecipeDetailVisibilityChange('123', false)(dispatch, getState)

    expect(dispatch).not.toHaveBeenCalledWith({
      type: actionTypes.TRACKING_VIEW_RECIPE_DETAILS,
      trackingData: {
        actionType: 'View Details clicked',
      }
    })
  })

  describe('when recipeId is not in the store recipes', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'an-access-token',
          isAuthenticated: false
        }),
        features: Immutable.fromJS({}),
        routing: {
          locationBeforeTransitions: {
            query: {}
          }
        },
        menuCollections: Immutable.fromJS({}),
        recipes: Immutable.Map({
          346: {},
        })
      })
    })
    test('should not dispatch', () => {
      menuRecipeDetailsActions.menuRecipeDetailVisibilityChange('123', true)(dispatch, getState)
      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('When recipeId is a side', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'an-access-token',
          isAuthenticated: false
        }),
        features: Immutable.fromJS({}),
        routing: {
          locationBeforeTransitions: {
            query: {}
          }
        },
        menuCollections: Immutable.fromJS({}),
        recipes: Immutable.Map({
          789: {},
        })
      })

      safeJestMock(recipeListSelectors, 'replaceSideRecipeIdWithBaseRecipeId').mockReturnValue('mock-base-recipe-id-789')
    })

    test('should replace recipeId with the base recipeId', () => {
      menuRecipeDetailsActions.menuRecipeDetailVisibilityChange('789', true)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
        recipeId: 'mock-base-recipe-id-789',
        trackingData: {
          actionType: trackingKeys.changeMenuRecipeDetailVisibility,
          recipeId: 'mock-base-recipe-id-789',
          show: true,
        },
      })
    })
  })
})

describe('checkQueryParams', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    getState.mockReturnValue({
      routing: {
        locationBeforeTransitions: {
          query: {}
        }
      },
    })
  })

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
  })

  test('should not call dispatch', () => {
    menuRecipeDetailsActions.checkQueryParams()(dispatch, getState)
    expect(dispatch).not.toHaveBeenCalled()
  })

  describe('when query has recipeDetailId', () => {
    beforeEach(() => {
      safeJestMock(menuRecipeDetailsActions, 'showDetailRecipe').mockReturnValue('showDetailRecipe')
      push.mockImplementation((arg) => arg)
      getState.mockReturnValue({
        routing: {
          locationBeforeTransitions: {
            query: {
              recipeDetailId: '1234'
            }
          }
        }
      })
    })

    test('should dispatch push with new route without recipeDetailId', () => {
      menuRecipeDetailsActions.checkQueryParams()(dispatch, getState)
      expect(push).toHaveBeenCalledWith({
        query: {}
      })
    })

    test('should dispatch showDetailRecipe', () => {
      menuRecipeDetailsActions.checkQueryParams()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith('showDetailRecipe')
    })
  })
})
