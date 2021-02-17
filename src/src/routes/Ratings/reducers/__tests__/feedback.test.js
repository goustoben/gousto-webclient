import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import { feedback } from '../feedback'

describe('feedback reducer', () => {
  describe('when case is default', () => {
    test('should return default prop of the state', () => {
      const state = Immutable.Map({ feedbackCount: 0 })
      const result = feedback.feedback(state, {})
      const expected = Immutable.Map({ feedbackCount: 0 })

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('when case is actionTypes.FEEDBACK_COUNT_RECEIVED', () => {
    test('should set the feedbackCount prop of the state', () => {
      const state = Immutable.Map({})

      const result = feedback.feedback(state, {
        type: actionTypes.FEEDBACK_COUNT_RECEIVED,
        feedbackCount: 2,
      })
      const expected = Immutable.Map({ feedbackCount: 2 })

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })
})
