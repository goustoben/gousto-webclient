import Immutable from 'immutable'
import loginActions, { helpPreLoginVisibilityChange } from 'actions/login'
import { loginReducers, initialState } from 'reducers/login'
import { getClientDomain } from 'utils/configFromWindow'

jest.mock('utils/configFromWindow')

describe('login reducer', () => {
  const STATE = initialState()
  const cases = [
    [true, true],
    [false, false],
  ]

  beforeEach(() => {
    jest.resetAllMocks()
    getClientDomain.mockReturnValue('gousto.local')
  })

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

      helpPreLoginVisibilityChange(visibility)(dispatch, getState)
      const dispatchCalls = dispatch.mock.calls
      const paramOfLastCallToDispatch = dispatchCalls[dispatchCalls.length - 1][0]
      const result = loginReducers.loginVisibility(STATE, paramOfLastCallToDispatch)
      expect(result).toEqual(Immutable.fromJS({ login: false, helpPreLogin: expectedStateValue}))
    })
  })
})
