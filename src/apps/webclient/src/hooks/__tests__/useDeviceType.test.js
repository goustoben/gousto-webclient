import { renderHook, act } from '@testing-library/react-hooks'
import { canUseDom } from 'utils/browserHelper'
import { useDeviceType, DeviceType } from '../useDeviceType'

jest.mock('utils/browserHelper', () => ({
  canUseDom: jest.fn(),
}))

describe('useDeviceTypeHook', () => {
  describe('when `window` object is undefined', () => {
    beforeAll(() => {
      canUseDom.mockReturnValue(false)
    })
    afterAll(() => {
      jest.clearAllMocks()
    })
    test('it should return default deviceType=desktop', () => {
      const { result } = renderHook(() => useDeviceType())
      expect(result.current).toBe(DeviceType.DESKTOP)
    })
  })

  describe('when window object is defined', () => {
    const { window } = global
    beforeAll(() => {
      canUseDom.mockReturnValue(true)
    })
    afterAll(() => {
      jest.clearAllMocks()
    })
    test('it should return `deviceType=mobile`, when window size 768', () => {
      window.innerWidth = 760
      const { result } = renderHook(() => useDeviceType())
      expect(result.current).toBe(DeviceType.MOBILE)
    })

    test('it should return `deviceType=tablet`, when window size 1024', () => {
      window.innerWidth = 1024
      const { result } = renderHook(() => useDeviceType())
      expect(result.current).toBe(DeviceType.TABLET)
    })
  })

  describe('when window is resized', () => {
    const { window } = global
    beforeAll(() => {
      canUseDom.mockReturnValue(true)
    })
    afterAll(() => {
      jest.clearAllMocks()
    })

    test('it should return `deviceType=desktop`, when resized to 1840', () => {
      window.innerWidth = 1024
      const { result, rerender } = renderHook(() => useDeviceType())
      expect(result.current).toBe(DeviceType.TABLET)

      act(() => {
        window.innerWidth = 1840
        window.dispatchEvent(new global.Event('resize'))
      })

      rerender()
      expect(result.current).toBe(DeviceType.DESKTOP)
    })
  })
})
