import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { createMockBasketStore } from './testing/createMockBasketStore'
import { useBasketRecipes } from './recipes'

jest.mock('routes/Menu/actions/basketRecipes', () => ({
  basketRecipeAdd: jest.fn().mockImplementation(
    (recipeId, view) => ['call_basketRecipeAdd', recipeId, view]
  ),
  basketRecipeRemove: jest.fn().mockImplementation(
    (recipeId, view, position) => ['call_basketRecipeRemove', recipeId, view, position]
  )
}))

describe('basket domain / recipes', () => {
  const store = createMockBasketStore({
    postcode: 'W3 7UP'
  })

  const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

  test('canAddRecipes is true when postcode in store', () => {
    const { result } = renderHook(() => useBasketRecipes(), { wrapper })

    expect(result.current.canAddRecipes).toEqual(true)
  })

  describe('when postcode not in store', () => {
    const noPostcodeStore = createMockBasketStore({
      postcode: ''
    })

    const noPostcodeWrapper: React.FC = ({ children }) => <Provider store={noPostcodeStore}>{children}</Provider>

    test('canAddRecipes is false', () => {
      const { result } = renderHook(() => useBasketRecipes(), { wrapper: noPostcodeWrapper })

      expect(result.current.canAddRecipes).toEqual(false)
    })
  })

  test('recipes is an empty array contains delivery date from store', () => {
    const { result } = renderHook(() => useBasketRecipes(), { wrapper })

    expect(result.current.recipes).toEqual([])
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

    expect(store.dispatch).toHaveBeenCalledWith(['call_basketRecipeRemove', recipeId, view, position])
  })
})
