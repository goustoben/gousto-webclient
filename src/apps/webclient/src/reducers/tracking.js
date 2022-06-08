import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

export const initialState = Immutable.Map({
  asource: undefined,
  utmSource: undefined,
  awc: '',
  tapjoyTransactionId: '',
  tapjoyPublisherId: '',
  roktTrackingId: '',
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

    case actionTypes.SET_TAPJOY_DATA: {
      return state.merge({
        tapjoyTransactionId: action.transactionId,
        tapjoyPublisherId: action.publisherId,
      })
    }

    case actionTypes.SET_ROKT_DATA: {
      return state.merge({
        roktTrackingId: action.roktTrackingId,
      })
    }

    default: {
      return state
    }
    }
  },
}
