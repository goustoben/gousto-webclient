import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import * as storeUtils from 'utils/store'

describe('utils/store', () => {
	describe('getItemsById', () => {
		const items = Immutable.fromJS({
			'abc-123': { id: 'abc-123', title: 'Item abc-123' },
			1: { id: '1', title: 'Item 1' },
			2: { id: '2', title: 'Item 2' },
			3: { id: '3', title: 'Item 3' },
			4: { id: '4', title: 'Item 4' },
			5: { id: '5', title: 'Item 5' },
			6: { id: '6', title: 'Item 6' },
		})
		test('should return items matching item ids in requested order', () => {
			const foundItems = storeUtils.getItemsById(['1', 'abc-123'], items)
			const expectedResult = Immutable.fromJS([
				{ id: '1', title: 'Item 1' },
				{ id: 'abc-123', title: 'Item abc-123' },
			])
			expect(foundItems.toJS()).toEqual(expectedResult.toJS())
		})

		test('should not include items which do not exist in item store', () => {
			const foundItems = storeUtils.getItemsById(
				['1', 'abc-123', '5', '10'],
				items,
			)
			const expectedResult = Immutable.fromJS([
				{ id: '1', title: 'Item 1' },
				{ id: 'abc-123', title: 'Item abc-123' },
				{ id: '5', title: 'Item 5' },
			])
			expect(foundItems.toJS()).toEqual(expectedResult.toJS())
		})
	})
})
