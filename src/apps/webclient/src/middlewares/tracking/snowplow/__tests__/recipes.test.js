import { recipeListViewed } from '../recipes'

describe('snowplow recipe tracking events', () => {
  describe('view_recipe_list', () => {
    const action = {
      displayedOrder: ['7', '3', '2'],
      collectionId: '1234',
      dietTypes: ['meat'],
      dietaryAttributes: ['gluten-free'],
      totalTime: '10',
      deliveryDayId: 'bd92cae8-1573-4a37-888d-e968b88dff50',
      orderId: '9191919',
      recommended: true,
      browseMode: false,
      recommenderVersion: '1',
      isRecommendationsShown: true,
      currentMenuId: 'test-menu-id',
      transactionType: 'test-transaction-type',
      soldOutRecipes: ['3'],
    }

    test('should return an object with type view_recipe_list', () => {
      expect(recipeListViewed(action)).toMatchObject({ type: 'view_recipe_list' })
    })

    test('should return an object with data extracted from the action', () => {
      expect(recipeListViewed(action)).toMatchObject({
        data: {
          displayed_order: ['7', '3', '2'],
          collection_id: '1234',
          diet_types: ['meat'],
          dietary_attributes: ['gluten-free'],
          time_frame: '10',
          delivery_day_id: 'bd92cae8-1573-4a37-888d-e968b88dff50',
          order_id: '9191919',
          recommended: true,
          browse_mode: false,
          recommender_version: '1',
          is_recommendations_shown: true,
          menu_id: 'test-menu-id',
          transaction_type: 'test-transaction-type',
        },
      })
    })
  })
})
