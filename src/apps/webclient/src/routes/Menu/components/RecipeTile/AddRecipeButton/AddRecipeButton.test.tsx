import React from 'react'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import { render, fireEvent, screen } from '@testing-library/react'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { createMockInitialState, createMockStore } from '../../../_testing/createMockStore'
import { AddRecipeButton } from './AddRecipeButton'

jest.mock('routes/Menu/domains/basket/internal/recipes/useAddRecipe', () => ({
  useAddRecipe: jest
    .fn()
    .mockImplementation(() => (recipeId: string, view: string) => [
      'call_addRecipe',
      recipeId,
      view,
    ]),
}))

jest.mock('routes/Menu/domains/basket/internal/recipes/useRemoveRecipe', () => ({
  useRemoveRecipe: jest
    .fn()
    .mockImplementation(() => (recipeId: string, view: string, position: number) => [
      'call_removeRecipe',
      recipeId,
      view,
      position,
    ]),
}))

jest.mock('selectors/user', () => ({
  getUserNewOrdersForMultiSkip: () => [
    {
      id: '123',
      isProjected: true,
      canSkip: true,
      deliveryDay: '2020-09-23 00:00:00',
      deliveryDate: '23 September 2020',
      deliveryDayId: '456',
    },
  ],
  getUserId: () => 'user-id',
  getNextDeliveryDate: () => null,
  getIsMultiSkipSuccess: () => false,
  getIsMultiSkipError: () => false,
  getSkippedBoxesCount: () => null,
  getUserSubscriptionState: () => false,
  getUserOpenOrders: () => null,
  getUserOrders: () => null,
}))

jest.mock('selectors/auth', () => ({
  getAccessToken: () => '',
  getIsAuthenticated: () => false,
  getAuthUserId: () => '',
}))

describe('AddRecipeButton', () => {
  const recipeId = '1234'
  const otherRecipeId = '5678'

  describe('when can NOT add recipes (no postcode in store)', () => {
    const state = createMockInitialState({
      basket: {
        postcode: '',
        recipes: Immutable.Map(),
      },
    })

    test('click should dispatch menuBrowseCTAVisibilityChange', () => {
      const store = createMockStore(state)

      render(
        <Provider store={store}>
          <AddRecipeButton recipeId={recipeId} />
        </Provider>
      )

      const button = screen.getByRole('button' as any)
      fireEvent.click(button)

      expect(store.dispatch).toHaveBeenCalledWith(menuBrowseCTAVisibilityChange(true))
    })
  })

  describe('when can add recipes (postcode in store)', () => {
    let state: ReturnType<typeof createMockInitialState>

    beforeEach(() => {
      state = createMockInitialState({
        basket: {
          postcode: 'W3 7UP',
          orderId: '123',
          recipes: Immutable.Map(),
        },
      })
    })

    describe('when basket limit is reached', () => {
      beforeEach(() => {
        state.basket = state.basket.setIn(['recipes', otherRecipeId], 4)
      })

      test('click should dispatch nothing', () => {
        const store = createMockStore(state)

        render(
          <Provider store={store}>
            <AddRecipeButton recipeId={recipeId} />
          </Provider>
        )

        const button = screen.getByRole('button' as any)
        fireEvent.click(button)

        expect(store.dispatch).not.toHaveBeenCalled()
      })
    })
  })
})
