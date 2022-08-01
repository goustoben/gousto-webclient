import { renderHook } from '@testing-library/react-hooks'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'

import { useIsCheckoutHighlightOfferEnabled } from '../useIsCheckoutHighlightOfferEnabled'

jest.mock('containers/OptimizelyRollouts')
jest.mock('routes/Menu/domains/auth')

const useAuthMock = jest.mocked(useAuth)
const useIsOptimizelyFeatureEnabledMock = jest.mocked(useIsOptimizelyFeatureEnabled)

describe('Given: useIsCheckoutHighlightOfferEnabled() hook', () => {
  const mockedUseAuthAuthenticatedResult = {
    isAuthenticated: true,
    authUserId: 'fake-user-id',
    isAdmin: false,
    accessToken: 'fake-access-token',
  }
  const mockedUseAuthNotAuthenticatedResult = {
    isAuthenticated: false,
    authUserId: undefined,
    isAdmin: false,
    accessToken: undefined,
  }

  afterEach(() => jest.clearAllMocks())

  describe('When: optimizely feature flag enabled and user authenticated', () => {
    beforeEach(() => {
      useAuthMock.mockReturnValue(mockedUseAuthAuthenticatedResult)
      useIsOptimizelyFeatureEnabledMock.mockReturnValue(true)
    })

    test('Then: useIsCheckoutHighlightOfferEnabled should return false', () => {
      const { result } = renderHook(() => useIsCheckoutHighlightOfferEnabled())

      expect(useAuthMock).toBeCalledTimes(1)
      expect(useIsOptimizelyFeatureEnabledMock).toBeCalledTimes(1)
      expect(useIsOptimizelyFeatureEnabledMock).toBeCalledWith(
        'beetroots_checkout_highlight_offer_web_enabled',
      )
      expect(result.current).toBe(false)
    })
  })

  describe('When: optimizely feature flag enabled and user not authenticated', () => {
    beforeEach(() => {
      useAuthMock.mockReturnValue(mockedUseAuthNotAuthenticatedResult)
      useIsOptimizelyFeatureEnabledMock.mockReturnValue(true)
    })

    test('Then: useIsCheckoutHighlightOfferEnabled should return true', () => {
      const { result } = renderHook(() => useIsCheckoutHighlightOfferEnabled())

      expect(useAuthMock).toBeCalledTimes(1)
      expect(useIsOptimizelyFeatureEnabledMock).toBeCalledTimes(1)
      expect(useIsOptimizelyFeatureEnabledMock).toBeCalledWith(
        'beetroots_checkout_highlight_offer_web_enabled',
      )
      expect(result.current).toBe(true)
    })
  })

  describe('When: optimizely feature flag disabled and user authenticated', () => {
    beforeEach(() => {
      useAuthMock.mockReturnValue(mockedUseAuthAuthenticatedResult)
      useIsOptimizelyFeatureEnabledMock.mockReturnValue(false)
    })

    test('Then: useIsCheckoutHighlightOfferEnabled should return false', () => {
      const { result } = renderHook(() => useIsCheckoutHighlightOfferEnabled())

      expect(useAuthMock).toBeCalledTimes(1)
      expect(useIsOptimizelyFeatureEnabledMock).toBeCalledTimes(1)
      expect(useIsOptimizelyFeatureEnabledMock).toBeCalledWith(
        'beetroots_checkout_highlight_offer_web_enabled',
      )
      expect(result.current).toBe(false)
    })
  })

  describe('When: optimizely feature flag disabled and user not authenticated', () => {
    beforeEach(() => {
      useAuthMock.mockReturnValue(mockedUseAuthNotAuthenticatedResult)
      useIsOptimizelyFeatureEnabledMock.mockReturnValue(false)
    })

    test('Then: useIsCheckoutHighlightOfferEnabled should return false', () => {
      const { result } = renderHook(() => useIsCheckoutHighlightOfferEnabled())

      expect(useAuthMock).toBeCalledTimes(1)
      expect(useIsOptimizelyFeatureEnabledMock).toBeCalledTimes(1)
      expect(useIsOptimizelyFeatureEnabledMock).toBeCalledWith(
        'beetroots_checkout_highlight_offer_web_enabled',
      )
      expect(result.current).toBe(false)
    })
  })
})
