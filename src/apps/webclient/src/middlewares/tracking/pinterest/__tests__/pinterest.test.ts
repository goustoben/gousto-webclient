import { canUseWindow, getWindow } from 'utils/browserEnvironment'
import { getPathName } from 'middlewares/tracking/utils'
import { pinterestTracking } from '../pinterest'

const mockCallback = jest.fn()
const mockActionType = 'mock-action-type'
const mockAction = {
  type: mockActionType,
}
const mockState = {
  mock: 'state',
}
const mockPathname = 'mock-pathname'

jest.mock('middlewares/tracking/utils')
jest.mock('utils/browserEnvironment')
jest.mock('../pinterest', () => ({
  pinterestTracking: jest.requireActual('../pinterest').pinterestTracking,
}))

describe('pinterest middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Tracker', () => {
    beforeEach(() => {
      ;(getWindow as jest.Mock).mockReturnValue({ pintrk: {} })
      ;(getPathName as jest.Mock).mockReturnValue(mockPathname)

      pinterestTracking.getCallbacks = () => ({
        [mockActionType]: mockCallback,
      })
    })

    describe('when window is available', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(true)
      })

      test('invokes callback for action type', () => {
        pinterestTracking.Tracker(mockAction, mockState, mockState)

        expect(mockCallback).toHaveBeenCalledWith(
          { type: 'mock-action-type' },
          { mock: 'state' },
          { mock: 'state' },
          mockPathname
        )
      })
    })

    describe('when window is not available', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(false)
      })

      test('does not invoke callback', () => {
        pinterestTracking.Tracker(mockAction, mockState, mockState)

        expect(mockCallback).not.toHaveBeenCalled()
      })
    })
  })
})
