import Immutable from 'immutable' /* eslint-disable new-caps */
import { trackFirstPurchase, setAffiliateSource, trackRecipeOrderDisplayed, trackRecipeFiltersOpen, trackRecipeFiltersClose, trackRecipeCollectionSelect, trackRecipeFiltersApply } from 'actions/tracking'
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
				collectionId,
			)(dispatch, getState)

			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toEqual({
				type: 'RECIPES_DISPLAYED_ORDER_TRACKING',
				originalOrder: ['3', '5', '2', '6'],
				displayedOrder: ['6', '3', '2'],
				collectionId: '678',
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
				}
				getState.mockReturnValue(state)

				trackRecipeOrderDisplayed(originalOrder, displayedOrder, collectionId)(dispatch, getState)

				expect(dispatch.mock.calls[0][0].recommended).toBeTruthy()
			})
		})
	})

	describe('trackRecipeFiltersOpen', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_OPEN_TRACKING action', () => {
			trackRecipeFiltersOpen()(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ type: actionTypes.RECIPE_FILTERS_OPEN_TRACKING })
		})
	})

	describe('trackRecipeFiltersClose', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_CLOSE_TRACKING action', () => {
			trackRecipeFiltersClose()(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ type: actionTypes.RECIPE_FILTERS_CLOSE_TRACKING })
		})
	})

	describe('trackRecipeCollectionSelect', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_COLLECTION_SELECT_TRACKING action', () => {
			trackRecipeCollectionSelect()(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ type: actionTypes.RECIPE_COLLECTION_SELECT_TRACKING })
		})

		test('should pass its first parameter as collectionId', () => {
			trackRecipeCollectionSelect('a-collection')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ collectionId: 'a-collection' })
		})
	})

	describe('trackRecipeFiltersApply', () => {
		beforeEach(() => {
			dispatch = jest.fn()
		})

		test('should dispatch a RECIPE_FILTERS_APPLY_TRACKING action', () => {
			trackRecipeFiltersApply()(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ type: actionTypes.RECIPE_FILTERS_APPLY_TRACKING })
		})

		test('should pass its first parameter as collectionId', () => {
			trackRecipeFiltersApply('b-collection')(dispatch)
			const dispatchCall = dispatch.mock.calls[0][0]

			expect(dispatchCall).toMatchObject({ collectionId: 'b-collection' })
		})
	})
})
