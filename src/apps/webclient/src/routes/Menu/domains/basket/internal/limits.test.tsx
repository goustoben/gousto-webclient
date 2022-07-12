import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider } from 'react-redux'

import { useRecipeLimitExceeded, useRecipeLimitReached, useRemoveRecipesOverLimit } from './limits'
import { createMockBasketStore } from './testing/createMockBasketStore'

const removeRecipeSpy = jest.fn()

jest.mock('./recipes/useRemoveRecipe', () => ({
  useRemoveRecipe: jest.fn().mockImplementation(() => removeRecipeSpy),
}))

jest.mock('./useSupportedBoxTypes', () => ({
  useSupportedBoxTypes: jest.fn().mockReturnValue({
    maxRecipesForPortion: () => 4,
  }),
}))

const recipeId = '1234-5678'
const recipeAmount = 5
const recipes = Immutable.Map({
  [recipeId]: recipeAmount,
})
const recipeStore = createMockBasketStore({ numPortions: 2 })

describe('basket domain recipe limits', () => {
  describe('useRecipeLimitReached', () => {
    const recipeWrapper: React.FC = ({ children }) => (
      <Provider store={recipeStore}>{children}</Provider>
    )

    test('should return true when recipe limit reached', () => {
      const {
        result: { current },
      } = renderHook(() => useRecipeLimitReached(recipes), { wrapper: recipeWrapper })

      expect(current).toBe(true)
    })
  })

  describe('useRecipeLimitExceeded', () => {
    const recipeWrapper: React.FC = ({ children }) => (
      <Provider store={recipeStore}>{children}</Provider>
    )

    test('should return true when recipe limit exceeded', () => {
      const {
        result: { current },
      } = renderHook(() => useRecipeLimitExceeded(recipes), { wrapper: recipeWrapper })

      expect(current).toBe(true)
    })
  })

  describe('when basket contains more recipes than the portion size allows', () => {
    const recipeWrapper: React.FC = ({ children }) => (
      <Provider store={recipeStore}>{children}</Provider>
    )

    test('should remove each recipe from the basket', () => {
      renderHook(() => useRemoveRecipesOverLimit(recipes), { wrapper: recipeWrapper })

      expect(removeRecipeSpy).toHaveBeenCalledTimes(recipeAmount)
    })
  })
})
