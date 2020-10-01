import Immutable from 'immutable'
import { browserHistory } from 'react-router'
import logger from 'utils/logger'
import { fetchDeliveryConsignment } from 'apis/deliveries'
import { fetchUserOrders } from 'apis/user'
import * as getHelpApi from 'apis/getHelp'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { client as clientRoutes } from 'config/routes'
import { safeJestMock } from '_testing/mocks'
import * as getHelpActionsUtils from '../utils'
import {
  applyDeliveryRefund,
  loadTrackingUrl,
  getUserOrders,
  trackConfirmationCTA,
  trackDeliveryOther,
  trackDeliveryStatus,
  trackNextBoxTrackingClick,
  trackRejectRefund,
} from '../getHelp'

jest.mock('utils/logger', () => ({
  error: jest.fn(),
}))
jest.mock('apis/user')
jest.mock('apis/deliveries')
const applyDeliveryCompensation = safeJestMock(getHelpApi, 'applyDeliveryCompensation')
const asyncAndDispatchSpy = jest.spyOn(getHelpActionsUtils, 'asyncAndDispatch')
safeJestMock(logger, 'error')

const DELIVERY_COMPENSATION_ERRORS = {
  status: 'error',
  message: 'error api',
}

describe('GetHelp action generators and thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn().mockReturnValue({
    auth: Immutable.fromJS({
      accessToken: 'acc-token',
    }),
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

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
    const USER_ID = '123'
    const ORDER_ID = '456'
    const COMPLAINT_CATEGORY = '789'
    const REFUND_VALUE = '135'
    const DELIVERY_REFUND_STATUS = 'ok'
    browserHistory.push = jest.fn()

    describe('Given the action is called and response is received', () => {
      beforeEach(async () => {
        applyDeliveryCompensation.mockResolvedValueOnce(DELIVERY_REFUND_STATUS)
        await applyDeliveryRefund(USER_ID, ORDER_ID, COMPLAINT_CATEGORY, REFUND_VALUE)(dispatch, getState)
      })

      test('it dispatches a pending action to true', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.PENDING,
          key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
          value: true,
        })
      })

      test('it dispatches an error action to null', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.ERROR,
          key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
          value: null,
        })
      })

      test('it redirects to the GetHelp - Confirmation page', () => {
        const { index, confirmation } = clientRoutes.getHelp

        expect(browserHistory.push).toHaveBeenCalledWith(`${index}/${confirmation}`)
      })

      test('it dispatches a pending action to false', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.PENDING,
          key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
          value: false,
        })
      })
    })

    describe('Given the action is called and an api call throws an error', () => {
      beforeEach(async () => {
        applyDeliveryCompensation.mockRejectedValueOnce(DELIVERY_COMPENSATION_ERRORS)
        await applyDeliveryRefund(USER_ID, ORDER_ID, COMPLAINT_CATEGORY, REFUND_VALUE)(dispatch, getState)
      })

      test('it dispatches a pending action to true', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.PENDING,
          key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
          value: true,
        })
      })

      test('it dispatches an error action with the error message', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.ERROR,
          key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
          value: DELIVERY_COMPENSATION_ERRORS.message,
        })
      })

      test('it does not redirect', () => {
        expect(browserHistory.push).not.toHaveBeenCalled()
      })

      test('it logs the error', () => {
        expect(logger.error).toHaveBeenCalledWith({
          errors: [DELIVERY_COMPENSATION_ERRORS],
          message: `Failed to applyDeliveryRefund of £${REFUND_VALUE} for userId: ${USER_ID}, orderId: ${ORDER_ID}`
        })
      })

      test('it dispatches a pending action to false', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.PENDING,
          key: webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
          value: false,
        })
      })
    })
  })

  describe('When the loadTrackingUrl action is called', () => {
    const ORDER_ID = '123'
    const TRACKING_URL = 'https://nice-courier.com/order/12345'
    const CONSIGNMENT_RESPONSE = {
      data: [{ trackingUrl: TRACKING_URL }]
    }

    beforeEach(() => {
      fetchDeliveryConsignment.mockResolvedValueOnce(CONSIGNMENT_RESPONSE)
      loadTrackingUrl(ORDER_ID)(dispatch, getState)
    })

    test('the trackingURL fetched by fetchDeliveryConsignment is dispatched with the right action type', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_HELP_LOAD_TRACKING_URL',
        payload: { trackingUrl: TRACKING_URL },
      })
    })

    test('asyncAndDispatch is called with the right parameters', () => {
      expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          dispatch,
          actionType: 'GET_HELP_LOAD_TRACKING_URL',
          errorMessage: `Failed to loadTrackingUrl for orderId: ${ORDER_ID}`
        })
      )
    })
  })
})
