import Immutable from 'immutable'
import actionTypes from '../actions/actionTypes'

const abandonBasket = {
  abandonBasket: (state = initialState, { type, value }) => {
    switch (type) {
    case actionTypes.SET_FIRST_LOAD_OF_SESSION: {
      return state.set('isFirstLoadOfSession', value)
    }

    default:
      return state
    }
  }
}

export const initialState = Immutable.Map({
  isFirstLoadOfSession: false
})

export { abandonBasket }
