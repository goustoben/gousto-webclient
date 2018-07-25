

const giftReducer = require('../../../js/products/reducers/gift')
const Immutable = require('immutable')
const CONFIG = require('@fe/gousto-config')
const CONSTANTS = CONFIG.PRODUCTS

describe('giftReducer', () => {
	describe('userGifts', () => {
		it('should handle initial state', () => {
			expect(giftReducer.userGifts(undefined, {})).toEqual(Immutable.Map({}))
		})

		it('should handle unknown actions', () => {
			expect(giftReducer.userGifts({'prod-1': {qty: 1}}, { type: 'unknown' })).toEqual({'prod-1': {qty: 1}})
		})

		it('should add user gift products', () => {
			let action = {
				type: CONSTANTS.LOAD_USER_GIFTS,
				gifts: [
					{itemable_id: 'prod-1', itemable_type: 'Product', list_price: '1.12', quantity: '1', title: 'Gift A'},
					{itemable_id: 'prod-2', itemable_type: 'Product', list_price: '2.12', quantity: '2', title: 'Gift B'}
				]
			}

			let expectedState = Immutable.OrderedMap({
				'prod-1': Immutable.Map({id: 'prod-1', price: '1.12', qty: 1, title: 'Gift A'}),
				'prod-2': Immutable.Map({id: 'prod-2', price: '2.12', qty: 2, title: 'Gift B'})
			})

			const result = giftReducer.userGifts(Immutable.OrderedMap({}), action)

			expect(Immutable.is(result, expectedState)).toBe(true)
		})

		it('should add user gift product images', () => {
			let action = {
				type: CONSTANTS.LOAD_GIFT_PRODUCT,
				gifts: [
					{id: 'prod-1', images: [{image: 'url'}]},
					{id: 'prod-2', images: [{image: 'url2'}]},
				]
			}

			let startState = Immutable.OrderedMap({
				'prod-1': Immutable.Map({id: 'prod-1', price: '1.12', qty: 1, title: 'Gift A'}),
				'prod-2': Immutable.Map({id: 'prod-2', price: '2.12', qty: 2, title: 'Gift B'})
			})

			let expectedState = Immutable.OrderedMap({
				'prod-1': Immutable.Map({id: 'prod-1', price: '1.12', qty: 1, title: 'Gift A',
					images: [{image: 'url'}]
				}),
				'prod-2': Immutable.Map({id: 'prod-2', price: '2.12', qty: 2, title: 'Gift B',
					images: [{image: 'url2'}]
				}),
			})

			const result = giftReducer.userGifts(startState, action)
			expect(result.toJSON()).toEqual(expectedState.toJSON())
		})
	})
})
