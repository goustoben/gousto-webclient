import * as trackingKeys from 'actions/trackingKeys'

export const recipeListViewed = (action) => ({
  type: trackingKeys.viewRecipeList,
  data: {
    menu_id: action.currentMenuId,
    transaction_type: action.transactionType,
    displayed_order: action.displayedOrder,
    collection_id: action.collectionId,
    diet_types: action.dietTypes,
    dietary_attributes: action.dietaryAttributes,
    time_frame: action.totalTime,
    delivery_day_id: action.deliveryDayId,
    order_id: action.orderId,
    recommended: action.recommended,
    browse_mode: action.browseMode,
    recommender_version: action.recommenderVersion,
    is_recommendations_shown: action.isRecommendationsShown,
  },
})
