import * as cookieHelper from 'utils/cookieHelper2'
import Cookies from 'cookies-js'
import { renderHook } from '@testing-library/react-hooks'
import {
  useIsOptimizelyFeatureEnabled,
} from './useOptimizely.hook'
import * as optimizelySdk from './optimizelySDK'

describe('useIsOptimizelyFeatureEnabled', () => {
  let cookieGetSpy
  let hasValidInstanceSpy
  let getOptimizelyInstanceSpy
  let trackExperimentInSnowplow

  const isFeatureEnabled = jest.fn()

  beforeEach(() => {
    hasValidInstanceSpy = jest.spyOn(optimizelySdk, 'hasValidInstance')
    getOptimizelyInstanceSpy = jest.spyOn(optimizelySdk, 'getOptimizelyInstance')
      .mockResolvedValue({ isFeatureEnabled })

    cookieGetSpy = jest.spyOn(cookieHelper, 'get')
    trackExperimentInSnowplow = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when user and session are not present', () => {
    it('should return false', async () => {
      cookieGetSpy.mockReturnValue(undefined)

      const { result } = renderHook(() => useIsOptimizelyFeatureEnabled({ name: 'flag', userId: undefined, trackExperimentInSnowplow }))

      const isEnabled = result.current

      expect(isEnabled).toBe(false)
      expect(cookieGetSpy).toBeCalledWith(Cookies, 'gousto_session_id', false, false)
      expect(hasValidInstanceSpy).not.toBeCalled()
      expect(getOptimizelyInstanceSpy).not.toBeCalled()
      expect(trackExperimentInSnowplow).not.toBeCalled()
    })
  })

  describe('when the user has a valid user id', () => {
    beforeEach(() => {
      cookieGetSpy.mockReturnValue(undefined)
    })

    describe('when optimizely does not load successfully', () => {
      it('should return false', async () => {
        hasValidInstanceSpy.mockReturnValue(false)

        const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled({ name: 'flag', userId: 'user_id', trackExperimentInSnowplow }))

        await waitForNextUpdate()

        const isEnabled = result.current

        expect(isEnabled).toBe(false)
        expect(getOptimizelyInstanceSpy).toBeCalled()
        expect(hasValidInstanceSpy).toBeCalled()
        expect(isFeatureEnabled).not.toBeCalled()
        expect(trackExperimentInSnowplow).not.toBeCalled()
      })
    })

    describe('when optimizely loads successfully', () => {
      beforeEach(() => {
        hasValidInstanceSpy.mockReturnValue(true)
      })

      describe('when the feature is not enabled', () => {
        it('should return false', async () => {
          isFeatureEnabled.mockReturnValue(false)

          const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled({ name: 'flag', userId: 'user_id', trackExperimentInSnowplow }))

          await waitForNextUpdate()

          const isEnabled = result.current

          expect(isEnabled).toBe(false)
          expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
          expect(trackExperimentInSnowplow).toBeCalledWith('flag', false, 'user_id', undefined)
        })
      })

      describe('when the feature is enabled', () => {
        it('should return true', async () => {
          isFeatureEnabled.mockReturnValue(true)

          const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled({ name: 'flag', userId: 'user_id', trackExperimentInSnowplow }))

          await waitForNextUpdate()

          const isEnabled = result.current

          expect(isEnabled).toBe(true)
          expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
          expect(trackExperimentInSnowplow).toBeCalledWith('flag', true, 'user_id', undefined)
        })
      })

      describe('when client has a valid session id', () => {
        describe('when the feature is enabled', () => {
          it('should return true', async () => {
            cookieGetSpy.mockReturnValue('session_id')
            isFeatureEnabled.mockReturnValue(true)

            const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled({ name: 'flag', userId: 'user_id', trackExperimentInSnowplow }))

            await waitForNextUpdate()

            const isEnabled = result.current

            expect(isEnabled).toBe(true)
            expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
            expect(trackExperimentInSnowplow).toBeCalledWith('flag', true, 'user_id', 'session_id')
          })
        })
      })
    })
  })

  describe('when client has a valid session id and loaded optimizely', () => {
    beforeEach(() => {
      cookieGetSpy.mockReturnValue('session_id')
      hasValidInstanceSpy.mockReturnValue(true)
    })

    describe('when the feature is not enabled', () => {
      it('should return false', async () => {
        isFeatureEnabled.mockReturnValue(false)

        const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled({ name: 'flag', userId: undefined, trackExperimentInSnowplow }))

        await waitForNextUpdate()

        const isEnabled = result.current

        expect(isEnabled).toBe(false)
        expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'session_id')
        expect(trackExperimentInSnowplow).toBeCalledWith('flag', false, undefined, 'session_id')
      })
    })

    describe('when the feature is enabled', () => {
      it('should return true', async () => {
        isFeatureEnabled.mockReturnValue(true)

        const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled({ name: 'flag', userId: undefined, trackExperimentInSnowplow }))

        await waitForNextUpdate()

        const isEnabled = result.current

        expect(isEnabled).toBe(true)
        expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'session_id')
        expect(trackExperimentInSnowplow).toBeCalledWith('flag', true, undefined, 'session_id')
      })
    })
  })
})
