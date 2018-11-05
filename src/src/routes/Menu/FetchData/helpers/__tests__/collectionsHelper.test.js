import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { filterCollectionChange } from 'actions/filters'

import { preselectCollection } from '../collectionsHelper'


describe('when pre-selecting a collection', () => {
	let initalState = {
		features: Immutable.Map({}),
		routing: {
			locationBeforeTransitions: { query: { collection: 'gluten-free' } },
		},
		menuCollections: Immutable.fromJS({
			testCollectionId: {
				shortTitle: 'Test Collection Name',
				default: true,
				id: 'testCollectionId',
			},
		}),
	}


	describe('when collections feature is enabled  ', () => {
		initalState.features = Immutable.Map(
			// ...initalState.features,
			// { collections: Immutable.Map({ value: true }) },
			// { forceCollections: Immutable.Map({ value: false }) },
			{ justforyou: Immutable.Map({ value: false }) }
		)

		initalState.filters = { currentCollectionId: '' }

		test('then collection from the query parameter is pre-selected', () => {

			const mockStore = configureMockStore([thunk])
			const store = mockStore(initalState)
			const collectionName = 'Test Collection Name'
			const mockGetCollectionIdByName = () => 'testCollectionId'

			expect(store.getState().filters).toEqual({ currentCollectionId: '' })

			preselectCollection(store.getState(), collectionName, mockGetCollectionIdByName, store.dispatch)
			store.dispatch(filterCollectionChange('testCollectionId'))
			expect(store.getState().filters).toEqual({ currentCollectionId: 'testCollectionId' })

			// store.dispatch(filterMenuOpen())
			// store.dispatch(filterDietaryAttributesChange('gluten-free'))
			// store.dispatch(filterMenuRevertFilters())
			// expect(store.getState().filters).toEqual(Immutable.Map({
			// 	currentCollectionId: 'current_collection',
			// 	totalTime: '0',
			// 	dietTypes: Immutable.Set(['meat']),
			// 	dietaryAttributes: Immutable.Set([]),
			// }))
		})
	})


	// describe('when just for you feature is turned on  ', () => {
	// 	initalState.features = [
	// 		...initalState.features,
	// 		{ justforyou: Immutable.Map({ value: true }) }
	// 	]
	// })


})
