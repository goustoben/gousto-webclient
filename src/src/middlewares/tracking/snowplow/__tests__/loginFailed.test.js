import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import loginFailed from '../global/loginFailed'

describe('loginFailed', () => {
  test('should return the correct action', () => {
    const state = {
      error: Immutable.fromJS({
        [actionTypes.USER_LOGIN]: 'test error reason'
      })
    }
    const action = {
      type: 'TEST_ACTION_TYPE'
    }

    const result = loginFailed(action, state)
    expect(result).toEqual({
      type: 'TEST_ACTION_TYPE',
      data: {
        reason: 'test error reason'
      }
    })
  })
})
