import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { RecipeContextProvider, useRecipe, useRecipeField, useRecipeCookingTime, useRecipeBrandTag } from './recipeContext'

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
  const wrapper: React.FC = ({ children }) => <RecipeContextProvider value={recipe}>{children}</RecipeContextProvider>

  describe('useRecipe', () => {
    test('returns recipe from context', () => {
      const { result } = renderHook(() => useRecipe(), { wrapper })

      expect(result.current).toEqual(recipe)
    })
  })

  describe('useRecipeField', () => {
    const render = (field: string | string[], defaultValue?: any) => renderHook(() => useRecipeField(field, defaultValue), { wrapper })

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

  describe('useRecipeCookingTime', () => {
    const cookingTime = 30
    const cookingTimeFamily = 40

    const renderUseRecipeCookingTimeHook = ({ numPortions }: { numPortions: number | undefined }) => {
      const mockStore = configureMockStore()
      const store = mockStore({
        basket: Immutable.fromJS({
          numPortions,
          recipes: {},
        }),
      })

      const recipeWithPortions = Immutable.fromJS({
        id: '12345',
        title: 'A Recipe Title',
        media: {
          images
        },
        cookingTime,
        cookingTimeFamily,
      })
      const wrapperWithBasket: React.FC = ({ children }) => (
        <Provider store={store}>
          <RecipeContextProvider value={recipeWithPortions}>{children}</RecipeContextProvider>
        </Provider>
      )

      return renderHook(() => useRecipeCookingTime(), { wrapper: wrapperWithBasket })
    }

    describe('when numPortions (number of portions) in basket is 2', () => {
      const { result } = renderUseRecipeCookingTimeHook({ numPortions: 2 })

      test('returns cooking time', () => {
        expect(result.current).toEqual(cookingTime)
      })
    })

    describe('when numPortions (number of portions) in basket is 4', () => {
      const { result } = renderUseRecipeCookingTimeHook({ numPortions: 4 })

      test('returns cooking time for family', () => {
        expect(result.current).toEqual(cookingTimeFamily)
      })
    })

    describe('when numPortions (number of portions) in basket is undefined', () => {
      const { result } = renderUseRecipeCookingTimeHook({ numPortions: undefined })

      test('returns cooking time', () => {
        expect(result.current).toEqual(cookingTime)
      })
    })
  })

  describe('useRecipeBrandTag', () => {
    const TAG_1 = {
      slug: 'new-eme',
      text: 'New',
      type: 'general',
      themes: [{
        name: 'light',
        color: '#01A92B',
        borderColor: '#01A92B'
      }]
    }

    const TAG_2 = {
      slug: 'limited-edition-eme',
      text: 'Limited Edition',
      type: 'general',
      themes: [{
        name: 'light',
        color: '#01A92B',
        borderColor: '#01A92B'
      }]
    }

    const renderUseRecipeTaglineHook = ({ tagline }: { tagline: string }) => {
      const mockStore = configureMockStore()
      const store = mockStore({
        brand: {
          data: {
            tags: [ TAG_1, TAG_2 ]
          }
        },
      })

      const recipe = Immutable.fromJS({
        id: '12345',
        title: 'A Recipe Title',
        media: {
          images
        },
        tagline
      })
      const customWrapper: React.FC = ({ children }) => (
        <Provider store={store}>
          <RecipeContextProvider value={recipe}>{children}</RecipeContextProvider>
        </Provider>
      )

      return renderHook(() => useRecipeBrandTag(), { wrapper: customWrapper })
    }

    describe('when tagline matches a brand tag', () => {
      const { result } = renderUseRecipeTaglineHook({ tagline: TAG_1.slug })

      test('returns correct tag', () => {
        expect(result.current).toEqual({
          ...TAG_1,
          themes: undefined,
          theme: TAG_1.themes[0],
        })
      })
    })

    describe('when tagline does not match a brand tag', () => {
      const { result } = renderUseRecipeTaglineHook({ tagline: 'blablablabla' })

      test('returns correct tag', () => {
        expect(result.current).toEqual(null)
      })
    })
  })
})
