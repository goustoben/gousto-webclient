import Immutable from 'immutable'
import * as orderActions from 'actions/order'
import { actionTypes } from 'actions/actionTypes'
import {
  multiSkipTrackContinueToPause,
  multiSkipCloseModal,
  skipMultipleBoxes,
  trackViewMultiSkip
} from '../multiSkip'

const mockDispatch = jest.fn()

const makeGetState = (multiSkip) => () => ({
  user: Immutable.fromJS({
    multiSkip: {
      isPending: false,
      ...multiSkip
    }
  })
})

const mockGetState = makeGetState()

describe('Given I am interacting with the multi skip modal', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('And multiSkipTrackContinueToPause is invoked', () => {
    test('Then the expected action is dispatched', () => {
      multiSkipTrackContinueToPause()(mockDispatch, mockGetState)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'continue_to_pause'
        }
      })
    })
  })

  describe('And trackViewMultiSkip is invoked', () => {
    test('Then the expected action is dispatched', () => {
      trackViewMultiSkip()(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'view_multiskip_boxes_screen'
        }
      })
    })
  })

  describe('When multiSkipCloseModal is invoked', () => {
    test('Then the expected actions are dispatched', () => {
      multiSkipCloseModal()(mockDispatch, mockGetState)

      expect(mockDispatch).toHaveBeenCalledTimes(3)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'recover_subscription'
        }
      })

      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: false,
        callToActions: undefined,
        deliveryDayId: undefined,
        modalType: undefined,
        offer: undefined,
        orderId: undefined,
        orderType: undefined,
        title: undefined,
        trackingData: {
          actionType: 'Order Skip',
          cms_variation: 'default',
          delivery_day_id: undefined,
          order_id: undefined,
          order_state: undefined,
          recovery_reasons: [undefined, undefined]
        },
        valueProposition: undefined
      })

      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_END,
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

      skipMultipleBoxes({ selectedOrders: mockSelectedOrders }, 'user-id')(mockDispatch, mockGetState)

      expect(cancelMultipleSpy).toHaveBeenCalledWith({
        selectedOrders: [
          { id: '123', isProjected: true },
          { id: '456', isProjected: false }],
      }, 'user-id')
    })
  })
})
