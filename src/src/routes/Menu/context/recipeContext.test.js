import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { RecipeContextProvider, useRecipe, useRecipeField } from './recipeContext'

describe('recipeContext', () => {
  const images = Immutable.fromJS([
    { type: 'homepage-image', urls: ['a.png'] },
    { type: 'mood-image', urls: ['b.png'] }
  ])

  const recipe = Immutable.fromJS({
    id: '12345',
    title: 'A Recipe Title',
    media: {
      images
    }
  })
  const wrapper = ({ children }) => <RecipeContextProvider value={recipe}>{children}</RecipeContextProvider>

  describe('useRecipe', () => {
    test('returns recipe from context', () => {
      const { result } = renderHook(() => useRecipe(), { wrapper })

      expect(result.current).toEqual(recipe)
    })
  })

  describe('useRecipeField', () => {
    const render = (field, defaultValue) => renderHook(() => useRecipeField(field, defaultValue), { wrapper })

    test('returns recipe id correctly', () => {
      const { result } = render('id')

      expect(result.current).toEqual('12345')
    })

    test('returns recipe title correctly', () => {
      const { result } = render('title')

      expect(result.current).toEqual('A Recipe Title')
    })

    test('returns recipe title correctly', () => {
      const { result } = render('title')

      expect(result.current).toEqual('A Recipe Title')
    })

    test('returns recipe images correctly', () => {
      const { result } = render(['media', 'images'])

      expect(result.current).toEqual(images)
    })

    describe('when requesting non-existent field', () => {
      const defaultValue = 3

      test('returns default', () => {
        const { result } = render('this-field-doesnt-exist', defaultValue)

        expect(result.current).toEqual(defaultValue)
      })
    })

    describe('when requesting non-existent nested field', () => {
      const defaultValue = 5

      test('returns default', () => {
        const { result } = render(['media', 'another-field-that-isnt-there'], defaultValue)

        expect(result.current).toEqual(defaultValue)
      })
    })
  })
})
