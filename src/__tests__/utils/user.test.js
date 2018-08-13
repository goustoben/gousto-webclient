import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import userUtils from 'utils/user'

describe('utils/user', () => {
	const userOrder = Immutable.fromJS({
		id: '1',
		giftItems: [
			{ itemableId: '1', title: 'Recipe 1', itemableType: 'Gift' },
			{ itemableId: '2', title: 'Recipe 2', itemableType: 'Product' },
		],
		productItems: [
			{ itemableId: '3', title: 'Product 3' },
			{ itemableId: '4', title: 'Product 4' },
		],
		recipeItems: [
			{ itemableId: '5', title: 'Recipe 5' },
			{ itemableId: '6', title: 'Recipe 6' },
		],
	})

	describe('getUserOrderById', () => {
		const userOrders = Immutable.fromJS([
			{ id: '1', date: 'date 1' },
			{ id: '2', date: 'date 2' },
		])

		test('should return found order if requested order is found', () => {
			expect(
				Immutable.is(
					userUtils.getUserOrderById('2', userOrders),
					Immutable.fromJS({ id: '2', date: 'date 2' }),
				),
			).toBe(true)
		})

		test('should return Immutable.Map if requested order not found', () => {
			expect(
				Immutable.is(
					userUtils.getUserOrderById('3', userOrders),
					Immutable.Map({}),
				),
			).toBe(true)
		})
	})

	describe('getUserOrderGiftIds', () => {
		test('should return gift ids given a user order', () => {
			expect(userUtils.getUserOrderGiftIds(userOrder)).toEqual(['1', '2'])
		})

		test('should return empty array if no gifts are found in the order', () => {
			expect(
				userUtils.getUserOrderGiftIds(Immutable.fromJS({ id: '1' })),
			).toEqual([])
		})
	})

	describe('getUserOrderGiftProductIds', () => {
		test('should return gift ids given a user order', () => {
			expect(userUtils.getUserOrderGiftProductIds(userOrder)).toEqual(['2'])
		})

		test('should return empty array if no gifts are found in the order', () => {
			expect(
				userUtils.getUserOrderGiftProductIds(Immutable.fromJS({ id: '1' })),
			).toEqual([])
		})
	})

	describe('getUserOrderProductIds', () => {
		test('should return product ids given a user order', () => {
			expect(userUtils.getUserOrderProductIds(userOrder)).toEqual(['3', '4'])
		})

		test('should return empty array if no products are found in the order', () => {
			expect(
				userUtils.getUserOrderProductIds(Immutable.fromJS({ id: '1' })),
			).toEqual([])
		})
	})

	describe('getUserOrderRecipeIds', () => {
		test('should return recipe ids given a user order', () => {
			expect(userUtils.getUserOrderRecipeIds(userOrder)).toEqual(['5', '6'])
		})

		test('should return empty array if no recipes are found in the order', () => {
			expect(
				userUtils.getUserOrderRecipeIds(Immutable.fromJS({ id: '1' })),
			).toEqual([])
		})
	})
})
