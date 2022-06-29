import { createStore, combineReducers } from 'redux'

import { setAuthToken } from '@library/auth'

import { actionTypes } from 'actions/actionTypes'
import { subscribeState } from 'utils/subscribeState'

import auth, { initialState as initialAuth } from '../../reducers/auth'

jest.mock('@library/auth', () => ({
  setAuthToken: jest.fn(),
}))

describe('redux state subscriber', () => {
  const initialState = {
    auth: initialAuth(),
  }

  const store = createStore(combineReducers(auth), initialState)

  beforeEach(() => {
    jest.clearAllMocks()
    subscribeState(store)
  })

  describe('auth syncing', () => {
    it('defaults to null', () => {
      expect(setAuthToken).toHaveBeenCalledWith(null)
    })

    it('when user identified, syncs access token', () => {
      store.dispatch({
        type: actionTypes.USER_AUTHENTICATED,
        accessToken: 'freshToken',
      })
      expect(setAuthToken).toHaveBeenCalledWith('freshToken')
    })

    it('ignores unrelated events', () => {
      for (let i = 0; i < 2; i++) {
        store.dispatch({
          type: 'UNRELATED',
        })
      }
      expect(setAuthToken).toHaveBeenCalledTimes(1)
    })

    it('when user auth fails, syncs null token', () => {
      store.dispatch({
        type: actionTypes.USER_AUTH_FAILED,
      })
      expect(setAuthToken).toHaveBeenCalledWith(null)
    })

    it('when user logs out, syncs null token', () => {
      store.dispatch({
        type: actionTypes.USER_LOGGED_OUT,
      })
      expect(setAuthToken).toHaveBeenCalledWith(null)
    })
  })
})
