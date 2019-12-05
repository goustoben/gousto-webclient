import {
  recipeListViewed,
  recipeCollectionSelected,
} from '../recipes/recipes'

describe('snowplow recipe tracking events', () => {
  describe('recipeListViewed', () => {
    const action = {
      originalOrder: ['3', '5', '2', '7'],
      displayedOrder: ['7', '3', '2'],
      collectionId: '1234',
      dietTypes: ['meat'],
      dietaryAttributes: ['gluten-free'],
      totalTime: '10',
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
          diet_types: ['meat'],
          dietary_attributes: ['gluten-free'],
          time_frame: '10',
          delivery_day_id: 'bd92cae8-1573-4a37-888d-e968b88dff50',
          order_id: '9191919',
          recommended: true,
          browse_mode: false,
        },
      })
    })
  })

  describe('recipeCollectionSelected', () => {
    const action = {
      collectionId: '4321',
    }

    test('should return an object with type RecipeCollection Select', () => {
      expect(recipeCollectionSelected(action)).toMatchObject({ type: 'RecipeCollection Selected' })
    })

    test('should return an object with data extracted from the action', () => {
      expect(recipeCollectionSelected(action)).toMatchObject({
        data: {
          collection_id: '4321',
        },
      })
    })
  })
})
