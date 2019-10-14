import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import { menuRecipeDetailVisibilityChange } from 'actions/menu'

// TODO: Move this to the menu.test.js file we are working on
describe('menu actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
  })

  describe('menuRecipeDetailVisibilityChange', () => {
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
        menuCollections: Immutable.fromJS({})
      })
    })

    test('should dispatch TRACKING_VIEW_RECIPE_DETAILS action if second param is true', () => {
      menuRecipeDetailVisibilityChange('123', true)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING_VIEW_RECIPE_DETAILS,
        trackingData: {
          actionType: 'View Details clicked',
        }
      })
    })

    test('should not dispatch TRACKING_VIEW_RECIPE_DETAILS action if second param is false', () => {
      menuRecipeDetailVisibilityChange('123', false)(dispatch, getState)

      expect(dispatch).not.toHaveBeenCalledWith({
        type: actionTypes.TRACKING_VIEW_RECIPE_DETAILS,
        trackingData: {
          actionType: 'View Details clicked',
        }
      })
    })
  })
})
