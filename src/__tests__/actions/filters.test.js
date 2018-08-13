import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import actionTypes from 'actions/actionTypes'

import {
	collectionFilterChange,
	filterCurrentDietTypesChange,
	filterCurrentTotalTimeChange,
	clearAllFilters,
	filterDietaryAttributesChange,
	filterMenuOpen,
	filterMenuRevertFilters,
} from 'actions/filters'


describe('filters actions', () => {
	const dispatchSpy = jest.fn()
	const getStateSpy = jest.fn()

	afterEach(() => {
		dispatchSpy.mockClear()
		getStateSpy.mockClear()
	})

	describe('collectionFilterChange', () => {
		describe('when new collection id exists as a menu collections key', () => {
			beforeEach(() => {
				getStateSpy.mockReturnValue({
					routing: {
						locationBeforeTransitions: { query: { collection: 'gluten-free' } },
					},
					menuCollections: Immutable.fromJS({
						newCollectionId: { shortTitle: 'dairy-free' },
					}),
				})
			})

			test('should add the new collection name to the querystring', () => {
				collectionFilterChange('newCollectionId')(dispatchSpy, getStateSpy)

				expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
					collectionName: 'dairy-free',
				}))
			})

			test('should dispatch a FILTERS_COLLECTION_CHANGE action', () => {
				const collectionId = 'newCollectionId'

				collectionFilterChange(collectionId)(dispatchSpy, getStateSpy)

				expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
					type: actionTypes.FILTERS_COLLECTION_CHANGE,
					collectionId,
				}))
			})
		})

		describe('when new collection id does not exist as a menu collections key', () => {
			beforeEach(() => {
				getStateSpy.mockReturnValue({
					routing: {
						locationBeforeTransitions: { query: { collection: 'gluten-free' } },
					},
					menuCollections: Immutable.fromJS({
						notNewCollectionId: { shortTitle: 'dairy-free' },
					}),
				})
			})

			test('should remove the new collection name from the querystring if not found', () => {
				collectionFilterChange('newCollectionId')(dispatchSpy, getStateSpy)

				expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
					collectionName: '',
				}))
			})

			test('should dispatch a FILTERS_COLLECTION_CHANGE action', () => {
				const collectionId = 'newCollectionId'

				collectionFilterChange(collectionId)(dispatchSpy, getStateSpy)

				expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
					type: actionTypes.FILTERS_COLLECTION_CHANGE,
					collectionId,
				}))
			})
		})
	})

	describe('currentDietTypesChange', () => {
		test('should dispatch a FILTERS_DIET_TYPES_CHANGE action when adding diet type filter', () => {
			getStateSpy.mockReturnValue({
				routing: {
					locationBeforeTransitions: { query: { collection: 'gluten-free' } },
				},
				menuCollections: Immutable.fromJS({
					newCollectionId: { shortTitle: 'dairy-free' },
				}),
				filters: Immutable.Map({
					currentCollectionId: '',
					totalTime: '0',
					dietTypes: Immutable.Set([]),
				}),
			})
			filterCurrentDietTypesChange('meat')(dispatchSpy, getStateSpy)

			expect(dispatchSpy).toHaveBeenCalledWith({
				type: actionTypes.FILTERS_DIET_TYPES_CHANGE,
				dietTypes: Immutable.Set(['meat']),
			})
		})

		test('should dispatch a FILTERS_DIET_TYPES_CHANGE action when adding diet type filter', () => {
			getStateSpy.mockReturnValue({
				routing: {
					locationBeforeTransitions: { query: { collection: 'gluten-free' } },
				},
				menuCollections: Immutable.fromJS({
					newCollectionId: { shortTitle: 'dairy-free' },
				}),
				filters: Immutable.Map({
					currentCollectionId: '',
					totalTime: '0',
					dietTypes: Immutable.Set(['meat']),
				}),
			})

			filterCurrentDietTypesChange('meat')(dispatchSpy, getStateSpy)

			expect(dispatchSpy).toHaveBeenCalledWith({
				type: actionTypes.FILTERS_DIET_TYPES_CHANGE,
				dietTypes: Immutable.Set([]),
			})
		})
	})

	describe('currentDietaryAttributesChange', () => {
		beforeEach(() => {
			dispatchSpy.mockClear()
			getStateSpy.mockClear()
			getStateSpy.mockReturnValue({
				filters: Immutable.Map({
					dietaryAttributes: Immutable.Set(['gluten-free']),
				}),
			})
		})
		
		test('should dispatch a FILTERS_DIETARY_ATTRIBUTES_CHANGE action when adding a dietary attribute filter', () => {
			filterDietaryAttributesChange('dairy-free')(dispatchSpy, getStateSpy)

			expect(dispatchSpy).toHaveBeenCalledWith({
				type: actionTypes.FILTERS_DIETARY_ATTRIBUTES_CHANGE,
				dietaryAttributes: Immutable.Set([
					'gluten-free',
					'dairy-free',
				]),
			})
		})

		test('should dispatch a FILTERS_DIETARY_ATTRIBUTES_CHANGE action when removing a dietary attribute filter', () => {
			filterDietaryAttributesChange('gluten-free')(dispatchSpy, getStateSpy)

			expect(dispatchSpy).toHaveBeenCalledWith({
				type: actionTypes.FILTERS_DIETARY_ATTRIBUTES_CHANGE,
				dietaryAttributes: Immutable.Set([]),
			})
		})
	})

	describe('filterCurrentTotalTimeChange', () => {
		test('should dispatch a FILTERS_TOTAL_TIME_CHANGE action when the total time filter is changed', () => {
			getStateSpy.mockReturnValue({
				routing: {
					locationBeforeTransitions: { query: { collection: 'gluten-free' } },
				},
				menuCollections: Immutable.fromJS({
					newCollectionId: { shortTitle: 'dairy-free' },
				}),
				filters: Immutable.Map({
					currentCollectionId: '',
					totalTime: '0',
					dietTypes: Immutable.Set([]),
				}),
			})

			filterCurrentTotalTimeChange('10')(dispatchSpy, getStateSpy)

			expect(dispatchSpy).toHaveBeenCalledWith({
				type: actionTypes.FILTERS_TOTAL_TIME_CHANGE,
				totalTime: '10',
			})
		})
	})

	describe('clearAllFilters', () => {
		test('should dispatch a FILTERS_CLEAR_ALL action when the clear all is presed', () => {
			getStateSpy.mockReturnValue({
				routing: {
					locationBeforeTransitions: { query: { collection: 'gluten-free' } },
				},
				menuCollections: Immutable.fromJS({
					defaultCollectionId: {
						shortTitle: 'All Recipes',
						default: true, id:
						'defaultCollectionId',
					},
				}),
				filters: Immutable.Map({
					currentCollectionId: 'vfvd',
					totalTime: '30',
					dietTypes: Immutable.Set(['meat']),
				}),
			})

			clearAllFilters()(dispatchSpy, getStateSpy)

			expect(dispatchSpy).toHaveBeenCalledWith({
				type: actionTypes.FILTERS_CLEAR_ALL,
				collectionId: 'defaultCollectionId',
			})
		})
	})

	describe('resetFiltersOnMobile', () => {
		test('should dispatch a FILTERS_RESET action when the x button on mobile is pressed', () => {
			const mockStore = configureMockStore([thunk])
			const store = mockStore({
				filters: Immutable.Map({
					currentCollectionId: 'current_collection',
					totalTime: '0',
					dietTypes: Immutable.Set(['meat']),
					dietaryAttributes: Immutable.Set([]),
				}),
			})
			store.dispatch(filterMenuOpen())
			store.dispatch(filterDietaryAttributesChange('gluten-free'))
			store.dispatch(filterMenuRevertFilters())
			expect(store.getState().filters).toEqual(Immutable.Map({
				currentCollectionId: 'current_collection',
				totalTime: '0',
				dietTypes: Immutable.Set(['meat']),
				dietaryAttributes: Immutable.Set([]),
			}))
		})
	})
})
