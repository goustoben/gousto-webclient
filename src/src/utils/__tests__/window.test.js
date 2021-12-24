import { windowOpen, isWindowDefined } from '../window'

describe('the window util functions', () => {
  describe('the windowOpen function', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    const TEST_URL = 'https://test.com'
    describe('when called with only the url', () => {
      beforeEach(() => {
        window.open = jest.fn()
        windowOpen(TEST_URL)
      })

      test('calls window.open with the correct arguments', () => {
        expect(window.open).toHaveBeenCalledWith(TEST_URL, '_blank', 'noopener noreferrer')
      })
    })

    describe('when called with isNewTab false', () => {
      beforeEach(() => {
        window.open = jest.fn()
        windowOpen(TEST_URL, false)
      })

      test('calls window.open with the correct arguments', () => {
        expect(window.open).toHaveBeenCalledWith(TEST_URL, '_self', 'noopener noreferrer')
      })
    })
  })

  describe('isWindowDefined() function', () => {
    describe('when window is defined', () => {
      it('should return true', () => {
        expect(isWindowDefined()).toBe(true)
      })
    })
  })
})
