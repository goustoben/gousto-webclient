import { Map } from 'immutable'
import * as cookieHelper from 'utils/cookieHelper2'
import Cookies from 'cookies-js'
import { canUseWindow } from 'utils/browserEnvironment'
import {
  getSnowplowDomainUserId,
  isOptimizelyFeatureEnabledFactory,
} from './optimizelyUtils'
import * as snowplow from './trackExperimentInSnowplow'
import * as optimizelySdk from './optimizelySDK'
import { mockSnowplowCallbackAPI } from './mockSnowplowCallbackAPI'

jest.mock('utils/browserEnvironment')

let win

describe('getSnowplowDomainUserId', () => {
  beforeAll(() => {
    win = global.window
  })

  afterAll(() => {
    global.window = win
  })

  describe('when window is not available', () => {
    beforeEach(() => {
      canUseWindow.mockReturnValue(false)
    })

    test('resolves null', async () => {
      expect(getSnowplowDomainUserId()).resolves.toEqual(null)
    })
  })

  describe('when window.snowplow is not available', () => {
    beforeEach(() => {
      global.window = {}
    })

    test('resolves null', async () => {
      const result = await getSnowplowDomainUserId()
      expect(result).toEqual(null)
    })
  })

  describe('when window and window.snowplow exist', () => {
    beforeEach(() => {
      global.window = {
        snowplow: () => {}
      }

      canUseWindow.mockReturnValue(true)
    })

    // Validating that canUseWindow works as expected
    // Domain owners should add tests to cover this behaviour
    test('returns *something*', () => {
      expect(getSnowplowDomainUserId()).resolves.toBeDefined()
    })
  })
})

describe('isOptimizelyFeatureEnabledFactory', () => {
  let cookieGetSpy
  let hasValidInstanceSpy
  let getOptimizelyInstanceSpy
  let trackExperimentInSnowplowSpy

  const dispatch = jest.fn()
  const getState = jest.fn()
  const isFeatureEnabled = jest.fn()

  beforeEach(() => {
    canUseWindow.mockReturnValue(true)
    hasValidInstanceSpy = jest.spyOn(optimizelySdk, 'hasValidInstance')
    getOptimizelyInstanceSpy = jest.spyOn(optimizelySdk, 'getOptimizelyInstance').mockResolvedValue({ isFeatureEnabled })

    cookieGetSpy = jest.spyOn(cookieHelper, 'get')
    trackExperimentInSnowplowSpy = jest.spyOn(snowplow, 'trackExperimentInSnowplow')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when user and snowplow user id are not present', () => {
    it('should return false', async () => {
      getState.mockReturnValue(({ auth: Map({}) }))
      cookieGetSpy.mockReturnValue(undefined)

      window.snowplow = null

      const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

      expect(cookieGetSpy).toBeCalledWith(Cookies, 'gousto_session_id', false, false)
      expect(hasValidInstanceSpy).not.toBeCalled()
      expect(getOptimizelyInstanceSpy).not.toBeCalled()
      expect(trackExperimentInSnowplowSpy).not.toBeCalled()
      expect(isEnabled).toBe(false)
    })
  })

  describe('when the user has a valid user id', () => {
    beforeEach(() => {
      getState.mockReturnValue({ auth: Map({ id: 'user_id' }) })
      cookieGetSpy.mockReturnValue(undefined)
      window.snowplow = null
    })

    describe('when optimizely does not load successfully', () => {
      it('should return false', async () => {
        hasValidInstanceSpy.mockReturnValue(false)

        const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

        expect(getOptimizelyInstanceSpy).toBeCalled()
        expect(hasValidInstanceSpy).toBeCalled()
        expect(isFeatureEnabled).not.toBeCalled()
        expect(trackExperimentInSnowplowSpy).not.toBeCalled()
        expect(isEnabled).toBe(false)
      })
    })

    describe('when optimizely loads successfully', () => {
      beforeEach(() => {
        hasValidInstanceSpy.mockReturnValue(true)
      })

      describe('when the feature is not enabled', () => {
        it('should return false', async () => {
          isFeatureEnabled.mockReturnValue(false)

          const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

          expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
          expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', false, 'user_id', undefined, 'user_id')
          expect(isEnabled).toBe(false)
        })
      })

      describe('when the feature is enabled', () => {
        it('should return true', async () => {
          isFeatureEnabled.mockReturnValue(true)

          const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

          expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
          expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', true, 'user_id', undefined, 'user_id')
          expect(isEnabled).toBe(true)
        })
      })

      describe('when client has a valid session id', () => {
        describe('when the feature is enabled', () => {
          it('should return true', async () => {
            cookieGetSpy.mockReturnValue('session_id')
            isFeatureEnabled.mockReturnValue(true)

            const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

            expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
            expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', true, 'user_id', 'session_id', 'user_id')
            expect(isEnabled).toBe(true)
          })
        })
      })
    })
  })

  describe('when client has a valid snowplow user id and loaded optimizely', () => {
    beforeEach(() => {
      getState.mockReturnValue(({ auth: Map({}) }))
      cookieGetSpy.mockReturnValue('session_id')
      hasValidInstanceSpy.mockReturnValue(true)

      mockSnowplowCallbackAPI()
    })

    describe('when the feature is not enabled', () => {
      it('should return false', async () => {
        isFeatureEnabled.mockReturnValue(false)

        const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

        expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'snowplowUserId')
        expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', false, undefined, 'session_id', 'snowplowUserId')
        expect(isEnabled).toBe(false)
      })
    })

    describe('when the feature is enabled', () => {
      it('should return true', async () => {
        isFeatureEnabled.mockReturnValue(true)

        const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

        expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'snowplowUserId')
        expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', true, undefined, 'session_id', 'snowplowUserId')
        expect(isEnabled).toBe(true)
      })
    })
  })
})
