import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { RecipeContextProvider, useRecipe, useRecipeField } from './recipeContext'

describe('recipeContext', () => {
  const recipe = Immutable.fromJS({
    id: '12345',
    title: 'A Recipe Title'
  })
  const wrapper = ({ children }) => <RecipeContextProvider value={recipe}>{children}</RecipeContextProvider>

  describe('useRecipe', () => {
    test('returns recipe from context', () => {
      const { result } = renderHook(() => useRecipe(), { wrapper })

      expect(result.current).toEqual(recipe)
    })
  })

  describe('useRecipeField', () => {
    const render = (field) => renderHook(() => useRecipeField(field), { wrapper })

    it('returns recipe id correctly', () => {
      const { result } = render('id')

      expect(result.current).toEqual('12345')
    })

    it('returns recipe title correctly', () => {
      const { result } = render('title')

      expect(result.current).toEqual('A Recipe Title')
    })
  })
})
