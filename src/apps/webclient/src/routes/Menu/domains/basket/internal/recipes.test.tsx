import * as React from 'react'
import Immutable from 'immutable'

import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { createMockBasketStore } from './testing/createMockBasketStore'
import { useBasketRecipes } from './recipes'

jest.mock('routes/Menu/actions/basketRecipes', () => ({
  basketRecipeAdd: jest
    .fn()
    .mockImplementation((recipeId, view) => ['call_basketRecipeAdd', recipeId, view]),
  basketRecipeRemove: jest
    .fn()
    .mockImplementation((recipeId, view, position) => [
      'call_basketRecipeRemove',
      recipeId,
      view,
      position,
    ]),
}))

describe('basket domain / recipes', () => {
  const store = createMockBasketStore({
    postcode: 'W3 7UP',
  })

  const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

  test('canAddRecipes is true when postcode in store', () => {
    const { result } = renderHook(() => useBasketRecipes(), { wrapper })

    expect(result.current.canAddRecipes).toEqual(true)
  })

  describe('when postcode not in store', () => {
    const noPostcodeStore = createMockBasketStore({
      postcode: '',
    })

    const noPostcodeWrapper: React.FC = ({ children }) => (
      <Provider store={noPostcodeStore}>{children}</Provider>
    )

    test('canAddRecipes is false', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: noPostcodeWrapper })

      expect(result.current.canAddRecipes).toEqual(false)
    })
  })

  test('addRecipe dispatches basketRecipeAdd', () => {
    const { result } = renderHook(() => useBasketRecipes(), { wrapper })

    const recipeId = 'aaaa-bbbb'
    const view = 'grid'

    result.current.addRecipe(recipeId, view)

    expect(store.dispatch).toHaveBeenCalledWith(['call_basketRecipeAdd', recipeId, view])
  })

  test('removeRecipe dispatches basketRecipeRemove', () => {
    const { result } = renderHook(() => useBasketRecipes(), { wrapper })

    const recipeId = 'aaaa-bbbb'
    const view = 'grid'
    const position = 10

    result.current.removeRecipe(recipeId, view, position)

    expect(store.dispatch).toHaveBeenCalledWith([
      'call_basketRecipeRemove',
      recipeId,
      view,
      position,
    ])
  })

  describe('when basket contains a recipe with quantity 1', () => {
    const recipeId = '1234-5678'

    const recipeStore = createMockBasketStore({
      recipes: Immutable.Map({
        [recipeId]: 1,
      }),
    })

    const recipeWrapper: React.FC = ({ children }) => (
      <Provider store={recipeStore}>{children}</Provider>
    )

    test('limitReached is false', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      expect(result.current.limitReached).toEqual(false)
    })

    test('isRecipeInBasket is true for the recipe Id', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      const isInBasket = result.current.isRecipeInBasket(recipeId)

      expect(isInBasket).toEqual(true)
    })

    test('isRecipeInBasket is false for a different id', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      const isInBasket = result.current.isRecipeInBasket('zzzz-fake-id')

      expect(isInBasket).toEqual(false)
    })
  })

  describe('when basket contains a recipe with quantity 4', () => {
    const recipeId = '1234-5678'

    const recipeStore = createMockBasketStore({
      recipes: Immutable.Map({
        [recipeId]: 4,
      }),
    })

    const recipeWrapper: React.FC = ({ children }) => (
      <Provider store={recipeStore}>{children}</Provider>
    )

    test('limitReached is true', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      expect(result.current.limitReached).toEqual(true)
    })

    test('isRecipeInBasket is true for the recipe Id', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      const isInBasket = result.current.isRecipeInBasket(recipeId)

      expect(isInBasket).toEqual(true)
    })
  })

  describe('when basket contains two recipes with quantity 2 each', () => {
    const recipeIdA = '1234-5678'
    const recipeIdB = '0000-0000'

    const recipeStore = createMockBasketStore({
      recipes: Immutable.Map({
        [recipeIdA]: 2,
        [recipeIdB]: 2,
      }),
    })

    const recipeWrapper: React.FC = ({ children }) => (
      <Provider store={recipeStore}>{children}</Provider>
    )

    test('limitReached is true', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      expect(result.current.limitReached).toEqual(true)
    })

    test('isRecipeInBasket is true for the first recipe', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      const isInBasket = result.current.isRecipeInBasket(recipeIdA)

      expect(isInBasket).toEqual(true)
    })

    test('isRecipeInBasket is true for the second recipe', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      const isInBasket = result.current.isRecipeInBasket(recipeIdB)

      expect(isInBasket).toEqual(true)
    })
  })
})
