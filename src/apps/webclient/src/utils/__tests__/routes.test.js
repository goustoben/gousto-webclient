import Immutable from 'immutable'
import authActions from 'actions/auth'
import { canUseWindow } from 'utils/browserEnvironment'
import { checkValidSession, addTargetToRedirect, checkGuest } from '../routes'

jest.mock('actions/auth', () => ({
  authValidate: jest.fn(),
}))

jest.mock('utils/browserEnvironment')

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
              hasRefreshCookie: false,
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
                  hasRefreshCookie: false,
                  expiresAt: ''
                })
              })
            }

            checkValidSession(store)({location}, replace, next)
          })

          test('then auth validate should be called with correct parameters', () => {
            expect(authActions.authValidate).toHaveBeenCalledWith('accessToken', false, '')
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
                  hasRefreshCookie: false,
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
            expect(authActions.authValidate).toHaveBeenCalledWith('accessToken', false, '')
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
      global.window.location = {
        origin: 'https://www.gousto.co.uk'
      }

      return addTargetToRedirect({target: true, location})
    }

    describe('when target exists', () => {
      beforeEach(() => {
        url = buildRedirectUrl({
          pathname: '/somewhere',
        })
      })

      describe('and the window is available', () => {
        beforeEach(() => {
          canUseWindow.mockReturnValue(true)
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

          test('then the query parameters are added to the URL', () => {
            // This is a bug that we're currently getting away with
            expect(url).toEqual(`/?target=${encodeURIComponent('https://www.gousto.co.uk//somewhere?test=promo-code')}#login`)
          })
        })
      })

      describe('and the window object is not available', () => {
        beforeEach(() => {
          canUseWindow.mockReturnValue(false)

          url = buildRedirectUrl({
            pathname: '/somewhere',
          })
        })

        test('should return the expected url with target and login hash', () => {
          expect(url).toEqual('/?target=%2Fsomewhere#login')
        })

        describe('and when the target has query parameters', () => {
          beforeEach(() => {
            url = buildRedirectUrl({
              pathname: '/somewhere',
              search: '?test=promo-code'
            })
          })

          test('then the query parameters are added to the URL', () => {
            expect(url).toEqual('/?target=%2Fsomewhere%3Ftest%3Dpromo-code#login')
          })
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
