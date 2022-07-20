import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { Recipe } from '@library/menu-service'

import { RecipeContextProvider, useRecipe } from '.'

describe('RecipeContext', () => {
  describe('useRecipe', () => {
    describe('when not in a RecipeContextProvider', () => {
      const wrapper: React.FC = ({ children }) => <>{children}</>

      test('throws an error', () => {
        const { result } = renderHook(() => useRecipe(), { wrapper })

        expect(result.error).toEqual(new Error('useRecipe could not find a recipe in RecipeContext'))
      })
    })

    describe('when in a RecipeContextProvider', () => {
      const recipe: Recipe = {
        id: 'recipe-id',
        title: "A Recipe Title"
      } as unknown as Recipe

      const wrapper: React.FC = ({ children }) => (
        <RecipeContextProvider value={recipe}>{children}</RecipeContextProvider>
      )

      test('returns recipe from context', () => {
        const { result } = renderHook(() => useRecipe(), { wrapper })

        expect(result.current).toEqual(recipe)
      })
    })
  })
})
