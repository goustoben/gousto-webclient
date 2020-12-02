import { renderHook } from '@testing-library/react-hooks'

import { useTrackSubscriptionUpdate } from '../useTrackSubscriptionUpdate'

const mockTrackingFn = jest.fn()
jest.mock('../../tracking/subscriptionSettings.js', () => ({
  trackSubscriptionSettingsChange: (args) => () => mockTrackingFn(args)
}))

describe('useTrackSubscriptionUpdate', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('Given isUpdateSuccess and isUpdateError are both undefined', () => {
    test('Then tracking does not occur', () => {
      renderHook(() => useTrackSubscriptionUpdate({
        settingName: 'mock-setting-name',
        settingValue: 'mock-setting-value'
      }))

      expect(mockTrackingFn).not.toHaveBeenCalled()
    })
  })

  describe('Given isUpdateSuccess is true', () => {
    test('Then tracking is invoked as expected', () => {
      renderHook(() => useTrackSubscriptionUpdate({
        settingName: 'mock-setting-name',
        settingValue: 'mock-setting-value',
        isUpdateSuccess: true
      }))

      expect(mockTrackingFn).toHaveBeenCalledTimes(1)
      expect(mockTrackingFn).toHaveBeenCalledWith({
        action: 'update_success',
        settingName: 'mock-setting-name'
      })
    })
  })

  describe('Given isUpdateError is true', () => {
    test('Then tracking is invoked as expected', () => {
      renderHook(() => useTrackSubscriptionUpdate({
        settingName: 'mock-setting-name',
        settingValue: 'mock-setting-value',
        isUpdateError: true
      }))

      expect(mockTrackingFn).toHaveBeenCalledTimes(1)
      expect(mockTrackingFn).toHaveBeenCalledWith({
        action: 'update_error',
        settingName: 'mock-setting-name'
      })
    })
  })
})
