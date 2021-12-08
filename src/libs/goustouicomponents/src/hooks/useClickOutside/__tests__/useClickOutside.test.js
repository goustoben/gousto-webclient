import { act } from 'react-dom/test-utils'
import { renderHook } from '../../utils/renderHook'

import { useClickOutside } from '../useClickOutside'

const mockCallback = jest.fn()

let mockRef
let onMouseDown

const setIsClickInsideRef = (isInsideRef) => {
  mockRef = {
    current: {
      contains: () => isInsideRef,
    },
  }
}

describe('useClickOutside', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    jest
      .spyOn(document, 'addEventListener')
      .mockImplementation((e, cb) => {
        onMouseDown = cb
      })
  })

  describe('When user clicks outside the element of the provided ref', () => {
    beforeEach(() => {
      setIsClickInsideRef(false)

      act(() => {
        renderHook(useClickOutside)(mockRef, mockCallback)
      })

      onMouseDown(mockRef)
    })

    test('Then the callback should be invoked', () => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })

  describe('When user clicks inside the element of the provided ref', () => {
    beforeEach(() => {
      setIsClickInsideRef(true)

      act(() => {
        renderHook(useClickOutside)(mockRef, mockCallback)
      })

      onMouseDown(mockRef)
    })

    test('Then the callback should not be invoked', () => {
      expect(mockCallback).not.toHaveBeenCalled()
    })
  })

  describe('When component is unmounted', () => {
    test('Then event listener is removed', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

      act(() => {
        const renderedHook = renderHook(useClickOutside)('mockRef', 'mockCallback')

        renderedHook.wrapper.unmount()
      })

      expect(removeEventListenerSpy).toHaveBeenCalled()
    })
  })
})
