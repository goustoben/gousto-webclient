import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

const initialState = Immutable.fromJS({
  asource: undefined,
  utmSource: undefined,
  awc: '',
})

export const trackingReducers = {
  tracking: (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.AFFILIATE_SOURCE_SET: {
      return state.set('asource', action.asource)
    }

    case actionTypes.SET_UTM_SOURCE: {
      return state.set('utmSource', action.payload)
    }

    case actionTypes.AWIN_CLICK_CHECKSUM_SET: {
      return state.set('awc', action.awc)
    }

    default: {
      return state
    }
    }
  },
}
