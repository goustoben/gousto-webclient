import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
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

	describe('COLLECTIONS_RECIEVE_COLLECTIONS', () => {
		test('should load collections into state and add recipes list', () => {
			const result = collectionsReducer.collections(Immutable.OrderedMap({}), {
				type: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
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
				type: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
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

	describe('COOKBOOK_RECIEVE_COLLECTIONS', () => {
		test('should load collections into state and add recipes list', () => {
			const result = collectionsReducer.collections(Immutable.OrderedMap({}), {
				type: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
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
				type: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
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

	describe('COLLECTIONS_RECIEVE_COLLECTION_RECIPES', () => {
		test('should load recipes ids into given collection', () => {
			const initialState = Immutable.OrderedMap({
				'collection-1': Immutable.fromJS({
					id: 'collection-1',
					title: 'collection 1',
					recipes: [4, 5, 6],
				}),
				'collection-2': Immutable.fromJS({
					id: 'collection-2',
					title: 'collection 2',
					recipes: [1, 2],
				}),
			})
			const action = {
				type: actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES,
				collectionId: 'collection-1',
				recipes: [
					{ id: 1, title: 'recipe 1' },
					{ id: 2, title: 'recipe 2' },
					{ id: 3, title: 'recipe 3' },
				],
			}
			const result = collectionsReducer.collections(initialState, action)
			const expectedState = Immutable.OrderedMap({
				'collection-1': Immutable.fromJS({
					id: 'collection-1',
					title: 'collection 1',
					recipes: [1, 2, 3],
				}),
				'collection-2': Immutable.fromJS({
					id: 'collection-2',
					title: 'collection 2',
					recipes: [1, 2],
				}),
			})

			expect(Immutable.is(result, expectedState)).toEqual(true)
		})

		test("should load collection with recipes if collection doesn't exist yet", () => {
			const action = {
				type: actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES,
				collectionId: 'collection-1',
				recipes: [
					{ id: 1, title: 'recipe 1' },
					{ id: 2, title: 'recipe 2' },
					{ id: 3, title: 'recipe 3' },
				],
			}
			const result = collectionsReducer.collections(
				Immutable.OrderedMap({}),
				action,
			)
			const expectedState = Immutable.OrderedMap({
				'collection-1': Immutable.fromJS({ recipes: [1, 2, 3] }),
			})

			expect(Immutable.is(result, expectedState)).toEqual(true)
		})
	})
})
