import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { initialState as authInitialState } from 'reducers/auth'
import { initialState as basketInitialState } from 'reducers/basket'

import { useMenu } from './useMenu'

const createMockStore = (valueOverrides) => {
  const initialState = {
    routing: {
      locationBeforeTransitions: {
        query: {},
      },
    },
    auth: authInitialState(),
    basket: basketInitialState(),
    recipes: Immutable.Map(valueOverrides.recipes) || Immutable.Map(),
    menuRecipes: Immutable.List(valueOverrides.menuRecipes) || Immutable.List(),
    menuCollections: Immutable.OrderedMap(valueOverrides.menuCollections) || Immutable.OrderedMap(),
    menuRecipeStock: Immutable.Map(valueOverrides.menuRecipeStock) || Immutable.Map({}),
    menuRecipeDetails: Immutable.Map({}),
    menu:
      Immutable.Map(valueOverrides.menu) ||
      Immutable.fromJS({
        menuVariants: {},
      }),
  }

  const mockStore = configureMockStore()

  const store = mockStore(initialState)

  // eslint-disable-next-line no-undef
  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}

const createMockCollection = (id, shortTitle, recipes) =>
  Immutable.Map({
    id,
    published: true,
    shortTitle,
    recipesInCollection: Immutable.List(recipes.map((r) => r.get('id'))),
  })

describe('menu domain / useMenu', () => {
  const RECIPE_1 = Immutable.Map({ id: 'aaaa' })
  const RECIPE_2 = Immutable.Map({ id: 'bbbb' })
  const RECIPE_3 = Immutable.Map({ id: 'cccc' })
  const RECIPE_4 = Immutable.Map({ id: 'dddd' })

  const COLLECTION_A = createMockCollection('1234-5678', 'One Category', [RECIPE_1, RECIPE_2])
  const COLLECTION_B = createMockCollection('0000-0000', 'Another Category', [RECIPE_3, RECIPE_4])

  const store = createMockStore({
    recipes: {
      [RECIPE_1.get('id')]: RECIPE_1,
      [RECIPE_2.get('id')]: RECIPE_2,
      [RECIPE_3.get('id')]: RECIPE_3,
      [RECIPE_4.get('id')]: RECIPE_4,
    },
    menuRecipes: [RECIPE_1.get('id'), RECIPE_2.get('id'), RECIPE_3.get('id'), RECIPE_4.get('id')],
    menuCollections: {
      [COLLECTION_A.get('id')]: COLLECTION_A,
      [COLLECTION_B.get('id')]: COLLECTION_B,
    },
    menuRecipeStock: {
      [RECIPE_1.get('id')]: Immutable.fromJS({ 2: 0, 4: 0 }),
      [RECIPE_2.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
      [RECIPE_3.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
      [RECIPE_4.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
    },
    menu: Immutable.fromJS({
      menuVariants: Immutable.fromJS({}),
    }),
  })

  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

  test('getRecipesForCollectionId returns correct recipes', () => {
    const { result } = renderHook(() => useMenu(), { wrapper })

    const { recipes } = result.current.getRecipesForCollectionId(COLLECTION_B.get('id'))

    expect(recipes).toEqual(
      Immutable.List([
        {
          recipe: RECIPE_3,
          originalId: RECIPE_3.get('id'),
          reference: `recipe_family_reference_${RECIPE_3.get('id')}__1`,
        },
        {
          recipe: RECIPE_4,
          originalId: RECIPE_4.get('id'),
          reference: `recipe_family_reference_${RECIPE_4.get('id')}__1`,
        },
      ]),
    )
  })

  describe('when some Recipes are out of stock', () => {
    test('getRecipesForCollectionId returns them at the end of the list', () => {
      const { result } = renderHook(() => useMenu(), { wrapper })

      const { recipes } = result.current.getRecipesForCollectionId(COLLECTION_A.get('id'))

      expect(recipes).toEqual(
        Immutable.List([
          {
            recipe: RECIPE_2,
            originalId: RECIPE_2.get('id'),
            reference: `recipe_family_reference_${RECIPE_2.get('id')}__1`,
          },
          {
            recipe: RECIPE_1,
            originalId: RECIPE_1.get('id'),
            reference: `recipe_family_reference_${RECIPE_1.get('id')}__1`,
          },
        ]),
      )
    })
  })
})

describe('getRecipesForCollectionId', () => {
  const RECIPE_1 = Immutable.Map({ id: 'aaaa' })
  const RECIPE_2 = Immutable.Map({ id: 'bbbb' })
  const RECIPE_3 = Immutable.Map({ id: 'cccc' })
  const RECIPE_4 = Immutable.Map({ id: 'dddd' })

  const COLLECTION_A = createMockCollection('1234-5678', 'One Category', [
    RECIPE_3,
    RECIPE_2,
    RECIPE_4,
  ])

  const store = createMockStore({
    recipes: {
      [RECIPE_1.get('id')]: RECIPE_1,
      [RECIPE_2.get('id')]: RECIPE_2,
      [RECIPE_3.get('id')]: RECIPE_3,
      [RECIPE_4.get('id')]: RECIPE_4,
    },
    menuRecipes: [RECIPE_1.get('id'), RECIPE_2.get('id'), RECIPE_3.get('id'), RECIPE_4.get('id')],
    menuCollections: {
      [COLLECTION_A.get('id')]: COLLECTION_A,
    },
    menuRecipeStock: {
      [RECIPE_1.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
      [RECIPE_2.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
      [RECIPE_3.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
      [RECIPE_4.get('id')]: Immutable.fromJS({ 2: 100, 4: 100 }),
    },
    menu: Immutable.fromJS({
      menuVariants: Immutable.fromJS({}),
    }),
  })

  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

  describe('when recipes order within collection is different from order in list of all menu recipes', () => {
    test('ensure the returned value respects the order in the collection', () => {
      const { result } = renderHook(() => useMenu(), { wrapper })

      const { recipes } = result.current.getRecipesForCollectionId(COLLECTION_A.get('id'))

      expect(recipes).toEqual(
        Immutable.List([
          {
            recipe: RECIPE_3,
            originalId: RECIPE_3.get('id'),
            reference: `recipe_family_reference_${RECIPE_3.get('id')}__1`,
          },
          {
            recipe: RECIPE_2,
            originalId: RECIPE_2.get('id'),
            reference: `recipe_family_reference_${RECIPE_2.get('id')}__1`,
          },
          {
            recipe: RECIPE_4,
            originalId: RECIPE_4.get('id'),
            reference: `recipe_family_reference_${RECIPE_4.get('id')}__1`,
          },
        ]),
      )
    })
  })
})
