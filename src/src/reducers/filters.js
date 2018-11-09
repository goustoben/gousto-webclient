import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'

export const initialState = () => Immutable.Map({
  currentCollectionId: '',
  totalTime: '0',
  dietTypes: Immutable.Set([]),
  dietaryAttributes: Immutable.Set([]),
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

    case actionTypes.FILTERS_DIET_TYPES_CHANGE: {
      return state.set('dietTypes', action.dietTypes)
    }

    case actionTypes.FILTERS_DIETARY_ATTRIBUTES_CHANGE: {
      return state.set('dietaryAttributes', action.dietaryAttributes)
    }

    case actionTypes.FILTERS_TOTAL_TIME_CHANGE: {
      return state.set('totalTime', action.totalTime)
    }

    case actionTypes.FILTERS_CLEAR_ALL: {
      const newState = initialState()

      return newState.set('currentCollectionId', action.collectionId)
    }

    case actionTypes.MENU_FILTERS_VISIBILITY_CHANGE: {
      if (action.visible) {
        previousState = state
      }

      return state
    }

    case actionTypes.FILTERS_RESET: {
      return previousState
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
