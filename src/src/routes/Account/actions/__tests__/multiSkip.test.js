import * as orderActions from 'actions/order'
import {
  multiSkipTrackContinueToPause,
  multiSkipCloseModal,
  skipMultipleBoxes
} from '../multiSkip'

const mockDispatch = jest.fn()

describe('Given I am interacting with the multi skip modal', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('And multiSkipTrackContinueToPause is invoked', () => {
    test('Then the expected action is dispatched', () => {
      multiSkipTrackContinueToPause()(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'continue_to_pause'
        }
      })
    })
  })

  describe('And multiSkipCloseModal is invoked', () => {
    test('Then the expected actions are dispatched', () => {
      multiSkipCloseModal()(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledTimes(2)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'recover_subscription'
        }
      })

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE',
        visible: false
      })
    })
  })

  describe('And skipMultipleBoxes is invoked', () => {
    test('Then the expected actions are dispatched', async () => {
      const cancelMultipleSpy = jest.spyOn(orderActions, 'cancelMultipleBoxes')

      const mockSelectedOrders = [
        {
          id: '123',
          isProjected: true,
        },
        {
          id: '456',
          isProjected: false
        }
      ]

      skipMultipleBoxes({ selectedOrders: mockSelectedOrders })(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'recover_subscription'
        }
      })

      expect(cancelMultipleSpy).toHaveBeenCalledWith({
        selectedOrders: [
          { id: '123', isProjected: true },
          { id: '456', isProjected: false }]
      })
    })
  })
})
