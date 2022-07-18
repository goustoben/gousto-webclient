import React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import { withMockEnvironmentAndDomain } from '_testing/isomorphic-environment-test-utils'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { useDiscountAppliedData } from '../discountAppliedBarHooks'

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest
    .fn()
    .mockImplementationOnce(() => false)
    .mockImplementationOnce(() => true),
}))

const mockStore = configureMockStore()
export const mockedStore = mockStore({
  auth: Immutable.fromJS({}),
  basket: Immutable.fromJS({}),
  menuService: {},
  features: Immutable.fromJS({}),
  pending: Immutable.fromJS({}),
  promoStore: Immutable.fromJS({}),
})

describe('Given: useDiscountAppliedData() hook', () => {
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  describe('When: optimizely feature flag is off', () => {
    test('Hook should return object with optimizely feature disabled', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={mockedStore}>{children}</Provider>
      )
      const { result } = renderHook(() => useDiscountAppliedData(), { wrapper })

      expect(result.current.isHighlightDiscountExperimentEnabled).toBe(false)
    })
  })

  describe('When: optimizely feature flag is on', () => {
    test('Hook should return object with optimizely feature enabled', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={mockedStore}>{children}</Provider>
      )
      const { result } = renderHook(() => useDiscountAppliedData(), { wrapper })

      expect(result.current.isHighlightDiscountExperimentEnabled).toBe(true)
    })
  })
})
