import { onEnter } from '../accessibility'

describe('Accessibility utils', () => {
  describe('onEnter', () => {
    const callbackMock = jest.fn()

    afterEach(() => {
      callbackMock.mockClear()
    })

    describe('when onEnter-created function is called with an enter event', () => {
      const enterEvent = { keyCode: 13 }

      beforeEach(() => {
        onEnter(callbackMock)(enterEvent)
      })

      test('the callback function is called', () => {
        expect(callbackMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('when the function is called with a different event', () => {
      const notEnterEvent = { keyCode: 'something else that is not 13' }

      beforeEach(() => {
        onEnter(callbackMock)(notEnterEvent)
      })

      test('the callback function is not called', () => {
        expect(callbackMock).not.toHaveBeenCalled()
      })
    })
  })
})
