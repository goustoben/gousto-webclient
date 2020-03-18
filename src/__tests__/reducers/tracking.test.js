import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import tracking from 'reducers/tracking'

describe('tracking reducers', () => {
  const initialState = Immutable.Map({
    asource: undefined,
    utmSource: undefined
  })

  describe('tracking', () => {
    test('should handle initial state', () => {
      const state = undefined
      const action = {}
      const result = tracking.tracking(state, action)
      expect(Immutable.is(initialState, result)).toEqual(true)
    })

    test('should handle unknown actions', () => {
      const state = undefined
      const action = { type: 'unknown' }
      const result = tracking.tracking(state, action)
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
        utmSource: undefined
      })
      const result = tracking.tracking(state, action)
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
        utmSource: 'google.com'
      })
      const result = tracking.tracking(state, action)
      expect(Immutable.is(expected, result)).toEqual(true)
    })
  })
})
