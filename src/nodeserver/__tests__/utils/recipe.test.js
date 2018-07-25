import Immutable from 'immutable'

jest.mock('config', () => ({
	menu: { stockTagTreshold: 10, stockThreshold: 0 },
	recipes: {
		range: {
			badges: { testRange: { text: 'An Example Range' } },
		},
	},
}))

import {
	getLowStockTag,
	formatRecipeTitle,
	getSurcharge,
	getCookingTime,
	getRangeBadge,
	getTaxonomyTags,
} from 'utils/recipe'

describe('recipes', () => {
	describe('getLowStockTag', () => {
		test('should return nothing if theres enough stock and not new', () => {
			expect(getLowStockTag(100, 10)).toBe('')
		})

		test('should return new when no rating count', () => {
			expect(getLowStockTag(100, 0)).toBe('New Recipe')
		})

		test('should return new recipe when no rating count and view is simple', () => {
			expect(getLowStockTag(100, 0, 'simple')).toBe('New Recipe')
		})

		test('should show sold out when no stock', () => {
			expect(getLowStockTag(0, 10)).toBe('Sold Out')
		})

		test('should show #no left when below treshold', () => {
			expect(getLowStockTag(4, 10)).toBe('Just 4 left')
		})
	})

	describe('formatRecipeTitle', () => {
		const title = 'A Test Recipe'
		let boxType
		let dietType

		test('should return the title if boxType and dietType are empty', () => {
			expect(formatRecipeTitle(title, '', '')).toBe(title)
		})

		test('should append (V) to the title if boxType and dietType are Vegetarian', () => {
			boxType = dietType = 'Vegetarian'
			expect(formatRecipeTitle(title, boxType, dietType)).toContain('(V)')
			expect(formatRecipeTitle(title, boxType, dietType)).toContain(title)
		})

		test('should append (V) to the title if dietType is Vegan', () => {
			dietType = 'Vegan'
			expect(formatRecipeTitle(title, boxType, dietType)).toContain('(V)')
			expect(formatRecipeTitle(title, boxType, dietType)).toContain(title)
		})
	})

	describe('getSurcharge', () => {

		let meals

		test('should return null if no surcharges are passed', () => {
			meals = Immutable.List([])

			expect(getSurcharge(meals, 2)).toBeNull()
		})

		test('should return a surcharge for the correct numPortions', () => {
			const [twoPersonSurcharge, fourPersonSurcharge] = [1.99, 2.99]
			meals = Immutable.fromJS([
				{ numPortions: 2, surcharge: { listPrice: twoPersonSurcharge } },
				{ numPortions: 4, surcharge: { listPrice: fourPersonSurcharge } },
			])

			expect(getSurcharge(meals, 2)).toBe(twoPersonSurcharge)
			expect(getSurcharge(meals, 4)).toBe(fourPersonSurcharge)
		})
	})

	describe('getCookingTime', () => {
		test('should return cooking time under 90 mins correctly ', () => {
			expect(getCookingTime(1)).toBe('1 mins')
		})

		test('should return the cooking time for 1 hr correctly', () => {
			expect(getCookingTime(60)).toBe('60 mins')
		})

		test('should return the cooking time for 89 mins correctly', () => {
			expect(getCookingTime(89)).toBe('89 mins')
		})

		test('should return the cooking over 90 mins time correctly', () => {
			expect(getCookingTime(95)).toBe('1 hr 35 mins')
		})

		test('should return the cooking over 120 mins time correctly', () => {
			expect(getCookingTime(160)).toBe('2 hrs 40 mins')
		})
	})

	describe('getRangeBadge', () => {
		test('should return null if no item is found', () => {
			expect(getRangeBadge('test')).toBeNull()
		})

		test('should return an object if range name matches', () => {
			expect(getRangeBadge('testRange')).toEqual({
				text: 'An Example Range',
			})
		})
	})

	describe('getTaxonomyTags', () => {
		let recipe

		test('if no taxonomy is found should return an empty Immutable.List', () => {
			recipe = Immutable.fromJS({
				id: '327',
				dietType: 'Meat',
				taxonomy: [
					{
						id: 1,
						name: 'Dietary attributes',
						slug: 'dietary-attributes',
						tags: [],
					},
				],
			})

			expect(getTaxonomyTags(recipe, 'test-category')).toEqual(Immutable.List([]))
		})

		test('should return taxonomy tags in the given category', () => {
			recipe = Immutable.fromJS({
				id: '327',
				dietType: 'Meat',
				taxonomy: [
					{
						id: 1,
						name: 'Test Category',
						slug: 'test-category',
						tags: [
							{ slug: 'test-attribute' },
						],
					},
					{
						id: 2,
						name: 'Alternate Category',
						slug: 'alternate-category',
						tags: [
							{ slug: 'alternate-attribute-1' },
							{ slug: 'alternate-attribute-2' },
						],
					},
				],
			})

			expect(getTaxonomyTags(recipe, 'test-category').size).toEqual(1)
			expect(getTaxonomyTags(recipe, 'alternate-category').size).toEqual(2)
		})
	})
})
