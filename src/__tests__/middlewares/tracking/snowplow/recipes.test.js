import { recipeListViewed, recipeFiltersOpen, recipeFiltersClose, recipeCollectionSelect, recipeFiltersApply } from 'middlewares/tracking/snowplow/recipes/recipes'

describe('snowplow recipe tracking events', () => {
	describe('recipeListViewed', () => {
		const action = {
			originalOrder: ['3', '5', '2', '7'],
			displayedOrder: ['7', '3', '2'],
			collectionId: '1234',
			deliveryDayId: 'bd92cae8-1573-4a37-888d-e968b88dff50',
			orderId: '9191919',
			recommended: true,
			browseMode: false,
		}

		test('should return an object with type RecipeList Viewed', () => {
			expect(recipeListViewed(action)).toMatchObject({ type: 'RecipeList Viewed' })
		})

		test('should return an object with data extracted from the action', () => {
			expect(recipeListViewed(action)).toMatchObject({
				data: {
					original_order: ['3', '5', '2', '7'],
					displayed_order: ['7', '3', '2'],
					collection_id: '1234',
					delivery_day_id: 'bd92cae8-1573-4a37-888d-e968b88dff50',
					order_id: '9191919',
					recommended: true,
					browse_mode: false,
				},
			})
		})
	})

	describe('recipeFiltersOpen', () => {
		test('should return an object with type RecipeFilters Open', () => {
			expect(recipeFiltersOpen()).toMatchObject({ type: 'RecipeFilters Open' })
		})
	})

	describe('recipeFiltersClose', () => {
		test('should return an object with type RecipeFilters Open', () => {
			expect(recipeFiltersClose()).toMatchObject({ type: 'RecipeFilters Close' })
		})
	})

	describe('recipeCollectionSelect', () => {
		const action = {
			collectionId: '4321',
		}

		test('should return an object with type RecipeCollection Select', () => {
			expect(recipeCollectionSelect(action)).toMatchObject({ type: 'RecipeCollection Select' })
		})

		test('should return an object with data extracted from the action', () => {
			expect(recipeCollectionSelect(action)).toMatchObject({
				data: {
					collection_id: '4321',
				},
			})
		})
	})

	describe('recipeFiltersApply', () => {
		const action = {
			collectionId: '5678',
		}

		test('should return an object with type RecipeCollection Select', () => {
			expect(recipeFiltersApply(action)).toMatchObject({ type: 'RecipeFilters Apply' })
		})

		test('should return an object with data extracted from the action', () => {
			expect(recipeFiltersApply(action)).toMatchObject({
				data: {
					collection_id: '5678',
				},
			})
		})
	})
})
