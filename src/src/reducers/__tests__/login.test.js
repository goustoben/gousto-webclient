import Immutable from 'immutable'
import loginActions from 'actions/login'
import login, { initialState } from 'reducers/login'
import { helpPreLoginVisibilityChange } from "actions/login/helpPreLoginVisibilityChange"

describe('login reducer', () => {
  const STATE = initialState()
  const cases = [
    [true, true],
    [false, false],
  ]

  describe('given the reducer is called with the initial state and loginVisibilityChange action generator', () => {
    test.each(cases)('when the visibility is %s the new state.login is %s', (visibility, expectedStateValue) => {
      const result = login.loginVisibility(STATE, loginActions.loginVisibilityChange(visibility))
      expect(result).toEqual(Immutable.fromJS({ login: expectedStateValue, helpPreLogin: false }))
    })
  })

  describe('given the reducer is called with the initial state and helpPreLoginVisibilityChange action generator', () => {
    test.each(cases)('when the visibility is %s the new state.helpPreLogin is %s', (visibility, expectedStateValue) => {
      const dispatch = jest.fn()
      const getState = jest.fn()

      helpPreLoginVisibilityChange(visibility)(dispatch, getState)
      const dispatchCalls = dispatch.mock.calls
      const paramOfLastCallToDispatch = dispatchCalls[dispatchCalls.length - 1][0]
      const result = login.loginVisibility(STATE, paramOfLastCallToDispatch)
      expect(result).toEqual(Immutable.fromJS({ login: false, helpPreLogin: expectedStateValue}))
    })
  })
})
