import Immutable from 'immutable' /* eslint-disable new-caps */
import {
	trackFirstPurchase,
	setAffiliateSource,
	trackRecipeOrderDisplayed,
	trackRecipeFiltersOpened,
	trackRecipeFiltersClosed,
	trackRecipeCollectionSelected,
	trackRecipeFiltersApplied,
	trackRecipeFiltersCleared,
	trackRecipeTypeSelected,
	trackRecipeTypeUnselected,
	trackRecipeDietaryAttributeSelected,
	trackRecipeDietaryAttributeUnselected,
	trackRecipeTotalTimeSelected
} from 'actions/tracking'
import actionTypes from 'actions/actionTypes'
import { warning } from 'utils/logger'

jest.mock('utils/logger', () => ({
	warning: jest.fn(),
}))

describe('tracking actions', () => {
	let getState
	let dispatch

	describe('trackFirstPurchase', () => {
		const state = {
			user: Immutable.fromJS({
				goustoReference: '123',
				orders: [
					{
						id: 'order-a',
						prices: {
							total: '13.99',
							promoCode: '10OFF',
						},
					},
				],
			}),
			tracking: Immutable.fromJS({
				asource: 'test-source',
			}),
		}

		beforeEach(() => {
			dispatch = jest.fn()
			getState = jest.fn().mockReturnValue(state)
		})

		test('should dispatch TRACKING action', () => {
			trackFirstPurchase('order-a')(dispatch, getState)
			const dispatchData = dispatch.mock.calls[0][0]

			expect(dispatchData.type).toBe(actionTypes.TRACKING)
		})
		test('should dispatch correct trackingData', () => {
			trackFirstPurchase('order-a')(dispatch, getState)
			const trackingData = dispatch.mock.calls[0][0].trackingData

			expect(trackingData.asource).toBe('test-source')
			expect(trackingData.goustoReference).toBe('123')
			expect(trackingData.event).toBe('firstPurchase')
			expect(trackingData.orderId).toBe('order-a')
			expect(trackingData.orderTotal).toBe('13.99')
			expect(trackingData.voucher).toBe('10OFF')
		})
		test('should log warning when no user is found', () => {
			warning.mockClear()

			trackFirstPurchase('order-a')(dispatch, () => ({
				user: Immutable.fromJS({ orders: [] }),
				tracking: Immutable.fromJS({}),
			}))

			expect(warning.mock.calls[0][0]).toBe(
				'Missing user data for first purchase tracking: no user found in store',
			)
		})
		test('should log warning when specified order is not found', () => {
			warning.mockClear()

			trackFirstPurchase('order-a')(dispatch, () => ({
				user: Immutable.fromJS({
					goustoReference: '123',
					orders: [{ id: 'order-b' }],
				}),
				tracking: Immutable.fromJS({}),
			}))

			expect(warning.mock.calls[0][0]).toBe(
				'Missing order data for first purchase tracking: no user order "order-a" found in store',
			)
		})
	})

	describe('setAffiliateSource', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch AFFILIATE_SOURCE_SET action', () => {
			setAffiliateSource('example-source')(dispatch)
			const dispatchData = dispatch.mock.calls[0][0]

			expect(dispatchData.type).toBe(actionTypes.AFFILIATE_SOURCE_SET)
		})

		test('should dispatch correct asource', () => {
			setAffiliateSource('example-source')(dispatch)
			const dispatchData = dispatch.mock.calls[0][0]

			expect(dispatchData.asource).toBe('example-source')
		})
	})

	describe('trackRecipeOrderDisplayed', () => {
		const originalOrder = ['3', '5', '2', '6']
		const displayedOrder = ['6', '3', '2']
		const collectionId = '678'
		let state = {
			basket: Immutable.Map({
				orderId: '1234567',
				date: '2018-05-04',
			}),
			menuBrowseCtaShow: false,
			recipes: Immutable.Map({
				a: Immutable.Map({ isRecommended: true }),
				b: Immutable.Map({ isRecommended: false }),
			}),
			boxSummaryDeliveryDays: Immutable.Map({
				'2018-05-04': Immutable.Map({ id: 'test-day-id' }),
			}),
			menu: Immutable.Map({
				filtersMenuVisible: false,
			}),
			filters: Immutable.Map({
				currentCollectionId: '678',
				totalTime: '20',
				dietTypes: Immutable.Set(['meat']),
				dietaryAttributes: Immutable.Set(['gluten-free']),
			}),
		}

		beforeEach(() => {
			dispatch = jest.fn()
			getState = jest.fn()
		})

		test('should dispatch RECIPES_DISPLAYED_ORDER_TRACKING action', () => {
			getState.mockReturnValue(state)
			trackRecipeOrderDisplayed()(dispatch, getState)

			expect(dispatch).toHaveBeenCalledTimes(1)
			expect(dispatch.mock.calls[0][0].type).toBe(
				actionTypes.RECIPES_DISPLAYED_ORDER_TRACKING,
			)
		})

		test('should dispatch correct arguements', () => {
			getState.mockReturnValue(state)

			trackRecipeOrderDisplayed(
				originalOrder,
				displayedOrder,
			)(dispatch, getState)

			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toEqual({
				type: 'RECIPES_DISPLAYED_ORDER_TRACKING',
				originalOrder: ['3', '5', '2', '6'],
				displayedOrder: ['6', '3', '2'],
				collectionId: '678',
				dietTypes: ['meat'],
				dietaryAttributes: ['gluten-free'],
				totalTime: '20',
				recommended: true,
				browseMode: false,
				deliveryDayId: 'test-day-id',
				orderId: '1234567',
			})
		})

		test('should not dispatch when overlaid with the filterMenu', () => {
			state = {
				basket: Immutable.Map({ date: '2018-05-04' }),
				menuBrowseCtaShow: false,
				recipes: Immutable.Map({
					a: Immutable.Map({ isRecommended: true }),
					b: Immutable.Map({ isRecommended: false }),
				}),
				boxSummaryDeliveryDays: Immutable.Map({
					'2018-05-04': Immutable.Map({ id: 'test-day-id' }),
				}),
				menu: Immutable.Map({
					filtersMenuVisible: true,
				}),
				filters: Immutable.Map({
					currentCollectionId: '',
					totalTime: '0',
					dietTypes: Immutable.Set([]),
					dietaryAttributes: Immutable.Set([]),
				}),
			}
			getState.mockReturnValue(state)

			trackRecipeOrderDisplayed(
				originalOrder,
				displayedOrder,
				collectionId,
			)(dispatch, getState)

			expect(dispatch).not.toHaveBeenCalled()
		})

		describe('should dispatch recommended state', () => {
			test('when no recipes are recommended', () => {
				state = {
					basket: Immutable.Map({
						date: '2018-01-01',
					}),
					menuBrowseCtaShow: false,
					recipes: Immutable.Map({
						a: Immutable.Map({ isRecommended: false }),
						b: Immutable.Map({ isRecommended: false }),
					}),
					boxSummaryDeliveryDays: Immutable.Map({
						'2018-01-01': Immutable.Map({ id: 'test-day-id' }),
					}),
					menu: Immutable.Map({
						filtersMenuVisible: false,
					}),
					filters: Immutable.Map({
						currentCollectionId: '910',
						totalTime: '30',
						dietTypes: Immutable.Set(['fish']),
						dietaryAttributes: Immutable.Set(['dairy-free']),
					}),
				}
				getState.mockReturnValue(state)

				trackRecipeOrderDisplayed(originalOrder, displayedOrder, collectionId)(dispatch, getState)

				expect(dispatch.mock.calls[0][0].recommended).toBeFalsy()
			})

			test('when one or more recipes are recommended', () => {
				state = {
					basket: Immutable.Map({
						date: '2018-04-04',
					}),
					menuBrowseCtaShow: false,
					recipes: Immutable.Map({
						a: Immutable.Map({ isRecommended: true }),
						b: Immutable.Map({ isRecommended: false }),
					}),
					boxSummaryDeliveryDays: Immutable.Map({
						'2018-04-04': Immutable.Map({ id: 'test-day-id' }),
					}),
					menu: Immutable.Map({
						filtersMenuVisible: false,
					}),
					filters: Immutable.Map({
						currentCollectionId: '112',
						totalTime: '10',
						dietTypes: Immutable.Set(['vegan']),
						dietaryAttributes: Immutable.Set(['gluten-free', 'dairy-free']),
					}),
				}
				getState.mockReturnValue(state)

				trackRecipeOrderDisplayed(originalOrder, displayedOrder, collectionId)(dispatch, getState)

				expect(dispatch.mock.calls[0][0].recommended).toBeTruthy()
			})
		})
	})

	describe('trackRecipeFiltersOpened', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_OPENED_TRACKING action', () => {
			trackRecipeFiltersOpened()(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ type: actionTypes.RECIPE_FILTERS_OPENED_TRACKING })
		})
	})

	describe('trackRecipeFiltersClosed', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_CLOSED_TRACKING action', () => {
			trackRecipeFiltersClosed()(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ type: actionTypes.RECIPE_FILTERS_CLOSED_TRACKING })
		})
	})

	describe('trackRecipeCollectionSelected', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_COLLECTION_SELECTED_TRACKING action', () => {
			trackRecipeCollectionSelected()(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ type: actionTypes.RECIPE_COLLECTION_SELECTED_TRACKING })
		})

		test('should pass its first parameter as collectionId', () => {
			trackRecipeCollectionSelected('a-collection')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ collectionId: 'a-collection' })
		})
	})

	describe('trackRecipeFiltersApplied', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_APPLIED_TRACKING action', () => {
			trackRecipeFiltersApplied()(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ type: actionTypes.RECIPE_FILTERS_APPLIED_TRACKING })
		})

		test('should pass its first parameter as collectionId', () => {
			trackRecipeFiltersApplied('b-collection')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ collectionId: 'b-collection' })
		})

		test('should pass its parameters as collectionId, dietTypes, dietaryAttributes, totalTime', () => {
			trackRecipeFiltersApplied('b-collection', ['meat'], ['gluten-free'], '0')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toEqual({
				type: 'RECIPE_FILTERS_APPLIED_TRACKING',
				collectionId: 'b-collection',
				dietTypes: ['meat'],
				dietaryAttributes: ['gluten-free'],
				totalTime: '0',
			})
		})
	})

	describe('trackRecipeFiltersCleared', () => {
		test('should dispatch a RECIPE_FILTERS_CLEARED_TRACKING action', () => {
			dispatch = jest.fn()
			trackRecipeFiltersCleared()(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]
			expect(dispatchCall).toMatchObject({ type: actionTypes.RECIPE_FILTERS_CLEARED_TRACKING })
		})
	})

	describe('trackRecipeTypeSelected', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_DIET_TYPE_SELECTED_TRACKING action', () => {
			trackRecipeTypeSelected('meat')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]
			expect(dispatchCall).toMatchObject({
				type: actionTypes.RECIPE_FILTERS_DIET_TYPE_SELECTED_TRACKING,
				dietType: 'meat'
			})
		})
	})

	describe('trackRecipeTypeUnselected', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_DIET_TYPE_SELECTED_TRACKING action', () => {
			trackRecipeTypeUnselected('meat')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]
			expect(dispatchCall).toMatchObject({
				type: actionTypes.RECIPE_FILTERS_DIET_TYPE_UNSELECTED_TRACKING,
				dietType: 'meat'
			})
		})
	})

	describe('trackRecipeDietaryAttributeSelected', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_DIETARY_ATTRIBUTE_SELECTED_TRACKING action', () => {
			trackRecipeDietaryAttributeSelected('gluten-free')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]
			expect(dispatchCall).toMatchObject({
				type: actionTypes.RECIPE_FILTERS_DIETARY_ATTRIBUTE_SELECTED_TRACKING,
				dietaryAttribute: 'gluten-free'
			})
		})
	})

	describe('trackRecipeDietaryAttributeUnselected', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_DIETARY_ATTRIBUTE_UNSELECTED_TRACKING action', () => {
			trackRecipeDietaryAttributeUnselected('gluten-free')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]
			expect(dispatchCall).toMatchObject({
				type: actionTypes.RECIPE_FILTERS_DIETARY_ATTRIBUTE_UNSELECTED_TRACKING,
				dietaryAttribute: 'gluten-free'
			})
		})
	})

	describe('trackRecipeTotalTimeSelected', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_TOTAL_TIME_SELECTED_TRACKING action', () => {
			trackRecipeTotalTimeSelected('30')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]
			expect(dispatchCall).toMatchObject({
				type: actionTypes.RECIPE_FILTERS_TOTAL_TIME_SELECTED_TRACKING,
				totalTime: '30'
			})
		})
	})
})
