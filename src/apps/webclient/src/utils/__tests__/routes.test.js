import Immutable from 'immutable'
import authActions from 'actions/auth'
import { checkValidSession, addTargetToRedirect, checkGuest } from '../routes'

jest.mock('actions/auth', () => ({
  authValidate: jest.fn(),
}))

describe('routes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('checkValidSession', () => {
    const next = jest.fn()
    const replace = jest.fn()
    const location = {
      pathname: '/somewhere',
    }

    describe('when isAuthenticated is true', () => {
      beforeEach(() => {
        const store = {
          getState: () => ({
            auth: Immutable.Map({
              isAuthenticated: true,
            })
          })
        }

        checkValidSession(store)({location}, replace, next)
      })

      test('then next should be called', () => {
        expect(next).toHaveBeenCalled()
      })

      test('then replace should NOT be called', () => {
        expect(replace).not.toHaveBeenCalled()
      })
    })

    describe('when isAuthenticated is false', () => {
      beforeEach(() => {
        const store = {
          getState: () => ({
            auth: Immutable.Map({
              isAuthenticated: false,
              accessToken: '',
              refreshToken: '',
              expiresAt: ''
            })
          })
        }

        checkValidSession(store)({location}, replace, next)
      })

      describe('and access token exists', () => {
        describe('and the token is valid', () => {
          beforeEach(() => {
            const store = {
              getState: () => ({
                auth: Immutable.Map({
                  isAuthenticated: false,
                  accessToken: 'accessToken',
                  refreshToken: '',
                  expiresAt: ''
                })
              })
            }

            checkValidSession(store)({location}, replace, next)
          })

          test('then auth validate should be called with correct parameters', () => {
            expect(authActions.authValidate).toHaveBeenCalledWith('accessToken', '', '')
          })

          test('then next should be called', () => {
            expect(next).toHaveBeenCalled()
          })
        })

        describe('and the token is invalid', () => {
          beforeEach(() => {
            const store = {
              getState: () => ({
                auth: Immutable.Map({
                  isAuthenticated: false,
                  accessToken: 'accessToken',
                  refreshToken: '',
                  expiresAt: ''
                })
              })
            }
            authActions.authValidate.mockImplementation(() => {
              throw new Error()
            })
            checkValidSession(store)({location}, replace, next)
          })

          test('then auth validate should be called with correct parameters', () => {
            expect(authActions.authValidate).toHaveBeenCalledWith('accessToken', '', '')
          })

          test('then replace should be called', () => {
            expect(replace).toHaveBeenCalled()
          })
        })
      })
    })
  })

  describe('addTargetToRedirect', () => {
    let url
    const buildRedirectUrl = (location) => {
      delete global.window.location
      global.window = Object.create(window)
      global.window.location = {}

      return addTargetToRedirect({target: true, location})
    }

    describe('when target exists', () => {
      beforeEach(() => {
        url = buildRedirectUrl({
          pathname: '/somewhere',
        })
      })

      test('then the returned url should contain the target correctly encoded', () => {
        expect(url).toContain('?target=%2Fsomewhere')
      })

      test('then the returned url should contain the login hash', () => {
        expect(url).toContain('#login')
      })

      describe('and when target has query parameters', () => {
        beforeEach(() => {
          url = buildRedirectUrl({
            pathname: '/somewhere',
            search: '?test=promo-code'
          })
        })

        test('then thequery parameters are added to the URL', () => {
          expect(url).toEqual(`/?target=${encodeURIComponent('/somewhere?test=promo-code')}#login`)
        })
      })
    })

    describe("when target doesn't exist", () => {
      beforeEach(() => {
        url = addTargetToRedirect({target: false, redirectUrl: '/menu'})
      })

      test('should return the redirectUrl passed in as a parameter', () => {
        expect(url).toEqual('/menu')
      })

      describe('and no redirectURL is passed in ', () => {
        beforeEach(() => {
          url = addTargetToRedirect({target: false})
        })

        test('then "/" is returned', () => {
          expect(url).toEqual('/')
        })
      })
    })
  })

  describe('checkGuest', () => {
    let store = {}
    const next = jest.fn()
    const replace = jest.fn()
    const redirectUrl = '/redirectUrl'

    describe('when isAuthenticated is true', () => {
      beforeEach(() => {
        store = {
          getState: () => ({
            auth: Immutable.Map({
              isAuthenticated: true,
            })
          })
        }
        checkGuest(store, redirectUrl)(null, replace, next)
      })

      test('then replace should be called with proper redirectUrl', () => {
        expect(replace).toHaveBeenCalledWith(redirectUrl)
      })
    })
  })
})
