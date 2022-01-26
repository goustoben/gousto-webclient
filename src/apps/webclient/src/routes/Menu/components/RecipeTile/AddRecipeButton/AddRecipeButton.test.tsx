import React from 'react'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import { render, fireEvent, screen } from '@testing-library/react'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import * as UseShouldShowPaintedDoorButton from 'components/FiveRecipesPaintedDoorTest/useShouldShowPaintedDoorButton'
import { createMockInitialState, createMockStore } from '../../../_testing/createMockStore'
import { AddRecipeButton } from './AddRecipeButton'
import { JestSpyInstance } from '../../../../../types/jest'

jest.mock('../../../actions/basketRecipes', () => ({
  ...jest.requireActual('../../../actions/basketRecipes'),
  basketRecipeRemove: jest
    .fn()
    .mockImplementation((recipeId) => ['call_basketRecipeRemove', recipeId]),
  basketRecipeAdd: jest.fn().mockImplementation((recipeId) => ['call_basketRecipeAdd', recipeId]),
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

const useShouldShowPaintedDoorButton = jest.spyOn(
  UseShouldShowPaintedDoorButton,
  'useShouldShowPaintedDoorButton'
)

beforeEach(() => {
  useShouldShowPaintedDoorButton.mockReturnValue(false)
})

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
      const postcode = 'W3 7UP'
      
      state = createMockInitialState({
        basket: {
          postcode,
          orderId: '123',
          recipes: Immutable.Map(),
        },
      })
    })

    describe('when recipe already in basket', () => {
      beforeEach(() => {
        state.basket = state.basket.setIn(['recipes', recipeId], 1)
      })

      test('click should dispatch basketRecipeRemove', () => {
        const store = createMockStore(state)
        
        render(
          <Provider store={store}>
            <AddRecipeButton recipeId={recipeId} />
          </Provider>
        )

        const button = screen.getByRole('button' as any)
        fireEvent.click(button)

        expect(store.dispatch).toHaveBeenCalledWith(['call_basketRecipeRemove', recipeId])
      })
    })

    describe('when recipe NOT already in basket', () => {
      beforeEach(() => {
        state.basket = state.basket.setIn(['recipes', recipeId], 0)
      })

      test('click should dispatch basketRecipeAdd', () => {
        const store = createMockStore(state)

        render(
          <Provider store={store}>
            <AddRecipeButton recipeId={recipeId} />
          </Provider>
        )

        const button = screen.getByRole('button' as any)
        fireEvent.click(button)

        expect(store.dispatch).toHaveBeenCalledWith(['call_basketRecipeAdd', recipeId])
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

    describe('when useShouldShowPaintedDoorButton experiment is true', () => {
      beforeEach(() => {
        useShouldShowPaintedDoorButton.mockReturnValue(true)
      })
      test('should show experiment button', () => {
        const store = createMockStore(state)
        render(
          <Provider store={store}>
            <AddRecipeButton recipeId="not in basket" />
          </Provider>
        )
        const button = screen.getByRole('button' as any)
        expect(button).not.toHaveAttribute('data-testing')
      })
    })
    describe('when useShouldShowPaintedDoorButton experiment is false', () => {
      beforeEach(() => {
        useShouldShowPaintedDoorButton.mockReturnValue(false)
      })
      test('should show regular button', () => {
        const store = createMockStore(state)
        render(
          <Provider store={store}>
            <AddRecipeButton recipeId="not in basket" />
          </Provider>
        )
        const button = screen.getByRole('button' as any)
        expect(button).toHaveAttribute('data-testing')
      })
    })
  })
})
