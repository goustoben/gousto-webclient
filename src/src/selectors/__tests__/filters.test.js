import Immutable from 'immutable'

import { getFilterCTAText } from 'selectors/filters'

describe('filters selectors', () => {
	describe('getFilterCTAText', () => {
		let state
		const getFilterCTAState = (collectionId, dietTypes, dietaryAttributes, cookingTime) => ({
			menuCollections: Immutable.fromJS({
				ca8f71be: {
					default: true,
					shortTitle: 'All Recipes'
				},
				f0c28cb0: {
					defult: false,
					shortTitle: 'World Food'
				},
				d5808bf8: {
					defult: false,
					shortTitle: 'Boost & Balance'
				},
				a49adbs: {
					default: false,
					slug: 'recommendations',
					shortTitle: 'Recommendations'
				}
			}),
			filters: Immutable.Map({
					currentCollectionId: collectionId,
					totalTime: cookingTime,
					dietTypes: Immutable.Set(dietTypes),
					dietaryAttributes: Immutable.Set(dietaryAttributes),
			}),
		})

		test('should return "All Recipes" by default', () => {
			state = getFilterCTAState()

			expect(getFilterCTAText(state)).toBe('All Recipes')
		})

		test('should return a string containing the selected filters, in order', () => {
			state = getFilterCTAState(
				'd5808bf8',
				['meat', 'vegetarian'],
				['gluten-free', 'dairy-free'],
				'20',
			)

			expect(getFilterCTAText(state)).toBe('Boost & Balance, Meat, Vegetarian, Gluten-Free, Dairy-Free, 20 minutes or less')
		})

		test('should return a string containing the selected filters, in order', () => {
			state = getFilterCTAState(
				'a49adbs',
				[''],
				[''],
				'0',
			)

			expect(getFilterCTAText(state)).toBe('Just For You, Any length')
		})
	})
})
