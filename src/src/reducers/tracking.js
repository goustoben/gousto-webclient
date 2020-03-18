import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

const initialState = Immutable.fromJS({
  asource: undefined,
  utmSource: undefined
})

const tracking = {
  tracking: (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.AFFILIATE_SOURCE_SET: {
      return state.set('asource', action.asource)
    }

    case actionTypes.SET_UTM_SOURCE: {
      return state.set('utmSource', action.payload)
    }

    default: {
      return state
    }
    }
  },
}

export default tracking
