import Immutable from 'immutable'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'utils/cookieHelper2'
import Cookies from 'cookies-js'
import { renderHook } from '@testing-library/react-hooks'
import { useIsOptimizelyFeatureEnabled } from './useOptimizely.hook'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'
import * as optimizelySdk from './optimizelySDK'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))
jest.mock('utils/cookieHelper2')
jest.mock('./trackExperimentInSnowplow')

describe('useIsOptimizelyFeatureEnabled', () => {
  let hasValidInstanceSpy
  let getOptimizelyInstanceSpy
  let goustoSessionId
  let goustoOptimizelyOverwrites

  const isFeatureEnabled = jest.fn()

  const dispatch = jest.fn()
  useDispatch.mockReturnValue(dispatch)

  let state = {}
  useSelector.mockImplementation(selector => selector(state))
  trackExperimentInSnowplow.mockImplementation((...args) => ['call_trackExperimentInSnowplow', ...args])

  beforeEach(() => {
    hasValidInstanceSpy = jest.spyOn(optimizelySdk, 'hasValidInstance')
    getOptimizelyInstanceSpy = jest.spyOn(optimizelySdk, 'getOptimizelyInstance')
      .mockResolvedValue({ isFeatureEnabled })

    goustoSessionId = undefined
    goustoOptimizelyOverwrites = undefined
    get.mockImplementation((_, key) => {
      if (key === 'gousto_session_id') {
        return goustoSessionId
      }

      if (key === 'gousto_optimizely_overwrites') {
        return goustoOptimizelyOverwrites
      }

      return undefined
    })

    state = {
      auth: Immutable.Map({
        id: '',
      }),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when user and session are not present', () => {
    it('should return false', async () => {
      const { result } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

      const isEnabled = result.current

      expect(isEnabled).toBe(false)
      expect(get).toHaveBeenNthCalledWith(1, Cookies, 'gousto_session_id', false, false)
      expect(get).toHaveBeenNthCalledWith(2, Cookies, 'gousto_optimizely_overwrites')
      expect(hasValidInstanceSpy).not.toBeCalled()
      expect(getOptimizelyInstanceSpy).not.toBeCalled()
      expect(dispatch).not.toBeCalled()
    })
  })

  describe('when the user has a valid user id', () => {
    beforeEach(() => {
      state = {
        ...state,
        auth: state.auth.set('id', 'user_id')
      }
    })

    describe('when optimizely does not load successfully', () => {
      it('should return false', async () => {
        hasValidInstanceSpy.mockReturnValue(false)

        const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

        await waitForNextUpdate()

        const isEnabled = result.current

        expect(isEnabled).toBe(false)
        expect(getOptimizelyInstanceSpy).toBeCalled()
        expect(hasValidInstanceSpy).toBeCalled()
        expect(isFeatureEnabled).not.toBeCalled()
        expect(dispatch).not.toBeCalled()
      })
    })

    describe('when optimizely loads successfully', () => {
      beforeEach(() => {
        hasValidInstanceSpy.mockReturnValue(true)
      })

      describe('when the feature is not enabled', () => {
        beforeEach(() => {
          isFeatureEnabled.mockReturnValue(false)
        })

        it('should return false', async () => {
          const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

          await waitForNextUpdate()

          const isEnabled = result.current

          expect(isEnabled).toBe(false)
          expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
        })

        it('should track experiment in snowplow', async () => {
          const { waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

          await waitForNextUpdate()

          expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', false, 'user_id', undefined])
        })
      })

      describe('when the feature is enabled', () => {
        beforeEach(() => {
          isFeatureEnabled.mockReturnValue(true)
        })

        it('should return true', async () => {
          const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

          await waitForNextUpdate()

          const isEnabled = result.current

          expect(isEnabled).toBe(true)
          expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
        })

        it('should track experiment in snowplow', async () => {
          const { waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

          await waitForNextUpdate()

          expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', true, 'user_id', undefined])
        })
      })

      describe('when client has a valid session id', () => {
        beforeEach(() => {
          goustoSessionId = 'session_id'
        })

        describe('when the feature is enabled', () => {
          beforeEach(() => {
            isFeatureEnabled.mockReturnValue(true)
          })

          it('should return true', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

            await waitForNextUpdate()

            const isEnabled = result.current

            expect(isEnabled).toBe(true)
            expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'user_id')
          })

          it('should track experiment in snowplow', async () => {
            const { waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

            await waitForNextUpdate()

            expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', true, 'user_id', 'session_id'])
          })
        })
      })
    })
  })

  describe('when client has a valid overwrite cookie', () => {
    describe('when overwrite is true', () => {
      it('should return true', async () => {
        goustoOptimizelyOverwrites = { flag: true }
        isFeatureEnabled.mockReturnValue(false)

        const { result } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

        const isEnabled = result.current

        expect(isEnabled).toBe(true)
        expect(get).toHaveBeenNthCalledWith(2, Cookies, 'gousto_optimizely_overwrites')
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

        const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

        await waitForNextUpdate()

        const isEnabled = result.current

        expect(isEnabled).toBe(false)
        expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'session_id')
      })

      it('should track experiment in snowplow', async () => {
        const { waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

        await waitForNextUpdate()

        expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', false, '', 'session_id'])
      })
    })

    describe('when the feature is enabled', () => {
      it('should return true', async () => {
        isFeatureEnabled.mockReturnValue(true)

        const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

        await waitForNextUpdate()

        const isEnabled = result.current

        expect(isEnabled).toBe(true)
        expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'session_id')
      })

      it('should track experiment in snowplow', async () => {
        const { waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

        await waitForNextUpdate()

        expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', true, '', 'session_id'])
      })
    })
  })
})
