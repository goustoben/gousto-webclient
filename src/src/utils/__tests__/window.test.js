import { windowOpen, isWindowDefined } from '../window'

describe('the window util functions', () => {
  describe('the windowOpen funcction', () => {
    const TEST_URL = 'https://test.com'

    beforeEach(() => {
      window.open = jest.fn()
      windowOpen(TEST_URL)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('calls window.open with the correct arguments', () => {
      expect(window.open).toHaveBeenCalledWith(TEST_URL, '_blank', 'noopener noreferrer')
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
