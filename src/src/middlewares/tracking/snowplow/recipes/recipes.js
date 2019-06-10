export const recipeListViewed = (action) => ({
  type: 'RecipeList Viewed',
  data: {
    original_order: action.originalOrder,
    displayed_order: action.displayedOrder,
    collection_id: action.collectionId,
    diet_types: action.dietTypes,
    dietary_attributes: action.dietaryAttributes,
    time_frame: action.totalTime,
    delivery_day_id: action.deliveryDayId,
    order_id: action.orderId,
    recommended: action.recommended,
    browse_mode: action.browseMode,
  },
})

export const recipeFiltersOpened = () => ({
  type: 'RecipeFilters Opened',
})

export const recipeFiltersClosed = () => ({
  type: 'RecipeFilters Closed',
})

export const recipeFiltersCleared = () => ({
  type: 'RecipeFilters Cleared',
})

export const recipeCollectionSelected = (action) => ({
  type: 'RecipeCollection Selected',
  data: {
    collection_id: action.collectionId,
  },
})

export const recipeFiltersApplied = (action) => ({
  type: 'RecipeFilters Applied',
  data: {
    collection_id: action.collectionId,
    diet_types: action.dietTypes,
    dietary_attributes: action.dietaryAttributes,
    time_frame: action.totalTime,
  },
})

export const recipeTypeSelected = (action) => ({
  type: 'RecipeType Selected',
  data: {
    recipe_type: action.dietType,
  },
})

export const recipeTypeUnselected = (action) => ({
  type: 'RecipeType Unselected',
  data: {
    recipe_type: action.dietType,
  },
})

export const recipeDietaryAttributeSelected = (action) => ({
  type: 'RecipeDietaryAttribute Selected',
  data: {
    dietary_attribute: action.dietaryAttribute,
  },
})

export const recipeDietaryAttributeUnselected = (action) => ({
  type: 'RecipeDietaryAttribute Unselected',
  data: {
    dietary_attribute: action.dietaryAttribute,
  },
})

export const recipeTotalTimeSelected = (action) => ({
  type: 'RecipeTimeFrame Selected',
  data: {
    time_frame: action.totalTime,
  },
})

export const recipeTotalTimeUnselected = (action) => ({
  type: 'RecipeTimeFrame Unselected',
  data: {
    time_frame: action.totalTime,
  },
})

export default {
  recipeListViewed,
  recipeFiltersOpened,
  recipeFiltersClosed,
  recipeFiltersCleared,
  recipeCollectionSelected,
  recipeTypeSelected,
  recipeTypeUnselected,
  recipeDietaryAttributeSelected,
  recipeDietaryAttributeUnselected,
  recipeTotalTimeSelected,
  recipeTotalTimeUnselected,
  recipeFiltersApplied,
}
