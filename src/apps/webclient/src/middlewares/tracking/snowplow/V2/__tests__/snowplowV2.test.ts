import { actionTypes } from 'actions/actionTypes'
import { canUseWindow } from 'utils/browserEnvironment'

import { snowplowV2Tracking } from '../snowplowV2'

const mockTrackEventWithData = jest.fn()

jest.mock('utils/browserEnvironment')
jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  trackEventWithData: () => mockTrackEventWithData,
}))

const mockAction = {
  type: actionTypes.BASKET_ORDER_LOADED,
}
const mockState = {
  mock: 'state',
}

describe('snowplowV2Tracking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when window is available', () => {
    beforeEach(() => {
      ;(canUseWindow as jest.Mock).mockReturnValue(true)
    })

    test('invokes tracking fns', () => {
      snowplowV2Tracking(mockAction, mockState, mockState)

      expect(mockTrackEventWithData).toHaveBeenCalledWith(mockAction, mockState, mockState, '/')
    })
  })

  describe('when window is not available', () => {
    beforeEach(() => {
      ;(canUseWindow as jest.Mock).mockReturnValue(false)
    })

    test('does not invoke tracking fns', () => {
      snowplowV2Tracking(mockAction, mockState, mockState)

      expect(mockTrackEventWithData).not.toHaveBeenCalled()
    })
  })
})
