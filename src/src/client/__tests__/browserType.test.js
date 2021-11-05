import actual from 'actual'
import { browserType } from '../browserType'

jest.mock('actual', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const store = {
  dispatch: jest.fn(),
}

describe('browserType', () => {
  describe('when actual returns < 768', () => {
    beforeEach(() => {
      actual.mockReturnValue(700)
    })

    test('then it should report mobile', () => {
      browserType(store)

      expect(store.dispatch).toHaveBeenCalledWith({
        browserType: 'mobile',
        type: 'BROWSER_TYPE_CHANGE',
      })
    })
  })

  describe('when actual returns < 1025', () => {
    beforeEach(() => {
      actual.mockReturnValue(800)
    })

    test('then it should report tablet', () => {
      browserType(store)

      expect(store.dispatch).toHaveBeenCalledWith({
        browserType: 'tablet',
        type: 'BROWSER_TYPE_CHANGE',
      })
    })
  })

  describe('when actual returns >= 1025', () => {
    beforeEach(() => {
      actual.mockReturnValue(1100)
    })

    test('then it should report desktop', () => {
      browserType(store)

      expect(store.dispatch).toHaveBeenCalledWith({
        browserType: 'desktop',
        type: 'BROWSER_TYPE_CHANGE',
      })
    })
  })
})
