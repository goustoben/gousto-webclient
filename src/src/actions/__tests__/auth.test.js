import actions, { changeRecaptcha, authenticateClient } from 'actions/auth'
import { fetchFeatures } from 'apis/fetchS3'
import Immutable from 'immutable'

import { redirect, documentLocation } from 'utils/window'
import logger from 'utils/logger'
import { clientServerAuthenticate } from 'apis/auth'

jest.mock('utils/window')

jest.mock('apis/fetchS3', () => ({
  fetchFeatures: jest.fn()
}))

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

jest.mock('apis/auth', () => ({
  clientServerAuthenticate: jest.fn().mockReturnValue({
    data: {
      data: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: '123456789',
      }
    }
  })
}))

jest.mock('moment', () => {
  const momentMethods = {
    add: jest.fn(() => ({
      toISOString: jest.fn().mockReturnValue('2020-03-10')
    })),
  }

  return jest.fn(() => momentMethods)
})

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
      await changeRecaptcha()(dispatch)
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
      await changeRecaptcha()(dispatch)
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
      await changeRecaptcha()(dispatch)
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
      await changeRecaptcha()(dispatch)
      expect(loggerErrorSpy).toHaveBeenCalledWith({ message: 'S3File fetch failed' })
    })
  })
})

describe('authenticateClient', () => {
  let dispatch

  describe('when client authentication is requested', () => {
    beforeEach(async () => {
      dispatch = jest.fn()
      await authenticateClient()(dispatch)
    })

    test('then clientServerAuthenticate should be called', async () => {
      expect(clientServerAuthenticate).toHaveBeenCalled()
    })

    test('then clientAuthenticated should be called with the correct params', async () => {
      expect(dispatch).toHaveBeenCalledWith({
        accessToken: 'mock-access-token',
        expiresAt: '2020-03-10',
        refreshToken: 'mock-refresh-token',
        type: 'CLIENT_AUTHENTICATED',
      })
    })
  })
})
