import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import { getPreselectedCollectionName, selectCollection } from '../utils'
import actionTypes from 'actions/actionTypes'
import { recommendationsShortTitle } from 'config/collections'

describe('getPreselectedCollectionName', () => {
	let state = {
		features: {}
	}

	describe('when collectionFreeze feature is set to non-empty string value', () => {
		beforeEach(() => {
			state.features = Immutable.fromJS({
				collectionFreeze: {
					value: 'non-empty string'
				}
			})
		})

		it('should return value of collectionFreeze', () => {
			expect(getPreselectedCollectionName(state)).toEqual('non-empty string')
		})
	})

	describe('when collectionFreeze feature is empty value', () => {
		beforeEach(() => {
			state.features = Immutable.fromJS({
				collectionFreeze: {
					value: ''
				}
			})
		})

		describe('and just for you feature is enabled', () => {
			beforeEach(() => {
				state.features = Immutable.fromJS({
					...state.features.toJS(),
					justforyou: {
						value: true
					}
				})
			})

			describe('and collection name from query param is empty', () => {
				const collectionNameFormQueryParam = ''

				it('should return recommendations collection short title', () => {
					expect(getPreselectedCollectionName(state, collectionNameFormQueryParam)).toEqual(recommendationsShortTitle)
				})
			})

			describe('and collection name from query param is not empty', () => {
				const collectionNameFormQueryParam = 'query-collection-name'

				it('should return collection name from query param', () => {
					expect(getPreselectedCollectionName(state, collectionNameFormQueryParam)).toEqual(collectionNameFormQueryParam)
				})
			})
		})

		describe('and just for you feature is disabled', () => {
			beforeEach(() => {
				state.features = Immutable.fromJS({
					...state.features.toJS(),
					justforyou: {
						value: false
					}
				})
			})

			it('should return collection name from query param', () => {
				expect(getPreselectedCollectionName(state, 'default-collection-name')).toEqual('default-collection-name')
			})
		})
	})
})

describe('selectCollection', () => {
	let initalState = {
		features: Immutable.Map({}),
		menuCollections: Immutable.Map({}),
		menuCollectionRecipes: Immutable.Map({
			testCollectionId: Immutable.List(['1', '2', '3'])
		})
	}

	describe('when collection id exists for the given collection name and collection is published', () => {
		const collectionName = 'test-collection-name'

		beforeEach(() => {
			initalState.menuCollections = Immutable.Map(
				Immutable.fromJS({
					testCollectionId: {
						id: 'testCollectionId',
						shortTitle: 'test collection name',
						published: true
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
		const collectionName = 'test-collection-name'

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
