import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import actionTypes from 'actions/actionTypes'
import { selectCollection } from 'utils/collections'

describe('when selecting a collection', () => {
	let initalState = {
		features: Immutable.Map({}),
		menuCollections: Immutable.Map({}),
	}

	describe('and collection id exists for the given collection name', () => {
		const collectionName = 'test collection name'

		beforeEach(() => {
			initalState.menuCollections = Immutable.Map(
				Immutable.fromJS({
					testCollectionId: {
						id: 'testCollectionId',
						shortTitle: 'test collection name'
					}
				})
			)
		})

		test('then FILTERS_COLLECTION_CHANGE event is dispatched with collection id', () => {
			const mockStore = configureMockStore()
			const store = mockStore(initalState)

			selectCollection(store.getState(), collectionName, store.dispatch)

			expect(store.getActions()).toContainEqual({
				type: actionTypes.FILTERS_COLLECTION_CHANGE,
				collectionId: 'testCollectionId',
			})
		})
	})

	describe('and collection id does not exist for the give collection name', () => {
		const collectionName = 'test collection name'

		beforeEach(() => {
			initalState.menuCollections = Immutable.Map(
				Immutable.fromJS({
					differentId: {
						id: 'differentId',
						shortTitle: 'different name'
					}
				})
			)
		})

		test('then no event is dispatched', () => {
			const mockStore = configureMockStore()
			const store = mockStore(initalState)

			selectCollection(store.getState(), collectionName, store.dispatch)

			expect(store.getActions()).toEqual([])
		})
	})
})
