import Immutable from 'immutable'
import { safeJestMock } from '_testing/mocks'
import { closeRecipeDetails } from '../closeRecipeDetails'

import * as menuRecipeDetailsActions from '../menuRecipeDetails'
import * as menuActions from '../../../../actions/menu'

describe('menu closeRecipeDetails action', () => {
  let state
  let dispatch
  let menuRecipeDetailVisibilityChange
  let unselectRecipeSide

  const detailRecipeId = '1234'

  beforeEach(() => {
    state = {
      menuRecipeDetails: Immutable.Map({
        recipeId: detailRecipeId
      }),
      menu: Immutable.Map({
        selectedRecipeSides: {}
      })
    }
    dispatch = jest.fn()

    menuRecipeDetailVisibilityChange = safeJestMock(menuRecipeDetailsActions, 'menuRecipeDetailVisibilityChange')
    menuRecipeDetailVisibilityChange.mockImplementation((recipeId) => ({
      type: 'mock_menuRecipeDetailVisibilityChange',
      args: { recipeId }
    }))

    unselectRecipeSide = safeJestMock(menuActions, 'unselectRecipeSide')
    unselectRecipeSide.mockImplementation((recipeId) => ({
      type: 'mock_unselectRecipeSide',
      args: { recipeId }
    }))
  })

  const getState = () => state

  test('should dispatch a menuRecipeDetailVisibilityChange action', async () => {
    const thunk = closeRecipeDetails()
    await thunk(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith({
      type: 'mock_menuRecipeDetailVisibilityChange',
      args: {
        recipeId: undefined
      }
    })
  })

  describe('when recipe has no side selected', () => {
    beforeEach(() => {
      state = {
        ...state,
        menu: state.menu.set(
          'selectedRecipeSides',
          {
            [detailRecipeId]: null
          }
        )
      }
    })

    test('should not dispatch an unselectRecipeSide action', async () => {
      const thunk = closeRecipeDetails()
      await thunk(dispatch, getState)

      expect(dispatch).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: 'mock_unselectRecipeSide' })
      )
    })
  })

  describe('when recipe has a side selected', () => {
    const selectedSideId = '999'

    beforeEach(() => {
      state = {
        ...state,
        menu: state.menu.set(
          'selectedRecipeSides',
          {
            [detailRecipeId]: selectedSideId
          }
        )
      }
    })

    describe('when side is in basket', () => {
      beforeEach(() => {
        state = {
          ...state,
          basket: Immutable.fromJS({
            recipes: {
              [selectedSideId]: 1
            }
          })
        }
      })

      test('should not dispatch an unselectRecipeSide action', async () => {
        const thunk = closeRecipeDetails()
        await thunk(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalledWith(
          expect.objectContaining({ type: 'mock_unselectRecipeSide' })
        )
      })
    })

    describe('when side is not in basket', () => {
      beforeEach(() => {
        state = {
          ...state,
          basket: Immutable.fromJS({
            recipes: {
              [selectedSideId]: 0
            }
          })
        }
      })

      test.only('should dispatch an unselectRecipeSide action', async () => {
        const thunk = closeRecipeDetails()
        await thunk(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: 'mock_unselectRecipeSide',
          args: {
            recipeId: detailRecipeId
          }
        })
      })
    })
  })
})
