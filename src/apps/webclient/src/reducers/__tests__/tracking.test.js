import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import { trackingReducers } from 'reducers/tracking'

describe('tracking reducers', () => {
  const initialState = Immutable.Map({
    asource: undefined,
    utmSource: undefined,
    awc: '',
    tapjoyTransactionId: '',
    tapjoyPublisherId: '',
  })

  describe('tracking', () => {
    test('should handle initial state', () => {
      const state = undefined
      const action = {}

      const result = trackingReducers.tracking(state, action)

      expect(Immutable.is(initialState, result)).toEqual(true)
    })

    test('should handle unknown actions', () => {
      const state = undefined
      const action = { type: 'unknown' }

      const result = trackingReducers.tracking(state, action)

      expect(Immutable.is(initialState, result)).toEqual(true)
    })

    test('should handle AFFILIATE_SOURCE_SET action types', () => {
      const state = undefined
      const action = {
        type: actionTypes.AFFILIATE_SOURCE_SET,
        asource: 'something',
      }
      const expected = Immutable.Map({
        asource: 'something',
        utmSource: undefined,
        awc: '',
        tapjoyTransactionId: '',
        tapjoyPublisherId: '',
      })

      const result = trackingReducers.tracking(state, action)

      expect(Immutable.is(expected, result)).toEqual(true)
    })

    test('should handle SET_UTM_SOURCE action types', () => {
      const state = undefined
      const action = {
        type: actionTypes.SET_UTM_SOURCE,
        payload: 'google.com',
      }
      const expected = Immutable.Map({
        asource: undefined,
        utmSource: 'google.com',
        awc: '',
        tapjoyTransactionId: '',
        tapjoyPublisherId: '',
      })

      const result = trackingReducers.tracking(state, action)

      expect(Immutable.is(expected, result)).toEqual(true)
    })

    test('should handle AWIN_CLICK_CHECKSUM_SET action types', () => {
      const state = undefined
      const action = {
        type: actionTypes.AWIN_CLICK_CHECKSUM_SET,
        awc: '5070-awin-click-checksum',
      }
      const expected = Immutable.Map({
        asource: undefined,
        utmSource: undefined,
        awc: '5070-awin-click-checksum',
        tapjoyTransactionId: '',
        tapjoyPublisherId: '',
      })

      const result = trackingReducers.tracking(state, action)

      expect(Immutable.is(expected, result)).toEqual(true)
    })

    test('should handle SET_TAPJOY_DATA action types', () => {
      const state = undefined
      const action = {
        type: actionTypes.SET_TAPJOY_DATA,
        transactionId: 'fake_transaction_id',
        publisherId: 'fake_publisher_id',
      }
      const expected = Immutable.Map({
        asource: undefined,
        utmSource: undefined,
        awc: '',
        tapjoyTransactionId: 'fake_transaction_id',
        tapjoyPublisherId: 'fake_publisher_id',
      })

      const result = trackingReducers.tracking(state, action)

      expect(Immutable.is(expected, result)).toEqual(true)
    })
  })
})
