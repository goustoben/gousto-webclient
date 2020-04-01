import Immutable from 'immutable'
import loginActions, { helpPreLoginVisibilityChange } from 'actions/login'
import login, { initialState } from 'reducers/login'

describe('login reducer', () => {
  const STATE = initialState()
  const cases = [
    [true, true],
    [false, false],
  ]
  let result

  describe('given the reducer is called with the initial state and loginVisibilityChange action generator', () => {
    test.each(cases)('when the visibility is %s the new state.login is %s', (visibility, expectedStateValue) => {
      result = login.loginVisibility(STATE, loginActions.loginVisibilityChange(visibility))
      expect(result).toEqual(Immutable.fromJS({ login: expectedStateValue, helpPreLogin: false }))
    })
  })

  describe('given the reducer is called with the initial state and helpPreLoginVisibilityChange action generator', () => {
    test.each(cases)('when the visibility is %s the new state.helpPreLogin is %s', (visibility, expectedStateValue) => {
      result = login.loginVisibility(STATE, helpPreLoginVisibilityChange(visibility))
      expect(result).toEqual(Immutable.fromJS({ login: false, helpPreLogin: expectedStateValue}))
    })
  })
})
