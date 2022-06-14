import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { useAlternativeOptions } from './useAlternativeOptions'

const RECIPE_ID_1 = 'aaa'
const RECIPE_ID_2 = 'bbb'
const COLLECTION_ID = 'collection 1'

function createMockState(args: any = {}) {
  const menuId = 'menu 1'

  const RECIPE_1 = Immutable.fromJS({
    id: RECIPE_ID_1,
    coreRecipeId: RECIPE_ID_1,
    title: 'Title ONE',
    dietaryClaims: Immutable.fromJS([
      {
        name: 'Gluten-free',
        slug: 'gluten-free',
      },
    ]),
    meals: Immutable.fromJS([
      {
        numPortions: 2,
        surcharge: {
          listPrice: '0.99',
        },
      },
      {
        numPortions: 4,
        surcharge: {
          listPrice: '1.99',
        },
      },
    ]),
  })

  const RECIPE_2 = Immutable.Map({
    id: RECIPE_ID_2,
    coreRecipeId: RECIPE_ID_2,
    title: 'Title TWO',
  })

  const COLLECTION_A = Immutable.Map({
    id: COLLECTION_ID,
    published: true,
    shortTitle: 'One Category',
    recipesInCollection: Immutable.List([RECIPE_1, RECIPE_2].map((r) => r.get('id'))),
    requirements: Immutable.fromJS({
      dietary_claims: args.dietaryClaims || [],
    }),
  })

  const state = {
    recipes: Immutable.fromJS({
      [RECIPE_ID_1]: RECIPE_1,
      [RECIPE_ID_2]: RECIPE_2,
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {},
      currentMenuId: menuId,
    }),
    menuRecipeStock:
      args.menuRecipeStock ||
      Immutable.fromJS({
        [RECIPE_ID_1]: { 2: 1000, 4: 1000 },
        [RECIPE_ID_2]: { 2: 1000, 4: 1000 },
      }),
    menuRecipes: Immutable.fromJS([RECIPE_1.get('id'), RECIPE_2.get('id')]),
    menuCollections: Immutable.fromJS({
      [COLLECTION_A.get('id')]: COLLECTION_A,
    }),
    menuRecipeDetails: Immutable.Map({
      recipeId: '1234',
    }),
    menu: Immutable.fromJS({
      recipeId: RECIPE_ID_1,
      originalId: RECIPE_ID_1,
      categoryId: COLLECTION_ID,
      menuVariants: Immutable.fromJS({
        [menuId]: {
          [RECIPE_ID_1]: {
            alternatives: [
              {
                id: 'UUID_1',
                coreRecipeId: RECIPE_ID_2,
                displayName: RECIPE_2.get('title'),
              },
            ],
          },
          [RECIPE_ID_2]: {
            alternatives: [
              {
                id: 'UUID_2',
                coreRecipeId: RECIPE_ID_1,
              },
            ],
          },
        },
      }),
    }),
  }

  return state
}

describe('getAlternativeOptionsForRecipe', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when there is alternative option and it is out of stock', () => {
    const mockStore = configureMockStore()
    const store = mockStore(
      createMockState({
        menuRecipeStock: Immutable.fromJS({
          [RECIPE_ID_1]: { 2: 1000, 4: 1000 },
        }),
      }),
    )

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('they are marked so', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        isOnDetailScreen: false,
        categoryId: COLLECTION_ID,
      })

      const recipe1 = options.find((o) => o.recipeId === RECIPE_ID_1)
      const recipe2 = options.find((o) => o.recipeId === RECIPE_ID_2)

      expect(recipe1).toBeTruthy()
      expect(recipe2).toBeTruthy()
      expect(recipe1!.isOutOfStock).toEqual(false)
      expect(recipe2!.isOutOfStock).toEqual(true)
    })
  })

  describe('when there is alternative option and it is in stock', () => {
    const mockStore = configureMockStore()
    const store = mockStore(
      createMockState({
        menuRecipeStock: Immutable.fromJS({
          [RECIPE_ID_1]: { 2: 1000, 4: 1000 },
          [RECIPE_ID_2]: { 2: 1000, 4: 1000 },
        }),
      }),
    )

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('they are marked so', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        isOnDetailScreen: false,
        categoryId: COLLECTION_ID,
      })

      const recipe1 = options.find((o) => o.recipeId === RECIPE_ID_1)
      const recipe2 = options.find((o) => o.recipeId === RECIPE_ID_2)

      expect(recipe1).toBeTruthy()
      expect(recipe2).toBeTruthy()
      expect(recipe1!.isOutOfStock).toEqual(false)
      expect(recipe2!.isOutOfStock).toEqual(false)
    })
  })

  describe('when recipe has a surcharge', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('it is exposed in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        isOnDetailScreen: false,
        categoryId: COLLECTION_ID,
      })

      const recipe1 = options.find((o) => o.recipeId === RECIPE_ID_1)
      const recipe2 = options.find((o) => o.recipeId === RECIPE_ID_2)

      expect(recipe1).toBeTruthy()
      expect(recipe2).toBeTruthy()
      expect(recipe1!.surcharge).toEqual(0.5)
      expect(recipe2!.surcharge).toEqual(null)
    })
  })

  describe('when isOnDetailScreen flag is passed', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('then it is exposed in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        isOnDetailScreen: true,
        categoryId: COLLECTION_ID,
      })

      const recipe1 = options.find((o) => o.recipeId === RECIPE_ID_1)
      const recipe2 = options.find((o) => o.recipeId === RECIPE_ID_2)

      expect(recipe1).toBeTruthy()
      expect(recipe2).toBeTruthy()
      expect(recipe1!.isOnDetailScreen).toEqual(true)
      expect(recipe2!.isOnDetailScreen).toEqual(true)
    })
  })

  describe('when First recipe is marked as selected', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('it is marked as so in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        isOnDetailScreen: false,
        categoryId: COLLECTION_ID,
      })

      const recipe1 = options.find((o) => o.recipeId === RECIPE_ID_1)
      const recipe2 = options.find((o) => o.recipeId === RECIPE_ID_2)

      expect(recipe1).toBeTruthy()
      expect(recipe2).toBeTruthy()
      expect(recipe1!.isChecked).toEqual(true)
      expect(recipe2!.isChecked).toEqual(false)
    })
  })

  describe('when Second recipe is marked as selected', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('it is marked as so in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_2,
        isOnDetailScreen: false,
        categoryId: COLLECTION_ID,
      })
      const recipe1 = options.find((o) => o.recipeId === RECIPE_ID_1)
      const recipe2 = options.find((o) => o.recipeId === RECIPE_ID_2)

      expect(recipe1).toBeTruthy()
      expect(recipe2).toBeTruthy()
      expect(recipe1!.isChecked).toEqual(false)
      expect(recipe2!.isChecked).toEqual(true)
    })
  })

  describe('Recipe basic properties are propagated', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('They are exposed in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        isOnDetailScreen: false,
        categoryId: COLLECTION_ID,
      })

      const recipe1 = options.find((o) => o.recipeId === RECIPE_ID_1)
      const recipe2 = options.find((o) => o.recipeId === RECIPE_ID_2)

      expect(recipe1).toBeTruthy()
      expect(recipe2).toBeTruthy()
      expect(recipe1!.recipeId).toEqual(RECIPE_ID_1)
      expect(recipe2!.recipeId).toEqual(RECIPE_ID_2)
      expect(recipe1!.recipeName).toEqual('Title ONE')
      expect(recipe2!.recipeName).toEqual('Title TWO')
    })
  })

  describe('when there are dietary claims for current collection', () => {
    const mockStore = configureMockStore()
    const state = createMockState({
      dietaryClaims: ['gluten-free'],
    })
    const store = mockStore(state)

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(
      () =>
        useAlternativeOptions({
          allCollections: state.menuCollections,
        }),
      { wrapper },
    )

    test('The option does not contain affected items', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        isOnDetailScreen: false,
        categoryId: COLLECTION_ID,
      })

      expect(options.length).toEqual(1)
      expect(!!options.find((o) => o.recipeId === RECIPE_ID_1)).toEqual(true)
      expect(!!options.find((o) => o.recipeId === RECIPE_ID_2)).toEqual(false)
    })
  })
})
