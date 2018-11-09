import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import tracking from 'reducers/tracking'

describe('tracking reducers', () => {
  const initialState = Immutable.Map({ asource: undefined })

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
      })
      const result = tracking.tracking(state, action)
      expect(Immutable.is(expected, result)).toEqual(true)
    })
  })
})
