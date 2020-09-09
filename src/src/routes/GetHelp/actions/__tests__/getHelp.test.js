import Immutable from 'immutable'
import logger from 'utils/logger'
import { fetchUserOrders } from 'apis/user'
import * as getHelpApi from 'apis/getHelp'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { safeJestMock } from '_testing/mocks'
import { actionTypes } from '../actionTypes'
import {
  getUserOrders,
  trackConfirmationCTA,
  trackDeliveryOther,
  trackDeliveryStatus,
  trackNextBoxTrackingClick,
  trackRejectRefund,
  applyDeliveryRefund,
} from '../getHelp'

jest.mock('utils/logger', () => ({
  error: jest.fn(),
}))
jest.mock('apis/user')
const applyDeliveryCompensation = safeJestMock(getHelpApi, 'applyDeliveryCompensation')
safeJestMock(logger, 'error')

const DELIVERY_COMPENSATION_ERRORS = {
  status: 'error',
  message: 'error api',
}

const USER_ID = '123'
const ORDER_ID = '456'
const COMPLAINT_CATEGORY = '789'
const REFUND_VALUE = '135'

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

describe('trackRejectRefund', () => {
  test('creates the tracking action', () => {
    const amount = '12345'

    expect(trackRejectRefund(amount)).toEqual({
      type: webClientActionTypes.TRACKING,
      trackingData: {
        actionType: 'click_declined_refund',
        amount,
      }
    })
  })
})

describe('trackConfirmationCTA', () => {
  test('creates the tracking action', () => {
    expect(trackConfirmationCTA()).toEqual({
      type: webClientActionTypes.TRACKING,
      trackingData: {
        actionType: 'click_done_refund_accepted',
      }
    })
  })
})

describe('applyDeliveryRefund', () => {
  let dispatchMock
  let getState
  const DELIVERY_REFUND_STATUS = 'ok'

  beforeEach(() => {
    dispatchMock = jest.fn()
    getState = jest.fn().mockReturnValue({
      auth: Immutable.fromJS({
        accessToken: 'acc-token',
      }),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the action is called and response is received', () => {
    beforeEach(async () => {
      applyDeliveryCompensation.mockResolvedValueOnce(DELIVERY_REFUND_STATUS)
      await applyDeliveryRefund(USER_ID, ORDER_ID, COMPLAINT_CATEGORY, REFUND_VALUE)(dispatchMock, getState)
    })

    test('it dispatches a pending action to true', () => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: webClientActionTypes.PENDING,
        key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
        value: true,
      })
    })

    test('it dispatches an error action to null', () => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: webClientActionTypes.ERROR,
        key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
        value: null,
      })
    })

    test('it dispatches the deliveryRefundStatus action correctly', () => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: actionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
        payload: DELIVERY_REFUND_STATUS
      })
    })

    test('it dispatches a pending action to false', () => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: webClientActionTypes.PENDING,
        key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
        value: false,
      })
    })
  })

  describe('Given the action is called and an api call throws an error', () => {
    beforeEach(async () => {
      applyDeliveryCompensation.mockRejectedValueOnce(DELIVERY_COMPENSATION_ERRORS)
      await applyDeliveryRefund(USER_ID, ORDER_ID, COMPLAINT_CATEGORY, REFUND_VALUE)(dispatchMock, getState)
    })

    test('it dispatches a pending action to true', () => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: webClientActionTypes.PENDING,
        key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
        value: true,
      })
    })

    test('it dispatches an error action with the error message', () => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: webClientActionTypes.ERROR,
        key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
        value: DELIVERY_COMPENSATION_ERRORS.message,
      })
    })

    test('it logs the error', () => {
      expect(logger.error).toHaveBeenCalledWith(DELIVERY_COMPENSATION_ERRORS)
    })

    test('it dispatches a pending action to false', () => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: webClientActionTypes.PENDING,
        key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
        value: false,
      })
    })
  })
})
