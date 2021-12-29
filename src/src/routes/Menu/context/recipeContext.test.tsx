import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { RecipeContextProvider, useRecipe, useRecipeField, useRecipeCookingTime, useRecipeBrandTag, useRecipeBrandTagline, useRecipeBrandAvailabilityTagline, useRecipeBrandAvailabilityTag } from './recipeContext'

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

  describe('useRecipeBrandTagline', () => {
    describe('when recipe is not found in context', () => {
      const localWrapper: React.FC = ({ children }) => <>{children}</>

      it('should return null', () => {
        const { result } = renderHook(() => useRecipeBrandTagline(), { wrapper: localWrapper })
        expect(result.current).toEqual(null)
      })
    })

    describe('when recipe is found and has a tagline', () => {
      const localRecipe = Immutable.fromJS({
        id: '12345',
        title: 'A Recipe Title',
        tagline: 'test-tagline',
        media: {
          images
        }
      })
      const localWrapper: React.FC = ({ children }) => <RecipeContextProvider value={localRecipe}>{children}</RecipeContextProvider>

      it('it should return the tagline', () => {
        const { result } = renderHook(() => useRecipeBrandTagline(), { wrapper: localWrapper })
        expect(result.current).toEqual('test-tagline')
      })
    })
  })

  describe('useRecipeBrandAvailabilityTagline', () => {
    describe('when recipe is not found in the context', () => {
      const localWrapper: React.FC = ({ children }) => <>{children}</>

      it('should return null', () => {
        const { result } = renderHook(() => useRecipeBrandAvailabilityTagline(), { wrapper: localWrapper })
        expect(result.current).toEqual(null)
      })
    })

    describe('when recipe is found and has an availability tag', () => {
      const localRecipe = Immutable.fromJS({
        id: '12345',
        title: 'A Recipe Title',
        availability: 'test-availability',
      })
      const localWrapper: React.FC = ({ children }) => <RecipeContextProvider value={localRecipe}>{children}</RecipeContextProvider>

      it('it should return the tagline', () => {
        const { result } = renderHook(() => useRecipeBrandAvailabilityTagline(), { wrapper: localWrapper })
        expect(result.current).toEqual('test-availability')
      })
    })

    describe('when recipe is found and is new', () => {
      const localRecipe = Immutable.fromJS({
        id: '12345',
        title: 'A Recipe Title',
        availability: undefined,
        isNew: true
      })
      const localWrapper: React.FC = ({ children }) => <RecipeContextProvider value={localRecipe}>{children}</RecipeContextProvider>

      it('it should return new-eme', () => {
        const { result } = renderHook(() => useRecipeBrandAvailabilityTagline(), { wrapper: localWrapper })
        expect(result.current).toEqual('new-eme')
      })
    })

    describe('when recipe is found, is new and has availiblity tag', () => {
      const localRecipe = Immutable.fromJS({
        id: '12345',
        title: 'A Recipe Title',
        availability: 'hello-there',
        isNew: true,
      })
      const localWrapper: React.FC = ({ children }) => <RecipeContextProvider value={localRecipe}>{children}</RecipeContextProvider>

      it('it should return availibility tag', () => {
        const { result } = renderHook(() => useRecipeBrandAvailabilityTagline(), { wrapper: localWrapper })
        expect(result.current).toEqual('hello-there')
      })
    })
  })

  describe('useRecipeBrandAvailabilityTag', () => {
    const brand = {
      data: {
        tags: [
          {
            slug: 'new-eme',
            text: 'New',
            type: 'general',
            themes: [{
              name: 'light',
              color: '#01A92B',
              borderColor: '#01A92B'
            }]
          },
          {
            slug: 'limited-edition-eme',
            text: 'Limited Edition',
            type: 'general',
            themes: [{
              name: 'light',
              color: '#01A92B',
              borderColor: '#01A92B'
            }]
          },
          {
            slug: 'joe-wicks-eme',
            text: 'Joe Wicks',
            type: 'general',
            themes: [{
              name: 'light',
              color: '#01A92B',
              borderColor: '#01A92B'
            }]
          },
          {
            slug: 'health-kitchen-eme',
            text: 'Health Kitchen',
            type: 'general',
            themes: [{
              name: 'light',
              color: '#01A92B',
              borderColor: '#01A92B'
            }]
          },
          {
            slug: 'fine-dine-in-eme',
            text: 'Fine Dine In',
            type: 'general',
            themes: [{
              name: 'light',
              color: '#01A92B',
              borderColor: '#01A92B'
            }]
          },
          {
            slug: 'available-weekly-eme',
            text: 'Everyday Favourites',
            type: 'general',
            themes: [{
              name: 'light',
              color: '#01A92B',
              borderColor: '#01A92B'
            }]
          },
          {
            slug: 'mexico-limited-edition-eme',
            text: 'Dough It Yourself Pizza',
            type: 'general',
            themes: [{
              name: 'light',
              color: '#01A92B',
              borderColor: '#01A92B'
            }]
          },
        ]
      }
    }
    const newTag = {
      type: 'general',
      slug: 'new-eme',
      text: 'New',
      themes: undefined,
      theme: { name: 'light', color: '#01A92B', borderColor: '#01A92B' },
    }
    const limitedEditionTag = {
      slug: 'limited-edition-eme',
      text: 'Limited Edition',
      theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
      themes: undefined,
      type: 'general',
    }

    describe('when tags are not defined', () => {
      const mockStore = configureMockStore()
      const store = mockStore({})

      const localRecipe = Immutable.fromJS({
        id: '12345',
        title: 'A Recipe Title',
      })

      const localWrapper: React.FC = ({ children }) => (
        <Provider store={store}>
          <RecipeContextProvider value={localRecipe}>{children}</RecipeContextProvider>
        </Provider>
      )

      it('should return null', () => {
        const { result } = renderHook(() => useRecipeBrandAvailabilityTag(), { wrapper: localWrapper })
        expect(result.current).toEqual(null)
      })
    })

    describe('when recipe is not new and without promotion', () => {
      const mockStore = configureMockStore()
      const store = mockStore({ brand })

      const localWrapper: React.FC = ({ children }) => (
        <Provider store={store}>
          <>{children}</>
        </Provider>
      )

      it('should return null', () => {
        const { result } = renderHook(() => useRecipeBrandAvailabilityTag(), { wrapper: localWrapper })
        expect(result.current).toEqual(null)
      })
    })

    describe('when recipe has limited-edition-eme promotion', () => {
      const mockStore = configureMockStore()
      const store = mockStore({ brand })

      const localRecipe = Immutable.fromJS({
        id: '12345',
        title: 'A Recipe Title',
        availability: 'limited-edition-eme',
      })

      const localWrapper: React.FC = ({ children }) => (
        <Provider store={store}>
          <RecipeContextProvider value={localRecipe}>{children}</RecipeContextProvider>
        </Provider>
      )

      it('should return limited edition recipe tag', () => {
        const { result } = renderHook(() => useRecipeBrandAvailabilityTag(), { wrapper: localWrapper })
        expect(result.current).toEqual(limitedEditionTag)
      })
    })

    describe('when recipe has new-eme promotion', () => {
      const mockStore = configureMockStore()
      const store = mockStore({ brand })

      const localRecipe = Immutable.fromJS({
        id: '12345',
        title: 'A Recipe Title',
        availability: 'new-eme',
      })

      const localWrapper: React.FC = ({ children }) => (
        <Provider store={store}>
          <RecipeContextProvider value={localRecipe}>{children}</RecipeContextProvider>
        </Provider>
      )

      it('should return new-eme recipe tag', () => {
        const { result } = renderHook(() => useRecipeBrandAvailabilityTag(), { wrapper: localWrapper })
        expect(result.current).toEqual(newTag)
      })
    })
  })
})
