import auth from 'reducers/auth'
import Immutable from 'immutable'

describe('auth reducer', () => {
  const initialState = {
    accessToken: '',
    hasRefreshCookie: false,
    isAuthenticated: false,
    isAdmin: false,
    rememberMe: false,
    email: '',
    id: '',
    name: '',
    roles: [],
    expiresAt: '',
    isRecaptchaEnabled: false,
    recaptcha: {
      signupToken: null,
    },
  }

  test('should handle initial state', () => {
    const state = undefined
    const action = {}
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS(initialState)
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const state = undefined
    const action = { type: 'something wrong' }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS(initialState)
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  describe('USER_IDENTIFIED action type', () => {
    test('should put the user details into the state', () => {
      const state = Immutable.fromJS(initialState)
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
        ...initialState,
        isAdmin: false,
        email: 'someone@gmail.com',
        id: '123-123-123-uuid',
        name: 'someone random',
        roles: ['user'],
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })
    test('should set isAdmin to true if the admin role is in the user', () => {
      const state = Immutable.fromJS(initialState)
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
        ...initialState,
        isAdmin: true,
        email: 'someone@gousto.com',
        id: '123-123-123-uuid',
        name: 'gousto employee',
        roles: ['admin'],
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })
    test('should set isAdmin to true if the * role is in the user', () => {
      const state = Immutable.fromJS(initialState)
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
        ...initialState,
        isAdmin: true,
        email: 'timo@gousto.com',
        id: '123-123-123-uuid',
        name: 'gousto employee',
        roles: ['*'],
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('USER_AUTHENTICATED action', () => {
    test('sets access token, expiresAt', () => {
      const state = Immutable.fromJS(initialState)
      const action = {
        type: 'USER_AUTHENTICATED',
        accessToken: 'access token',
        expiresAt: '2017-01-01',
        hasRefreshCookie: false,
      }
      const result = auth.auth(state, action)
      const expected = Immutable.fromJS({
        ...initialState,
        accessToken: 'access token',
        expiresAt: '2017-01-01',
        hasRefreshCookie: false,
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })

    test('can set hasRefreshCookie', () => {
      const state = Immutable.fromJS(initialState)
      const action = {
        type: 'USER_AUTHENTICATED',
        accessToken: 'access token',
        hasRefreshCookie: true,
        expiresAt: '2017-01-01',
      }
      const result = auth.auth(state, action)
      const expected = Immutable.fromJS({
        ...initialState,
        accessToken: 'access token',
        expiresAt: '2017-01-01',
        hasRefreshCookie: true,
      })
      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  test('should handle the USER_REMEMBER_ME action', () => {
    const state = Immutable.fromJS(initialState)
    const action = {
      type: 'USER_REMEMBER_ME',
      rememberMe: true,
    }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      ...initialState,
      rememberMe: true,
    })
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  test('should handle the USER_LOGGED_IN action', () => {
    const state = Immutable.fromJS(initialState)
    const action = {
      type: 'USER_LOGGED_IN',
    }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      ...initialState,
      isAuthenticated: true,
    })
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  test('should reset with the USER_LOGGED_OUT action', () => {
    const state = Immutable.fromJS({
      ...initialState,
      accessToken: 'access',
      hasRefreshCookie: true,
      isAuthenticated: true,
      isAdmin: true,
      rememberMe: true,
      email: 'timo@gousto.com',
      id: '123-123-123-uuid',
      name: 'gousto employee',
      roles: ['admin'],
    })
    const action = {
      type: 'USER_LOGGED_OUT',
    }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS(initialState)
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  test('should reset auth values with the USER_AUTH_FAILED action', () => {
    const state = Immutable.fromJS({
      ...initialState,
      accessToken: 'access',
      expiresAt: 'some-iso-date',
    })
    const action = {
      type: 'USER_AUTH_FAILED',
    }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      ...initialState,
      accessToken: '',
      expiresAt: ''
    })
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  test('should handle CHANGE_RECAPTCHA action', () => {
    const state = Immutable.fromJS(initialState)
    const action = {
      type: 'CHANGE_RECAPTCHA',
      isRecaptchaEnabled: true
    }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      ...initialState,
      isRecaptchaEnabled: true,
    })
    expect(Immutable.is(result, expected)).toEqual(true)
  })

  test('should handle STORE_SIGNUP_RECAPTCHA_TOKEN action', () => {
    const state = Immutable.fromJS(initialState)
    const action = {
      type: 'STORE_SIGNUP_RECAPTCHA_TOKEN',
      token: 'token-sign-up-recaptcha'
    }
    const result = auth.auth(state, action)
    const expected = Immutable.fromJS({
      ...initialState,
      recaptcha: {
        signupToken: 'token-sign-up-recaptcha',
      }
    })

    expect(Immutable.is(result, expected)).toEqual(true)
  })
})
