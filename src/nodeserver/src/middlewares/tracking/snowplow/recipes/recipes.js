export const recipeListViewed = (action) => ({
	type: 'RecipeList Viewed',
	data: {
		original_order: action.originalOrder,
		displayed_order: action.displayedOrder,
		collection_id: action.collectionId,
		delivery_day_id: action.deliveryDayId,
		order_id: action.orderId,
		recommended: action.recommended,
		browse_mode: action.browseMode,
	},
})

export const recipeFiltersOpen = () => ({
	type: 'RecipeFilters Open',
})

export const recipeFiltersClose = () => ({
	type: 'RecipeFilters Close',
})

export const recipeCollectionSelect = (action) => ({
	type: 'RecipeCollection Select',
	data: {
		collection_id: action.collectionId,
	},
})

export const recipeFiltersApply = (action) => ({
	type: 'RecipeFilters Apply',
	data: {
		collection_id: action.collectionId,
	},
})

export default {
	recipeListViewed,
	recipeFiltersOpen,
	recipeFiltersClose,
	recipeCollectionSelect,
	recipeFiltersApply,
}
