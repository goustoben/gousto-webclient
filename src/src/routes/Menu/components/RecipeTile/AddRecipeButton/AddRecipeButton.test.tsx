import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, screen } from '@testing-library/react'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { createMockInitialState, createMockStore } from '../../../_testing/createMockStore'
import { AddRecipeButton } from './AddRecipeButton'

jest.mock('../../../actions/basketRecipes', () => ({
  ...jest.requireActual('../../../actions/basketRecipes'),
  basketRecipeRemove: jest.fn().mockImplementation(recipeId => ['call_basketRecipeRemove', recipeId]),
  basketRecipeAdd: jest.fn().mockImplementation(recipeId => ['call_basketRecipeAdd', recipeId])
}))

describe('AddRecipeButton', () => {
  const recipeId = '1234'
  const otherRecipeId = '5678'

  describe('when can NOT add recipes (no postcode in store)', () => {
    const state = createMockInitialState({
      basket: {
        postcode: ''
      }
    })

    test('click should dispatch menuBrowseCTAVisibilityChange', () => {
      const store = createMockStore(state)

      render(<Provider store={store}><AddRecipeButton recipeId={recipeId} /></Provider>)

      const button = screen.getByRole('button' as any)
      fireEvent.click(button)

      expect(store.dispatch).toHaveBeenCalledWith(
        menuBrowseCTAVisibilityChange(true)
      )
    })
  })

  describe('when can add recipes (postcode in store)', () => {
    let state: ReturnType<typeof createMockInitialState>

    beforeEach(() => {
      const postcode = 'W3 7UP'

      state = createMockInitialState({
        basket: {
          postcode,
        }
      })
    })

    describe('when recipe already in basket', () => {
      beforeEach(() => {
        state.basket = state.basket.setIn(
          ['recipes', recipeId],
          1
        )
      })

      test('click should dispatch basketRecipeRemove', () => {
        const store = createMockStore(state)

        render(<Provider store={store}><AddRecipeButton recipeId={recipeId} /></Provider>)

        const button = screen.getByRole('button' as any)
        fireEvent.click(button)

        expect(store.dispatch).toHaveBeenCalledWith(['call_basketRecipeRemove', recipeId])
      })
    })

    describe('when recipe NOT already in basket', () => {
      beforeEach(() => {
        state.basket = state.basket.setIn(
          ['recipes', recipeId],
          0
        )
      })

      test('click should dispatch basketRecipeAdd', () => {
        const store = createMockStore(state)

        render(<Provider store={store}><AddRecipeButton recipeId={recipeId} /></Provider>)

        const button = screen.getByRole('button' as any)
        fireEvent.click(button)

        expect(store.dispatch).toHaveBeenCalledWith(['call_basketRecipeAdd', recipeId])
      })
    })

    describe('when basket limit is reached', () => {
      beforeEach(() => {
        state.basket = state.basket.setIn(
          ['recipes', otherRecipeId],
          4
        )
      })

      test('click should dispatch nothing', () => {
        const store = createMockStore(state)

        render(<Provider store={store}><AddRecipeButton recipeId={recipeId} /></Provider>)

        const button = screen.getByRole('button' as any)
        fireEvent.click(button)

        expect(store.dispatch).not.toHaveBeenCalled()
      })
    })
  })
})
