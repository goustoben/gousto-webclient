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
  let goustoSessionId
  let goustoOptimizelyOverwrites

  const isFeatureEnabled = jest.fn()

  beforeEach(() => {
    hasValidInstanceSpy = jest.spyOn(optimizelySdk, 'hasValidInstance')
    getOptimizelyInstanceSpy = jest.spyOn(optimizelySdk, 'getOptimizelyInstance')
      .mockResolvedValue({ isFeatureEnabled })

    goustoSessionId = undefined
    goustoOptimizelyOverwrites = undefined
    cookieGetSpy = jest.spyOn(cookieHelper, 'get')
      .mockImplementation((_, key) => {
        if (key === 'gousto_session_id') {
          return goustoSessionId
        }

        if (key === 'gousto_optimizely_overwrites') {
          return goustoOptimizelyOverwrites
        }

        return undefined
      })

    trackExperimentInSnowplow = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when user and session are not present', () => {
    it('should return false', async () => {
      const { result } = renderHook(() => useIsOptimizelyFeatureEnabled({ name: 'flag', userId: undefined, trackExperimentInSnowplow }))

      const isEnabled = result.current

      expect(isEnabled).toBe(false)
      expect(cookieGetSpy).toHaveBeenNthCalledWith(1, Cookies, 'gousto_session_id', false, false)
      expect(cookieGetSpy).toHaveBeenNthCalledWith(2, Cookies, 'gousto_optimizely_overwrites')
      expect(hasValidInstanceSpy).not.toBeCalled()
      expect(getOptimizelyInstanceSpy).not.toBeCalled()
      expect(trackExperimentInSnowplow).not.toBeCalled()
    })
  })

  describe('when the user has a valid user id', () => {
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
            goustoSessionId = 'session_id'
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

  describe('when client has a valid overwrite cookie', () => {
    describe('when overwrite is true', () => {
      it('should return true', async () => {
        goustoOptimizelyOverwrites = { flag: true}
        isFeatureEnabled.mockReturnValue(false)

        const { result } = renderHook(() => useIsOptimizelyFeatureEnabled({ name: 'flag', userId: undefined, trackExperimentInSnowplow }))

        const isEnabled = result.current

        expect(isEnabled).toBe(true)
        expect(cookieGetSpy).toHaveBeenNthCalledWith(2, Cookies, 'gousto_optimizely_overwrites')
      })
    })
  })

  describe('when client has a valid session id and loaded optimizely', () => {
    beforeEach(() => {
      goustoSessionId = 'session_id'
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
