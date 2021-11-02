import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import { initialState as authInitialState } from 'reducers/auth'
import { initialState as basketInitialState } from 'reducers/basket'
import { useMenu } from './useMenu'

const createMockStore = (valueOverrides) => {
  const initialState = {
    routing: {
      locationBeforeTransitions: {
        query: {}
      }
    },
    auth: authInitialState(),
    basket: basketInitialState(),
    recipes: Immutable.Map(valueOverrides.recipes) || Immutable.Map(),
    menuRecipes: Immutable.List(valueOverrides.menuRecipes) || Immutable.List(),
    menuCollections: Immutable.OrderedMap(valueOverrides.menuCollections) || Immutable.OrderedMap()
  }

  const mockStore = configureMockStore()

  const store = mockStore(initialState)

  // eslint-disable-next-line no-undef
  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}

const createMockCollection = (id, shortTitle, recipes) => (
  Immutable.Map({
    id,
    published: true,
    shortTitle,
    recipesInCollection: Immutable.List(recipes.map(r => r.get('id')))
  })
)

describe('menu domain / useMenu', () => {
  const RECIPE_1 = Immutable.Map({ id: 'aaaa' })
  const RECIPE_2 = Immutable.Map({ id: 'bbbb' })
  const RECIPE_3 = Immutable.Map({ id: 'cccc' })
  const RECIPE_4 = Immutable.Map({ id: 'dddd' })

  const COLLECTION_A = createMockCollection('1234-5678', 'One Category', [ RECIPE_1, RECIPE_2 ])
  const COLLECTION_B = createMockCollection('0000-0000', 'Another Category', [ RECIPE_3, RECIPE_4 ])

  const store = createMockStore({
    recipes: {
      [RECIPE_1.get('id')]: RECIPE_1,
      [RECIPE_2.get('id')]: RECIPE_2,
      [RECIPE_3.get('id')]: RECIPE_3,
      [RECIPE_4.get('id')]: RECIPE_4,
    },
    menuRecipes: [
      RECIPE_3.get('id'),
      RECIPE_4.get('id'),
    ],
    menuCollections: {
      [COLLECTION_A.get('id')]: COLLECTION_A,
      [COLLECTION_B.get('id')]: COLLECTION_B
    },
  })

  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

  test('getRecipesForCollectionId returns correct recipes', () => {
    const { result } = renderHook(() => useMenu(), { wrapper })

    const recipes = result.current.getRecipesForCollectionId(COLLECTION_B.get('id'))

    expect(recipes).toEqual(Immutable.List([RECIPE_3, RECIPE_4]))
  })
})
