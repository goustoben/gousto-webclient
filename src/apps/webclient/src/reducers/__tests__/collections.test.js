import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import { collectionsReducers } from 'reducers/collections'

describe('collections reducer', () => {
  test('should handle initial state', () => {
    const initialState = Immutable.OrderedMap({})
    expect(
      Immutable.is(collectionsReducers.collections(undefined, {}), initialState),
    ).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const state = Immutable.fromJS({
      1: { id: 1, title: 'collection 1' },
      2: { id: 2, title: 'collection 2' },
    })
    const result = collectionsReducers.collections(state, { type: 'unknown' })

    expect(Immutable.is(result, state)).toEqual(true)
  })

  describe('COLLECTIONS_RECEIVE_COLLECTIONS', () => {
    test('should load collections into state and add recipes list', () => {
      const result = collectionsReducers.collections(Immutable.OrderedMap({}), {
        type: actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS,
        collections: [
          { id: 'collection-1', title: 'collection 1' },
          { id: 'collection-2', title: 'collection 2' },
        ],
      })

      const expectedState = Immutable.OrderedMap({
        'collection-1': Immutable.fromJS({
          id: 'collection-1',
          title: 'collection 1',
          recipes: [],
        }),
        'collection-2': Immutable.fromJS({
          id: 'collection-2',
          title: 'collection 2',
          recipes: [],
        }),
      })

      expect(Immutable.is(result, expectedState)).toEqual(true)
    })

    test('should merge collections into state with existing collections without removing data', () => {
      const initialState = Immutable.OrderedMap({
        'collection-1': Immutable.fromJS({
          id: 'collection-1',
          title: 'collection 1',
          recipes: [1],
        }),
        'collection-2': Immutable.fromJS({
          id: 'collection-2',
          title: 'collection 2',
          recipes: [1, 2],
        }),
      })
      const result = collectionsReducers.collections(initialState, {
        type: actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS,
        collections: [
          { id: 'collection-1', title: 'collection 1 updated title' },
          { id: 'collection-3', title: 'collection 3' },
        ],
      })

      const expectedState = Immutable.OrderedMap({
        'collection-1': Immutable.fromJS({
          id: 'collection-1',
          title: 'collection 1 updated title',
          recipes: [1],
        }),
        'collection-2': Immutable.fromJS({
          id: 'collection-2',
          title: 'collection 2',
          recipes: [1, 2],
        }),
        'collection-3': Immutable.fromJS({
          id: 'collection-3',
          title: 'collection 3',
          recipes: [],
        }),
      })

      expect(Immutable.is(result, expectedState)).toEqual(true)
    })
  })
})
