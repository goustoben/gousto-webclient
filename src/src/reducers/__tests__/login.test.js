import Immutable from 'immutable'
import * as loginActions from 'actions/login'
import { loginReducers, initialState } from 'reducers/login'

describe('login reducer', () => {
  const STATE = initialState()
  const cases = [
    [true, true],
    [false, false],
  ]

  describe('given the reducer is called with the initial state and loginVisibilityChange action generator', () => {
    test.each(cases)('when the visibility is %s the new state.login is %s', (visibility, expectedStateValue) => {
      const result = loginReducers.loginVisibility(STATE, loginActions.loginVisibilityChange(visibility))
      expect(result).toEqual(Immutable.fromJS({ login: expectedStateValue, helpPreLogin: false }))
    })
  })

  describe('given the reducer is called with the initial state and helpPreLoginVisibilityChange action generator', () => {
    test.each(cases)('when the visibility is %s the new state.helpPreLogin is %s', (visibility, expectedStateValue) => {
      const dispatch = jest.fn()
      const getState = jest.fn()

      loginActions.helpPreLoginVisibilityChange(visibility)(dispatch, getState)
      const dispatchCalls = dispatch.mock.calls
      const paramOfLastCallToDispatch = dispatchCalls[dispatchCalls.length - 1][0]
      const result = loginReducers.loginVisibility(STATE, paramOfLastCallToDispatch)
      expect(result).toEqual(Immutable.fromJS({ login: false, helpPreLogin: expectedStateValue}))
    })
  })
})
