import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import actionTypes from 'actions/actionTypes'
import { selectCollection } from '../collectionsHelper'


describe('when selecting a collection', () => {
	let initalState = {
		features: Immutable.Map({}),
		menuCollections: Immutable.Map({}),
	}

	describe('and collectionId exists for the given collection name', () => {
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

		test('then collection from the query parameter is selected', () => {
			const mockStore = configureMockStore()
			const store = mockStore(initalState)

			selectCollection(store.getState(), collectionName, store.dispatch)

			expect(store.getActions()).toContainEqual({
				type: actionTypes.FILTERS_COLLECTION_CHANGE,
				collectionId: 'testCollectionId',
			})
		})
	})

	describe('and collectionId does not exist for the give collection name', () => {
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

		test('then collection from the query parameter is selected', () => {
			const mockStore = configureMockStore()
			const store = mockStore(initalState)

			selectCollection(store.getState(), collectionName, store.dispatch)

			expect(store.getActions()).toEqual([])
		})
	})
})
