import * as trackingKeys from 'actions/trackingKeys'

export const recipeListViewed = (action) => ({
  type: trackingKeys.viewRecipeList,
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
  type: trackingKeys.selectRecipeCollection,
  data: {
    collection_id: action.collectionId,
  },
})

export default {
  recipeListViewed,
  recipeCollectionSelected,
}
