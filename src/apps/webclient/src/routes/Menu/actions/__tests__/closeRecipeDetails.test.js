import { safeJestMock } from '_testing/mocks'
import Immutable from 'immutable'

import { closeRecipeDetails } from '../closeRecipeDetails'
import * as menuRecipeDetailsActions from '../menuRecipeDetails'

describe('menu closeRecipeDetails action', () => {
  let state
  let dispatch
  let menuRecipeDetailVisibilityChange

  const detailRecipeId = '1234'

  beforeEach(() => {
    state = {
      menuRecipeDetails: Immutable.Map({
        recipeId: detailRecipeId,
      }),
    }
    dispatch = jest.fn()

    menuRecipeDetailVisibilityChange = safeJestMock(
      menuRecipeDetailsActions,
      'menuRecipeDetailVisibilityChange',
    )
    menuRecipeDetailVisibilityChange.mockImplementation((recipeId) => ({
      type: 'mock_menuRecipeDetailVisibilityChange',
      args: { recipeId },
    }))
  })

  const getState = () => state

  test('should dispatch a menuRecipeDetailVisibilityChange action', async () => {
    const thunk = closeRecipeDetails()
    await thunk(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith({
      type: 'mock_menuRecipeDetailVisibilityChange',
      args: {
        recipeId: undefined,
      },
    })
  })
})
