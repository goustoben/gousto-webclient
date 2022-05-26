import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider } from 'react-redux'

import { createMockBasketStore } from '../testing/createMockBasketStore'
import { useBasketRecipes, useIsRecipeInBasket } from './index'

jest.mock('routes/Menu/domains/basket/internal/recipes/useAddRecipe', () => ({
  useAddRecipe: jest
    .fn()
    .mockImplementation((recipeId, view) => ['call_addRecipe', recipeId, view]),
}))

jest.mock('routes/Menu/domains/basket/internal/recipes/useRemoveRecipe', () => ({
  useRemoveRecipe: jest
    .fn()
    .mockImplementation((recipeId, view, position) => [
      'call_removeRecipe',
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

      expect(result.current.reachedLimit).toEqual(false)
    })

    test('isRecipeInBasket is true for the recipe Id', () => {
      const { result } = renderHook(() => useIsRecipeInBasket(), { wrapper: recipeWrapper })

      const isInBasket = result.current(recipeId)

      expect(isInBasket).toEqual(true)
    })

    test('recipeCount is 1', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      expect(result.current.recipeCount).toEqual(1)
    })

    test('isRecipeInBasket is false for a different id', () => {
      const { result } = renderHook(() => useIsRecipeInBasket(), { wrapper: recipeWrapper })

      const isInBasket = result.current('zzzz-fake-id')

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

      expect(result.current.reachedLimit).toEqual(true)
    })

    test('recipeCount is 4', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      expect(result.current.recipeCount).toEqual(4)
    })

    test('isRecipeInBasket is true for the recipe Id', () => {
      const { result } = renderHook(() => useIsRecipeInBasket(), { wrapper: recipeWrapper })

      const isInBasket = result.current(recipeId)

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

      expect(result.current.reachedLimit).toEqual(true)
    })

    test('recipeCount is 4', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: recipeWrapper })

      expect(result.current.recipeCount).toEqual(4)
    })

    test('isRecipeInBasket is true for the first recipe', () => {
      const { result } = renderHook(() => useIsRecipeInBasket(), { wrapper: recipeWrapper })

      const isInBasket = result.current(recipeIdA)

      expect(isInBasket).toEqual(true)
    })

    test('isRecipeInBasket is true for the second recipe', () => {
      const { result } = renderHook(() => useIsRecipeInBasket(), { wrapper: recipeWrapper })

      const isInBasket = result.current(recipeIdB)

      expect(isInBasket).toEqual(true)
    })
  })
})
