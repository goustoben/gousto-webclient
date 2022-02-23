import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

const initialState = Immutable.fromJS({
  asource: undefined,
  utmSource: undefined,
  awc: '',
  tapjoy: '',
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

    case actionTypes.SET_TAPJOY_TRANSACTION_ID: {
      return state.set('tapjoy', action.transactionId)
    }

    default: {
      return state
    }
    }
  },
}
