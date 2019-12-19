import Immutable from 'immutable'
import actionTypes from '../actions/actionTypes'

export const initialState = Immutable.fromJS({
  isDismissed: false,
})

const appBanner = {
  appBanner: (state = initialState, { type }) => {
    switch (type) {
    case actionTypes.APP_BANNER_DISMISSED: {
      return state.set('isDismissed', true)
    }

    default:
      return state
    }
  },
}

export { appBanner }
