import {
  recipeListViewed,
  recipeFiltersOpened,
  recipeFiltersClosed,
  recipeCollectionSelected,
  recipeFiltersApplied,
  recipeFiltersCleared,
  recipeTypeSelected,
  recipeTypeUnselected,
  recipeDietaryAttributeSelected,
  recipeDietaryAttributeUnselected,
  recipeTotalTimeSelected,
} from 'middlewares/tracking/snowplow/recipes/recipes'

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

  describe('recipeFiltersOpened', () => {
    test('should return an object with type RecipeFilters Open', () => {
      expect(recipeFiltersOpened()).toMatchObject({ type: 'RecipeFilters Opened' })
    })
  })

  describe('recipeFiltersClosed', () => {
    test('should return an object with type RecipeFilters Open', () => {
      expect(recipeFiltersClosed()).toMatchObject({ type: 'RecipeFilters Closed' })
    })
  })

  describe('recipeFiltersCleared', () => {
    test('should return an object with type RecipeFilters Cleared', () => {
      expect(recipeFiltersCleared()).toMatchObject({ type: 'RecipeFilters Cleared' })
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

  describe('recipeTypeSelected', () => {
    const action = {
      dietType: 'meat'
    }

    test('should return an object with type RecipeType Selected', () => {
      expect(recipeTypeSelected(action)).toMatchObject({ type: 'RecipeType Selected' })
    })

    test('should return a data object with recipe_type extracted from the action', () => {
      expect(recipeTypeSelected(action)).toMatchObject({
        data: {
          recipe_type: 'meat',
        },
      })
    })
  })

  describe('recipeTypeUnselected', () => {
    const action = {
      dietType: 'vegetarian'
    }

    test('should return an object with type RecipeType Unselected', () => {
      expect(recipeTypeUnselected(action)).toMatchObject({ type: 'RecipeType Unselected' })
    })

    test('should return a data object with recipe_type extracted from the action', () => {
      expect(recipeTypeUnselected(action)).toMatchObject({
        data: {
          recipe_type: 'vegetarian',
        },
      })
    })
  })

  describe('recipeDietaryAttributeSelected', () => {
    const action = {
      dietaryAttribute: 'gluten-free'
    }

    test('should return an object with type RecipeAttribute Selected', () => {
      expect(recipeDietaryAttributeSelected(action)).toMatchObject({ type: 'RecipeDietaryAttribute Selected' })
    })

    test('should return a data object with recipe_attribute extracted from the action', () => {
      expect(recipeDietaryAttributeSelected(action)).toMatchObject({
        data: {
          dietary_attribute: 'gluten-free',
        },
      })
    })
  })

  describe('recipeDietaryAttributeUnselected', () => {
    const action = {
      dietaryAttribute: 'gluten-free'
    }

    test('should return an object with type RecipeType Unselected', () => {
      expect(recipeDietaryAttributeUnselected(action)).toMatchObject({ type: 'RecipeDietaryAttribute Unselected' })
    })

    test('should return a data object with recipe_attribute extracted from the action', () => {
      expect(recipeDietaryAttributeUnselected(action)).toMatchObject({
        data: {
          dietary_attribute: 'gluten-free',
        },
      })
    })
  })

  describe('recipeTotalTimeSelected', () => {
    const action = {
      totalTime: '20',
    }

    test('should return an object with type RecipeCollection Select', () => {
      expect(recipeTotalTimeSelected(action)).toMatchObject({ type: 'RecipeTimeFrame Selected' })
    })

    test('should return an object with data extracted from the action', () => {
      expect(recipeTotalTimeSelected(action)).toMatchObject({
        data: {
          time_frame: '20',
        },
      })
    })
  })

  describe('recipeFiltersApplied', () => {
    const action = {
      collectionId: '5678',
      dietTypes: [
        'meat',
        'fish',
        'vegetarian',
      ],
      dietaryAttributes: [
        'gluten-free',
        'dairy-free',
      ],
      totalTime: '10'
    }

    test('should return an object with type RecipeCollection Select', () => {
      expect(recipeFiltersApplied(action)).toMatchObject({ type: 'RecipeFilters Applied' })
    })

    test('should return an object with data extracted from the action', () => {
      expect(recipeFiltersApplied(action)).toMatchObject({
        data: {
          collection_id: '5678',
          diet_types: [
            'meat',
            'fish',
            'vegetarian',
          ],
          dietary_attributes: [
            'gluten-free',
            'dairy-free',
          ],
          time_frame: '10',
        },
      })
    })
  })
})
