import { Map } from 'immutable'
import * as cookieHelper from 'utils/cookieHelper2'
import Cookies from 'cookies-js'
import {
  isOptimizelyFeatureEnabledFactory,
} from './optimizelyUtils'
import * as snowplow from './trackExperimentInSnowplow'
import * as optimizelySdk from './optimizelySDK'

describe('isOptimizelyFeatureEnabledFactory', () => {
  let cookieGetSpy
  let hasValidInstanceSpy
  let getOptimizelyInstanceSpy
  let trackExperimentInSnowplowSpy

  const dispatch = jest.fn()
  const getState = jest.fn()
  const isFeatureEnabled = jest.fn()

  beforeEach(() => {
    hasValidInstanceSpy = jest.spyOn(optimizelySdk, 'hasValidInstance')
    getOptimizelyInstanceSpy = jest.spyOn(optimizelySdk, 'getOptimizelyInstance').mockResolvedValue({ isFeatureEnabled })

    cookieGetSpy = jest.spyOn(cookieHelper, 'get')
    trackExperimentInSnowplowSpy = jest.spyOn(snowplow, 'trackExperimentInSnowplow')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when user and session are not present', () => {
    it('should return false', async () => {
      getState.mockReturnValue(({ auth: Map({}) }))
      cookieGetSpy.mockReturnValue(undefined)

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
          expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', false, 'user_id', undefined)
          expect(isEnabled).toBe(false)
        })
      })

      describe('when the feature is enabled', () => {
        it('should return true', async () => {
          isFeatureEnabled.mockReturnValue(true)

          const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

          expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
          expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', true, 'user_id', undefined)
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
            expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', true, 'user_id', 'session_id')
            expect(isEnabled).toBe(true)
          })
        })
      })
    })
  })

  describe('when client has a valid session id and loaded optimizely', () => {
    beforeEach(() => {
      getState.mockReturnValue(({ auth: Map({}) }))
      cookieGetSpy.mockReturnValue('session_id')
      hasValidInstanceSpy.mockReturnValue(true)
    })

    describe('when the feature is not enabled', () => {
      it('should return false', async () => {
        isFeatureEnabled.mockReturnValue(false)

        const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

        expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'session_id')
        expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', false, undefined, 'session_id')
        expect(isEnabled).toBe(false)
      })
    })

    describe('when the feature is enabled', () => {
      it('should return true', async () => {
        isFeatureEnabled.mockReturnValue(true)

        const isEnabled = await isOptimizelyFeatureEnabledFactory('flag')(dispatch, getState)

        expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'session_id')
        expect(trackExperimentInSnowplowSpy).toBeCalledWith('flag', true, undefined, 'session_id')
        expect(isEnabled).toBe(true)
      })
    })
  })
})
