import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

const initialState = Immutable.Map({
  asource: undefined,
  utmSource: undefined,
  awc: '',
  tapjoyTransactionId: '',
  tapjoyPublisherId: '',
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

    default: {
      return state
    }
    }
  },
}
