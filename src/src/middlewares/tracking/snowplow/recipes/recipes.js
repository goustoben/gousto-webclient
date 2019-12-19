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

export const recipeCollectionSelected = (action) => ({
  type: 'RecipeCollection Selected',
  data: {
    collection_id: action.collectionId,
  },
})

export default {
  recipeListViewed,
  recipeCollectionSelected,
}
