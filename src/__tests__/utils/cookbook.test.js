import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import * as cookbookUtils from 'utils/cookbook'

describe('utils/cookbook', () => {
	describe('getCollectionIds', () => {
		const itemSets = Immutable.fromJS({
			3: ['abc-123', '25', '3'],
			1: ['1', '4'],
			2: ['6', 'def-456', '5'],
		})

		test('should return flattened Immutable List of collection ids from all sets in correct order', () => {
			const result = cookbookUtils.getItemIds(itemSets)
			const expectedResult = Immutable.List([
				'1',
				'4',
				'6',
				'def-456',
				'5',
				'abc-123',
				'25',
				'3',
			])
			expect(Immutable.is(result, expectedResult)).toEqual(true)
		})

		test('should remove all items before given set if startSet is provided', () => {
			const result = cookbookUtils.getItemIds(itemSets, { startSet: 2 })
			const expectedResult = Immutable.List([
				'6',
				'def-456',
				'5',
				'abc-123',
				'25',
				'3',
			])
			expect(Immutable.is(result, expectedResult)).toEqual(true)
		})

		test('should remove all items after given set if endSet is provided', () => {
			const result = cookbookUtils.getItemIds(itemSets, { endSet: 2 })
			const expectedResult = Immutable.List(['1', '4', '6', 'def-456', '5'])
			expect(Immutable.is(result, expectedResult)).toEqual(true)
		})
	})
})
