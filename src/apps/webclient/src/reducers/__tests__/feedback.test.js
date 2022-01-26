import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import { feedback, initialState } from '../feedback'

describe('feedback reducer', () => {
  test('initial state', () => {
    expect(Immutable.is(feedback.feedback(undefined, {}), initialState)).toEqual(true)
  })

  describe('when case is default', () => {
    test('should return default prop of the state', () => {
      const result = feedback.feedback(initialState, {})

      expect(result.get('feedbackCount')).toEqual(0)
    })
  })

  describe('when case is actionTypes.FEEDBACK_COUNT_RECEIVED', () => {
    test('should return correct feedback count', () => {
      const result = feedback.feedback(initialState, {
        type: actionTypes.FEEDBACK_COUNT_RECEIVED,
        payload: 2,
      })

      expect(result.get('feedbackCount')).toEqual(2)
    })
  })
})
