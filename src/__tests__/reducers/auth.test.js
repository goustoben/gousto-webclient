import sinon from 'sinon'

import auth from 'reducers/auth'
import Immutable from 'immutable'

describe('auth reducer', () => {
  test('should handle initial state', () => {
    const state = undefined
    const action = {}
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
      isAdmin: false,
      rememberMe: false,
      email: '',
      id: '',
      name: '',
      roles: [],
      expiresAt: '',
    })
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const state = undefined
    const action = { type: 'something wrong' }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
      isAdmin: false,
      rememberMe: false,
      email: '',
      id: '',
      name: '',
      roles: [],
      expiresAt: '',
    })
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  describe('USER_IDENTIFIED action type', () => {
    test('should put the user details into the state', () => {
      const state = Immutable.fromJS({
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
        isAdmin: false,
        rememberMe: false,
        email: '',
        id: '',
        name: '',
        roles: [],
        expiresAt: '',
      })
      const action = {
        type: 'USER_IDENTIFIED',
        user: {
          id: '123-123-123-uuid',
          email: 'someone@gmail.com',
          name: 'someone random',
          roles: ['user'],
        },
      }
      const result = auth.auth(state, action)
      const expected = Immutable.fromJS({
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
        isAdmin: false,
        rememberMe: false,
        email: 'someone@gmail.com',
        id: '123-123-123-uuid',
        name: 'someone random',
        roles: ['user'],
        expiresAt: '',
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })
    test('should set isAdmin to true if the admin role is in the user', () => {
      const state = Immutable.fromJS({
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
        isAdmin: false,
        rememberMe: false,
        email: '',
        id: '',
        name: '',
        roles: [],
        expiresAt: '',
      })
      const action = {
        type: 'USER_IDENTIFIED',
        user: {
          id: '123-123-123-uuid',
          email: 'someone@gousto.com',
          name: 'gousto employee',
          roles: ['admin'],
        },
      }
      const result = auth.auth(state, action)
      const expected = Immutable.fromJS({
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
        isAdmin: true,
        rememberMe: false,
        email: 'someone@gousto.com',
        id: '123-123-123-uuid',
        name: 'gousto employee',
        roles: ['admin'],
        expiresAt: '',
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })
    test('should set isAdmin to true if the * role is in the user', () => {
      const state = Immutable.fromJS({
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
        isAdmin: false,
        rememberMe: false,
        email: '',
        id: '',
        name: '',
        roles: [],
        expiresAt: '',
      })
      const action = {
        type: 'USER_IDENTIFIED',
        user: {
          id: '123-123-123-uuid',
          email: 'timo@gousto.com',
          name: 'gousto employee',
          roles: ['*'],
        },
      }
      const result = auth.auth(state, action)
      const expected = Immutable.fromJS({
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
        isAdmin: true,
        rememberMe: false,
        email: 'timo@gousto.com',
        id: '123-123-123-uuid',
        name: 'gousto employee',
        roles: ['*'],
        expiresAt: '',
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('USER_AUTHENTICATED action', () => {
    test('should set the access token', () => {
      const state = Immutable.fromJS({
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
        isAdmin: false,
        rememberMe: false,
        email: '',
        id: '',
        name: '',
        roles: [],
        expiresAt: '',
      })
      const action = {
        type: 'USER_AUTHENTICATED',
        accessToken: 'access token',
        expiresAt: '2017-01-01',
      }
      const result = auth.auth(state, action)
      const expected = Immutable.fromJS({
        accessToken: 'access token',
        refreshToken: '',
        isAuthenticated: false,
        isAdmin: false,
        rememberMe: false,
        email: '',
        id: '',
        name: '',
        roles: [],
        expiresAt: '2017-01-01',
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })

    test('should set the refresh token too if present', () => {
      const state = Immutable.fromJS({
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
        isAdmin: false,
        rememberMe: false,
        email: '',
        id: '',
        name: '',
        roles: [],
        expiresAt: '',
      })
      const action = {
        type: 'USER_AUTHENTICATED',
        accessToken: 'access token',
        refreshToken: 'refresh token',
        expiresAt: '2017-01-01',
      }
      const result = auth.auth(state, action)
      const expected = Immutable.fromJS({
        accessToken: 'access token',
        refreshToken: 'refresh token',
        isAuthenticated: false,
        isAdmin: false,
        rememberMe: false,
        email: '',
        id: '',
        name: '',
        roles: [],
        expiresAt: '2017-01-01',
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  test('should handle the USER_REMEMBER_ME action', () => {
    const state = Immutable.fromJS({
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
      isAdmin: false,
      rememberMe: false,
      email: '',
      id: '',
      name: '',
      roles: [],
      expiresAt: '',
    })
    const action = {
      type: 'USER_REMEMBER_ME',
      rememberMe: true,
    }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
      isAdmin: false,
      rememberMe: true,
      email: '',
      id: '',
      name: '',
      roles: [],
      expiresAt: '',
    })
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  test('should handle the USER_LOGGED_IN action', () => {
    const state = Immutable.fromJS({
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
      isAdmin: false,
      rememberMe: false,
      email: '',
      id: '',
      name: '',
      roles: [],
      expiresAt: '',
    })
    const action = {
      type: 'USER_LOGGED_IN',
    }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      accessToken: '',
      refreshToken: '',
      isAuthenticated: true,
      isAdmin: false,
      rememberMe: false,
      email: '',
      id: '',
      name: '',
      roles: [],
      expiresAt: '',
    })
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  test('should reset with the USER_LOGGED_OUT action', () => {
    const state = Immutable.fromJS({
      accessToken: 'access',
      refreshToken: 'refresh',
      isAuthenticated: true,
      isAdmin: true,
      rememberMe: true,
      email: 'timo@gousto.com',
      id: '123-123-123-uuid',
      name: 'gousto employee',
      roles: ['admin'],
      expiresAt: '',
    })
    const action = {
      type: 'USER_LOGGED_OUT',
    }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
      isAdmin: false,
      rememberMe: false,
      email: '',
      id: '',
      name: '',
      roles: [],
      expiresAt: '',
    })
    expect(Immutable.is(result, expected)).toEqual(true)
  })
})
