import Immutable from 'immutable'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'utils/cookieHelper2'
import Cookies from 'cookies-js'
import { renderHook } from '@testing-library/react-hooks'
import {
  useSetupOptimizelyOverride,
  useIsOptimizelyFeatureEnabled
} from './useOptimizely.hook'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'
import * as optimizelySdk from './optimizelySDK'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))
jest.mock('utils/cookieHelper2')
jest.mock('./trackExperimentInSnowplow')
jest.mock('config/globals', () => ({
  __esModule: true,
  default: {
    client: true,
  }
}))

describe('useOptimizely', () => {
  let state = {}
  let getItemSpy
  let setItemSpy
  let removeItemSpy

  beforeEach(() => {
    // eslint-disable-next-line no-proto
    getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem')
    // eslint-disable-next-line no-proto
    setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem')
    // eslint-disable-next-line no-proto
    removeItemSpy = jest.spyOn(window.localStorage.__proto__, 'removeItem')

    useSelector.mockImplementation(selector => selector(state))
  })

  describe('useSetupOptimizelyOverride', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('when the hooks loads', () => {
      describe('when there is no `opt_features` in the routing params', () => {
        it('should call `getItem` but not `setItem`', async () => {
          renderHook(() => useSetupOptimizelyOverride())

          expect(getItemSpy).toHaveBeenNthCalledWith(1, 'opt_features')
          expect(setItemSpy).not.toBeCalled()
          expect(removeItemSpy).not.toBeCalled()
        })
      })

      describe('when `opt_features` is in routing params', () => {
        beforeEach(() => {
          state = {
            routing: {
              locationBeforeTransitions: {
                query: {
                  opt_features: 'flag=true'
                }
              }
            }
          }
        })

        describe('when the query params are not in the store', () => {
          it('should call `setItem` with the query params', async () => {
            renderHook(() => useSetupOptimizelyOverride())

            expect(getItemSpy).toHaveBeenNthCalledWith(1, 'opt_features')
            expect(setItemSpy).toHaveBeenNthCalledWith(1, 'opt_features', '"flag=true"')
            expect(removeItemSpy).not.toBeCalled()
          })
        })

        describe('when the query params is in the store', () => {
          it('should not call `setItem`', async () => {
            getItemSpy.mockReturnValueOnce(JSON.stringify('flag=true'))

            renderHook(() => useSetupOptimizelyOverride())

            expect(getItemSpy).toHaveBeenNthCalledWith(1, 'opt_features')
            expect(setItemSpy).not.toBeCalled()
            expect(removeItemSpy).not.toBeCalled()
          })
        })
      })

      describe('when `opt_features` set to empty in routing params', () => {
        beforeEach(() => {
          state = {
            routing: {
              locationBeforeTransitions: {
                query: {
                  opt_features: ''
                }
              }
            }
          }
        })

        describe('when the query params are in the store', () => {
          it('should call `setItem` with the an empty query string', () => {
            getItemSpy.mockReturnValueOnce(JSON.stringify('flag=true'))

            renderHook(() => useSetupOptimizelyOverride())

            expect(getItemSpy).toHaveBeenNthCalledWith(1, 'opt_features')
            expect(setItemSpy).not.toBeCalled()
            expect(removeItemSpy).toBeCalled()
          })
        })

        describe('when the are no query params is in the store', () => {
          it('should not call `setItem`', () => {
            renderHook(() => useSetupOptimizelyOverride())

            expect(getItemSpy).toHaveBeenNthCalledWith(1, 'opt_features')
            expect(setItemSpy).not.toBeCalled()
            expect(removeItemSpy).not.toBeCalled()
          })
        })
      })
    })
  })

  describe('useIsOptimizelyFeatureEnabled', () => {
    let hasValidInstanceSpy
    let getOptimizelyInstanceSpy
    let goustoSessionId

    const isFeatureEnabled = jest.fn()
    const onReady = jest.fn().mockImplementation(() => Promise.resolve())
    const dispatch = jest.fn()

    beforeEach(() => {
      useDispatch.mockReturnValue(dispatch)
      trackExperimentInSnowplow.mockImplementation((...args) => ['call_trackExperimentInSnowplow', ...args])
      hasValidInstanceSpy = jest.spyOn(optimizelySdk, 'hasValidInstance')
      getOptimizelyInstanceSpy = jest.spyOn(optimizelySdk, 'getOptimizelyInstance')
        .mockResolvedValue({ isFeatureEnabled, onReady })

      goustoSessionId = undefined
      get.mockImplementation((_, key) => {
        if (key === 'gousto_session_id') {
          return goustoSessionId
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

    describe('when user and snowplow user id are not present', () => {
      beforeEach(() => {
        window.Snowplow = null
      })

      it('should return null', async () => {
        const { result } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

        const isEnabled = result.current

        expect(isEnabled).toBe(null)
        expect(get).toHaveBeenNthCalledWith(1, Cookies, 'gousto_session_id', false, false)
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
        it('should return null', async () => {
          const { result } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

          const isEnabled = result.current

          expect(isEnabled).toBe(null)
          expect(getOptimizelyInstanceSpy).toBeCalled()
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

            expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', false, 'user_id', undefined, 'user_id'])
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

            expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', true, 'user_id', undefined, 'user_id'])
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

              expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', true, 'user_id', 'session_id', 'user_id'])
            })
          })
        })
      })
    })

    describe('when client has a valid snowplow id and loaded optimizely', () => {
      beforeEach(() => {
        goustoSessionId = 'session_id'
        hasValidInstanceSpy.mockReturnValue(true)
        window.Snowplow = {
          getTrackerCf() {
            return {
              getDomainUserId() {
                return 'snowplowUserId'
              }
            }
          }
        }
      })

      describe('when client has a valid overwrite cookie', () => {
        describe('when overwrite is true', () => {
          it('should return true', async () => {
            getItemSpy.mockReturnValue(JSON.stringify('flag=true'))
            isFeatureEnabled.mockReturnValue(false)

            const { result } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

            const isEnabled = result.current

            expect(isEnabled).toBe(true)
            expect(getItemSpy).toHaveBeenNthCalledWith(1, 'opt_features')
          })
        })

        describe('when overwrite is false', () => {
          it('should return false', async () => {
            getItemSpy.mockReturnValue(JSON.stringify('flag=false'))
            isFeatureEnabled.mockReturnValue(true)

            const { result } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

            const isEnabled = result.current

            expect(isEnabled).toBe(false)
            expect(getItemSpy).toHaveBeenNthCalledWith(1, 'opt_features')
          })
        })

        describe('when overwrite is defined for another feature', () => {
          it('should return false', async () => {
            getItemSpy.mockReturnValue(JSON.stringify('other=false'))
            isFeatureEnabled.mockReturnValue(true)

            const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

            await waitForNextUpdate()

            const isEnabled = result.current

            expect(isEnabled).toBe(true)
            expect(getItemSpy).toHaveBeenNthCalledWith(1, 'opt_features')
          })
        })
      })

      describe('when the feature provided is `null`', () => {
        it('should return false', () => {
          const { result } = renderHook(() => useIsOptimizelyFeatureEnabled(null))

          const isEnabled = result.current

          expect(isEnabled).toBe(null)
          expect(getOptimizelyInstanceSpy).not.toHaveBeenCalled()
        })
      })

      describe('when the feature is not enabled', () => {
        it('should return false', async () => {
          isFeatureEnabled.mockReturnValue(false)

          const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

          await waitForNextUpdate()

          const isEnabled = result.current

          expect(isEnabled).toBe(false)
          expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'snowplowUserId')
        })

        it('should track experiment in snowplow', async () => {
          const { waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

          await waitForNextUpdate()

          expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', false, '', 'session_id', 'snowplowUserId'])
        })
      })

      describe('when the feature is enabled', () => {
        it('should return true', async () => {
          isFeatureEnabled.mockReturnValue(true)

          const { result, waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

          await waitForNextUpdate()

          const isEnabled = result.current

          expect(isEnabled).toBe(true)
          expect(isFeatureEnabled).toHaveBeenCalledWith('flag', 'snowplowUserId')
        })

        it('should track experiment in snowplow', async () => {
          const { waitForNextUpdate } = renderHook(() => useIsOptimizelyFeatureEnabled('flag'))

          await waitForNextUpdate()

          expect(dispatch).toHaveBeenCalledWith(['call_trackExperimentInSnowplow', 'flag', true, '', 'session_id', 'snowplowUserId'])
        })
      })
    })
  })
})
