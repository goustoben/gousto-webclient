import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

export const initialState = () => Immutable.Map({
})

const previousState = initialState()

export const filtersReducers = {
  filters: (state, action) => {
    if (!state) {
      return initialState()
    }

    switch (action.type) {
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
