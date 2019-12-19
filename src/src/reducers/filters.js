import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'

export const initialState = () => Immutable.Map({
  currentCollectionId: '',
  recipeGroup: null,
})

let previousState = initialState()

const filters = {
  filters: (state, action) => {
    if (!state) {
      return initialState()
    }

    switch (action.type) {
    case actionTypes.FILTERS_COLLECTION_CHANGE: {
      return state.set('currentCollectionId', action.collectionId)
    }
    
    case actionTypes.FILTERS_FOOD_BRAND_CHANGE: {
      return state.set('recipeGroup', action.foodBrand)
    }

    case actionTypes.FILTERS_THEMATIC_CHANGE: {
      return state.set('recipeGroup', action.thematic)
    }

    case actionTypes.FILTERS_RESET: {
      return previousState
    }

    case actionTypes.FILTERS_PRODUCT_CATEGORY: {
      return state.set('selectedCategory', action.value)
    }

    case actionTypes.USER_LOGGED_OUT:
      return initialState()
    default: {
      return state
    }
    }
  },
}

export default filters
