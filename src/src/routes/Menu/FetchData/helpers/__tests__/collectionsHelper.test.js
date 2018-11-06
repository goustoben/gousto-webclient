import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import actionTypes from 'actions/actionTypes'
import { preselectCollection } from '../collectionsHelper'


describe('when pre-selecting a collection', () => {
	let initalState = {
		features: Immutable.Map({}),
		menuCollections: Immutable.Map({}),
	}

	describe('when collections feature is enabled', () => {
		beforeEach(() => {
			initalState.features = Immutable.Map(
				...initalState.features,
				{ collections: Immutable.Map({ value: true }) },
			)
		})

		describe('and collectionName is not empty', () => {
			const collectionName = 'test collection name'

			beforeEach(() => {
				initalState.menuCollections = Immutable.Map(
					...initalState.menuCollections,
					Immutable.fromJS({
						testCollectionId: {
							id: 'testCollectionId',
							shortTitle: 'test collection name'
						}
					})
				)
			})

			test('then collection from the query parameter is pre-selected', () => {
				const mockStore = configureMockStore()
				const store = mockStore(initalState)

				preselectCollection(store.getState(), collectionName, store.dispatch)

				expect(store.getActions()).toContainEqual({
					type: actionTypes.FILTERS_COLLECTION_CHANGE,
					collectionId: 'testCollectionId',
				})
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
