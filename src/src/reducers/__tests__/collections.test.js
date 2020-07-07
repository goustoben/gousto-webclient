import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import collectionsReducer from 'reducers/collections'

describe('collections reducer', () => {
  test('should handle initial state', () => {
    const initialState = Immutable.OrderedMap({})
    expect(
      Immutable.is(collectionsReducer.collections(undefined, {}), initialState),
    ).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const state = Immutable.fromJS({
      1: { id: 1, title: 'collection 1' },
      2: { id: 2, title: 'collection 2' },
    })
    const result = collectionsReducer.collections(state, { type: 'unknown' })

    expect(Immutable.is(result, state)).toEqual(true)
  })

  describe('COLLECTIONS_RECEIVE_COLLECTIONS', () => {
    test('should load collections into state and add recipes list', () => {
      const result = collectionsReducer.collections(Immutable.OrderedMap({}), {
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
      const result = collectionsReducer.collections(initialState, {
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

  describe('COOKBOOK_RECEIVE_COLLECTIONS', () => {
    test('should load collections into state and add recipes list', () => {
      const result = collectionsReducer.collections(Immutable.OrderedMap({}), {
        type: actionTypes.COOKBOOK_RECEIVE_COLLECTIONS,
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
      const result = collectionsReducer.collections(initialState, {
        type: actionTypes.COOKBOOK_RECEIVE_COLLECTIONS,
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

  describe('COOKBOOK_RECEIVE_COLLECTION_RECIPES', () => {
    const initialState = Immutable.OrderedMap({})
    test('should set recipe ids for collection', () => {
      const action = {
        type: actionTypes.COOKBOOK_RECEIVE_COLLECTION_RECIPES,
        recipes: [{
          id: 1
        }],
        collectionId: '1234'
      }

      const result = collectionsReducer.collections(initialState, action)
      expect(result).toEqual(Immutable.OrderedMap({
        1234: Immutable.fromJS({
          recipes: [1]
        })
      }))
    })
  })
})
