import Immutable from 'immutable'
import actionTypes from '../actions/actionTypes'

const abandonBasket = {
  abandonBasket: (state = initialState, { type, value }) => {
    switch (type) {
    case actionTypes.SET_FIRST_LOAD_OF_SESSION: {
      return state.set('isNotFirstLoadOfSession', value)
    }

    default:
      return state
    }
  }
}

export const initialState = Immutable.Map({
  isNotFirstLoadOfSession: false
})

export { abandonBasket }
