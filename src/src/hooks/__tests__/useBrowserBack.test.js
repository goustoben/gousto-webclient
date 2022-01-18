import { renderHook } from '@testing-library/react-hooks'
import { useBrowserBack } from '../useBrowserBack'

describe('useBrowserBack', () => {
  const pushStateSpy = jest.spyOn(window.history, 'pushState')
  beforeEach(() => {
    pushStateSpy.mockReset()
  })
  test('when callback is provided should prevent Back button and call callback', () => {
    const callback = jest.fn()
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
  })
})
