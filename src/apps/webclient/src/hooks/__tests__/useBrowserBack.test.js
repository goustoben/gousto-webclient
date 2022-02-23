import { renderHook } from '@testing-library/react-hooks'
import { canUseWindow } from 'utils/browserEnvironment'

import { useBrowserBack } from '../useBrowserBack'

jest.mock('utils/browserEnvironment')

describe('useBrowserBack', () => {
  const pushStateSpy = jest.spyOn(window.history, 'pushState')
  const backSpy = jest.spyOn(window.history, 'back')
  const callback = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    canUseWindow.mockReturnValue(true)
  })
  test('when callback is provided should prevent Back button and call callback', () => {
    renderHook(() => useBrowserBack(callback))
    expect(pushStateSpy).toHaveBeenCalled()

    // emit browser Back button event
    const event = new global.Event('popstate')
    window.dispatchEvent(event)
    expect(callback).toHaveBeenCalled()
  })
  describe('should not prevent Back button', () => {
    test('when callback is null', () => {
      renderHook(() => useBrowserBack(null))
      expect(pushStateSpy).not.toHaveBeenCalled()
    })
    test('when callback is false', () => {
      renderHook(() => useBrowserBack(false))
      expect(pushStateSpy).not.toHaveBeenCalled()
    })
    test('when callback is undefined', () => {
      renderHook(() => useBrowserBack(undefined))
      expect(pushStateSpy).not.toHaveBeenCalled()
    })

    test('returns a callback that invokes history.back', () => {
      const { result } = renderHook(() => useBrowserBack(callback))

      result.current()

      expect(backSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('when window is not available', () => {
    beforeEach(() => {
      canUseWindow.mockReturnValue(false)
    })

    test('does not invoke window.history.pushState', () => {
      renderHook(() => useBrowserBack(callback))
      expect(pushStateSpy).not.toHaveBeenCalled()
    })

    test('returns a callback that does not invoke history.back', () => {
      const { result } = renderHook(() => useBrowserBack(callback))

      result.current()

      expect(backSpy).not.toHaveBeenCalled()
    })
  })
})
