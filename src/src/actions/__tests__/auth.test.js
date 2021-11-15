import actions from 'actions/auth'
import Immutable from 'immutable'
import { redirect, documentLocation } from 'utils/window'
import logger from 'utils/logger'
import { authChangeRecaptcha } from "actions/auth/authChangeRecaptcha"
import { trackUserLogin } from "actions/loggingmanager/trackUserLogin"
import { identifyUserUsingOAuth } from "apis/auth/identifyUserUsingOAuth"
import { resetUserPassword } from "apis/auth/resetUserPassword"
import { fetchFeatures } from "apis/fetchS3/fetchFeatures"

jest.mock('apis/auth')

jest.mock('utils/window')

jest.mock('apis/fetchS3', () => ({
  fetchFeatures: jest.fn()
}))

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

jest.mock('moment', () => {
  const momentMethods = {
    add: jest.fn(() => ({
      toISOString: jest.fn().mockReturnValue('2020-03-10')
    })),
  }

  return jest.fn(() => momentMethods)
})

jest.mock('actions/loggingmanager', () => ({
  trackUserLogin: jest.fn()
}))

describe('redirectLoggedInUser', () => {
  let getState

  beforeEach(() => {
    redirect.mockReturnValue(jest.fn())
    documentLocation.mockReturnValue({ pathname: '/' })
  })

  afterEach(() => {
    redirect.mockClear()
  })

  test('should NOT redirect if neither feature is set to true', async () => {
    getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      features: Immutable.Map({
        goToMyGousto: Immutable.fromJS({
          value: false
        }),
        goToMyDeliveries: Immutable.fromJS({
          value: false
        })
      }),
    })

    await actions.redirectLoggedInUser()(null, getState)

    expect(redirect).not.toHaveBeenCalled()
  })

  test('should NOT redirect to my deliveries if feature is set to true and NOT on homepage', async () => {
    documentLocation.mockReturnValue({ pathname: '/menu' })

    getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      features: Immutable.Map({
        goToMyGousto: Immutable.fromJS({
          value: false
        }),
        goToMyDeliveries: Immutable.fromJS({
          value: true
        })
      }),
    })

    await actions.redirectLoggedInUser()(null, getState)

    expect(redirect).not.toHaveBeenCalled()
  })

  test('should redirect to my gousto if feature is set to true', async () => {
    getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      features: Immutable.Map({
        goToMyGousto: Immutable.fromJS({
          value: true
        }),
        goToMyDeliveries: Immutable.fromJS({
          value: false
        })
      }),
    })

    await actions.redirectLoggedInUser()(null, getState)

    expect(redirect).toHaveBeenCalledWith('/my-gousto')
  })

  test('should redirect to my deliveries if feature is set to true', async () => {
    getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      features: Immutable.Map({
        goToMyGousto: Immutable.fromJS({
          value: false
        }),
        goToMyDeliveries: Immutable.fromJS({
          value: true
        })
      }),
    })

    await actions.redirectLoggedInUser()(null, getState)

    expect(redirect).toHaveBeenCalledWith('/my-deliveries')
  })
})

describe('changeRecaptcha', () => {
  let dispatch
  describe('when isRecaptchaEnabled is false', () => {
    beforeEach(() => {
      dispatch = jest.fn()
      fetchFeatures.mockReturnValue({ data: { isRecaptchaEnabled: false }})
    })
    test('should dispatch CHANGE_RECAPTCHA false ', async () => {
      await authChangeRecaptcha()(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CHANGE_RECAPTCHA',
        isRecaptchaEnabled: false
      })
    })
  })

  describe('when isRecaptchaEnabled is true', () => {
    beforeEach(() => {
      dispatch = jest.fn()
      fetchFeatures.mockReturnValue({ data: { isRecaptchaEnabled: true }})
    })
    test('should dispatch CHANGE_RECAPTCHA true ', async () => {
      await authChangeRecaptcha()(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CHANGE_RECAPTCHA',
        isRecaptchaEnabled: true
      })
    })
  })

  describe('when data is null', () => {
    beforeEach(() => {
      dispatch = jest.fn()
      fetchFeatures.mockReturnValue({ data: null})
    })
    test('should not dispatch', async () => {
      await authChangeRecaptcha()(dispatch)
      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when fetch fails', () => {
    let loggerErrorSpy
    beforeEach(() => {
      dispatch = jest.fn()
      fetchFeatures.mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error('error message!')))
      )
      loggerErrorSpy = jest.spyOn(logger, 'error')
    })

    test('should call logger.error', async () => {
      await authChangeRecaptcha()(dispatch)
      expect(loggerErrorSpy).toHaveBeenCalledWith({ message: 'S3File fetch failed' })
    })
  })
})

describe('resetPassword', () => {
  let dispatch

  describe('when resetUserPassword response is successfull', () => {
    beforeEach(() => {
      dispatch = jest.fn()
      resetUserPassword.mockResolvedValue({ data: { email: 'email-test' } })
      actions.authResetPassword()(dispatch)
    })

    test('redirects to my-deliveries', () => {
      expect(redirect).toHaveBeenCalledWith('/my-deliveries')
    })

    test('set pending to false', () => {
      const callsLength = dispatch.mock.calls.length - 1

      expect(dispatch.mock.calls[callsLength][0]).toEqual(
        { type: 'PENDING', key: 'AUTH_PASSWORD_RESET', value: false }
      )
    })
  })

  describe('when resetUserPassword response errors', () => {
    const ERRORS = [
      {
        error: 'error.key',
        message: 'error message'
      },
      {
        error: 'error.key.2',
        message: 'error message 2',
      }
    ]
    beforeEach(() => {
      dispatch = jest.fn()
      resetUserPassword.mockRejectedValue({ errors: ERRORS })
      actions.authResetPassword()(dispatch)
    })

    test('error is dispatched', () => {
      const callBeforeSettingToPending = dispatch.mock.calls.length - 2

      expect(dispatch.mock.calls[callBeforeSettingToPending][0]).toEqual(
        { type: 'ERROR', key: 'AUTH_PASSWORD_RESET', value: ERRORS }
      )
    })

    test('set pending to false', () => {
      const lastCallMade = dispatch.mock.calls.length - 1

      expect(dispatch.mock.calls[lastCallMade][0]).toEqual(
        { type: 'PENDING', key: 'AUTH_PASSWORD_RESET', value: false }
      )
    })
  })
})

describe('validate', () => {
  describe('when refreshToken is set', () => {
    let dispatch
    let getState

    beforeEach(() => {
      dispatch = jest.fn()
      getState = () => ({
        auth: Immutable.Map({
          accessToken: 'test-access-token',
        }),
      })
      actions.authValidate(null, 'test-authRefresh-token', '2018-04-10T12:00:00Z')(dispatch, getState)
    })

    test('authRefresh and authIdentify actions are dispatched', () => {
      expect(dispatch).toHaveBeenCalledTimes(2)
    })
  })
})

describe('authIdentify', () => {
  describe('when authIdentify is called', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()
      // eslint-disable-next-line no-global-assign
      __SERVER__ = true
      identifyUserUsingOAuth.mockResolvedValue({ data: { roles: ['user'] }})
      actions.authIdentify('test-access-token')(dispatch)
    })

    test('userIdentified, trackUserLogin and authUserLoggedIn actions are dispatched', () => {
      expect(dispatch).toHaveBeenCalledWith({type: 'USER_LOGGED_IN'})
      expect(dispatch).toHaveBeenCalledWith({
        type: 'USER_IDENTIFIED',
        user: {
          roles: [
            'user',
          ],
        },
      })
      expect(trackUserLogin).toHaveBeenCalledTimes(1)
    })
  })
})
