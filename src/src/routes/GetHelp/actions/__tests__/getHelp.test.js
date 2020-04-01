import Immutable from 'immutable'
import logger from 'utils/logger'
import { fetchUserOrders } from 'apis/user'
import {
  getUserOrders,
  trackDeliveryOther,
  trackDeliveryStatus,
  trackNextBoxTrackingClick,
} from '../getHelp'

jest.mock('utils/logger', () => ({
  error: jest.fn(),
}))
jest.mock('apis/user')

describe('given trackDeliveryOther is called', () => {
  let trackingData

  beforeEach(() => {
    trackingData = trackDeliveryOther().trackingData
  })

  test('the trackingData is being set correctly', () => {
    expect(trackingData).toEqual({
      actionType: 'GetHelpTrackDeliveryOther Clicked',
    })
  })
})

describe('given trackDeliveryStatus is called', () => {
  let trackingData

  beforeEach(() => {
    trackingData = trackDeliveryStatus().trackingData
  })

  test('the trackingData is being set correctly', () => {
    expect(trackingData).toEqual({
      actionType: 'GetHelpTrackDeliveryStatus Clicked',
    })
  })
})

describe('given trackNextBoxTrackingClick is called', () => {
  let trackingData

  beforeEach(() => {
    trackingData = trackNextBoxTrackingClick('o123').trackingData
  })

  test('the trackingData is being set correctly', () => {
    expect(trackingData).toEqual({
      actionType: 'GetHelpTrackMyBox Clicked',
      orderId: 'o123',
    })
  })
})

describe('given getUserOrders is called', () => {
  let dispatch
  describe('when it succeeds', () => {
    const userOrdersData = {
      id: '1',
      userId: 'u1',
      deliveryDate: 'YYYY-MM-DD HH:mm:ss',
      deliverySlot: {
        deliveryEnd: '18:59:59',
        deliveryStart: '08:00:00'
      },
    }

    beforeEach(() => {
      dispatch = jest.fn()

      const getState = jest.fn().mockReturnValue({
        auth: Immutable.fromJS({
          accessToken: 'acc-token',
        }),
      })

      fetchUserOrders.mockResolvedValueOnce({
        data: [
          userOrdersData,
        ]
      })

      getUserOrders()(dispatch, getState)
    })

    test('the user orders is being dispatched correctly', () => {
      expect(dispatch.mock.calls[2][0]).toEqual({
        type: 'GET_HELP_LOAD_ORDERS',
        orders: [userOrdersData]
      })
    })
  })

  describe('when it fails', () => {
    beforeEach(() => {
      dispatch = jest.fn()

      const getState = jest.fn().mockReturnValue({
        auth: Immutable.fromJS({
          accessToken: 'acc-token',
        }),
      })

      fetchUserOrders.mockRejectedValueOnce('error')

      getUserOrders()(dispatch, getState)
    })

    test('logger is called correctly', () => {
      expect(logger.error).toHaveBeenCalledWith('error')
    })
  })
})
