import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import actionTypes from 'actions/actionTypes'
import { preselectCollection } from '../collectionsHelper'


describe('when pre-selecting a collection', () => {
	let initalState = {
		features: Immutable.Map({}),
	}

	describe('when collections feature is enabled  ', () => {
		initalState.features = Immutable.Map(
			...initalState.features,
			{ collections: Immutable.Map({ value: true }) },
		)

		test('then collection from the query parameter is pre-selected', () => {
			const mockStore = configureMockStore()
			const store = mockStore(initalState)

			const collectionName = 'Test Collection Name'
			const mockGetCollectionIdByName = () => 'testCollectionId'

			preselectCollection(store.getState(), collectionName, mockGetCollectionIdByName, store.dispatch)

			expect(store.getActions()).toContainEqual({
				type: actionTypes.FILTERS_COLLECTION_CHANGE,
				collectionId: 'testCollectionId',
			})
		})
	})


	// describe('when just for you feature is turned on  ', () => {
	// 	initalState.features = [
	// 		...initalState.features,
	// 		{ justforyou: Immutable.Map({ value: true }) }
	// 	]
	// })


})
