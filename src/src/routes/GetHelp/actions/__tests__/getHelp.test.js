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
  trackAcceptRefundInSSRDeliveries,
  trackClickGetHelpWithThisBox,
  trackClickGetInTouchInSSRDeliveries,
  trackClickMyGoustoInSSRDeliveries,
  trackClickTrackMyBoxInSSRDeliveries,
  trackConfirmationCTA,
  trackContinueAsNewCustomer,
  trackDeclineRefundInSSRDeliveries,
  trackDeliveryOther,
  trackDeliveryStatus,
  trackDeselectIngredient,
  trackIngredientReasonsConfirmed,
  trackHelpPreLoginModalDisplayed,
  trackMassIssueAlertDisplayed,
  trackNextBoxTrackingClick,
  trackRecipeCardClick,
  trackRecipeCardGetInTouchClick,
  trackRejectRefund,
  trackSelectDeliveryCategory,
  trackSelectIngredient,
  validateDeliveryAction,
  validateLatestOrder,
} from '../getHelp'

jest.mock('utils/logger', () => ({
  error: jest.fn(),
}))
jest.mock('apis/user')
jest.mock('apis/deliveries')
const applyDeliveryCompensation = safeJestMock(getHelpApi, 'applyDeliveryCompensation')
const asyncAndDispatchSpy = jest.spyOn(getHelpActionsUtils, 'asyncAndDispatch')
const validateDelivery = safeJestMock(getHelpApi, 'validateDelivery')
const validateOrder = safeJestMock(getHelpApi, 'validateOrder')

const GET_STATE_PARAMS = {
  auth: Immutable.fromJS({ accessToken: 'access-token' }),
  features: Immutable.fromJS({ ssrShorterCompensationPeriod: { value: false } }),
}

safeJestMock(logger, 'error')

const DELIVERY_COMPENSATION_ERRORS = {
  status: 'error',
  message: 'error api',
}

describe('GetHelp action generators and thunks', () => {
  const dispatch = jest.fn()
  let getState = jest.fn().mockReturnValue(GET_STATE_PARAMS)

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
          actionType: 'ssr_ingredients_decline_refund',
          amount,
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackConfirmationCTA', () => {
    test('creates the tracking action', () => {
      expect(trackConfirmationCTA()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_click_done_refund_accepted',
        }
      })
    })
  })

  describe('trackHelpPreLoginModalDisplayed', () => {
    test('creates the tracking action', () => {
      expect(trackHelpPreLoginModalDisplayed()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'help_login_modal_displayed',
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackClickGetHelpWithThisBox', () => {
    const ORDER_ID = '789'

    test('creates the tracking action', () => {
      expect(trackClickGetHelpWithThisBox(ORDER_ID)).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'click_get_help_with_this_box',
          order_id: ORDER_ID,
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackContinueAsNewCustomer', () => {
    test('creates the tracking action', () => {
      expect(trackContinueAsNewCustomer()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'help_login_modal_click_continue_new',
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackMassIssueAlertDisplayed', () => {
    test('creates the tracking action', () => {
      expect(trackMassIssueAlertDisplayed()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_ingredients_supply_issues_message_displayed',
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackIngredientReasonsConfirmed', () => {
    const TRACKING_DATA = [
      {
        recipeId: '123',
        ingredientName: 'onion',
      },
      {
        recipeId: '456',
        ingredientName: 'garlic',
      },
    ]

    test('creates the tracking action', () => {
      expect(trackIngredientReasonsConfirmed(TRACKING_DATA)).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_ingredients_reasons_confirmed',
          seCategory: 'help',
          selected_ingredients: TRACKING_DATA,
        }
      })
    })
  })

  describe('trackSelectIngredient', () => {
    const SELECTED_INGREDIENT = 'onion'

    test('creates the tracking action', () => {
      expect(trackSelectIngredient(SELECTED_INGREDIENT)).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_select_ingredient',
          seCategory: 'help',
          ingredient_name: SELECTED_INGREDIENT,
        }
      })
    })
  })

  describe('trackDeselectIngredient', () => {
    const DESELECTED_INGREDIENT = '1 carrot'

    test('creates the tracking action', () => {
      expect(trackDeselectIngredient(DESELECTED_INGREDIENT)).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_deselect_ingredient',
          seCategory: 'help',
          ingredient_name: DESELECTED_INGREDIENT,
        }
      })
    })
  })

  describe('trackRecipeCardClick', () => {
    const RECIPE_ID = '12345'

    test('creates the tracking action', () => {
      expect(trackRecipeCardClick(RECIPE_ID)).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_click_view_recipe',
          seCategory: 'help',
          recipe_id: RECIPE_ID,
        }
      })
    })
  })

  describe('trackRecipeCardGetInTouchClick', () => {
    test('creates the tracking action', () => {
      expect(trackRecipeCardGetInTouchClick()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_recipes_click_get_in_touch',
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackSelectDeliveryCategory', () => {
    const DELIVERY_CATEGORY = 'my_box_didnt_arrive'

    test('creates the tracking action', () => {
      expect(trackSelectDeliveryCategory(DELIVERY_CATEGORY)).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_deliveries_select_category',
          seCategory: 'help',
          category_name: DELIVERY_CATEGORY
        }
      })
    })
  })

  describe('trackClickMyGoustoInSSRDeliveries', () => {
    test('creates the tracking action', () => {
      expect(trackClickMyGoustoInSSRDeliveries()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_deliveries_click_view_my_gousto',
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackClickTrackMyBoxInSSRDeliveries', () => {
    test('creates the tracking action', () => {
      expect(trackClickTrackMyBoxInSSRDeliveries()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_deliveries_click_track_my_box',
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackClickGetInTouchInSSRDeliveries', () => {
    test('creates the tracking action', () => {
      expect(trackClickGetInTouchInSSRDeliveries()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_deliveries_click_get_in_touch',
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackAcceptRefundInSSRDeliveries', () => {
    test('creates the tracking action', () => {
      expect(trackAcceptRefundInSSRDeliveries()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_deliveries_accept_refund',
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackDeclineRefundInSSRDeliveries', () => {
    test('creates the tracking action', () => {
      expect(trackDeclineRefundInSSRDeliveries()).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_deliveries_decline_refund',
          seCategory: 'help',
        }
      })
    })
  })

  describe('applyDeliveryRefund', () => {
    const USER_ID = '123'
    const ORDER_ID = '456'
    const COMPLAINT_CATEGORY = '789'
    const DELIVERY_REFUND_STATUS = 'ok'
    browserHistory.push = jest.fn()

    describe('Given the action is called and response is received', () => {
      beforeEach(async () => {
        applyDeliveryCompensation.mockResolvedValueOnce(DELIVERY_REFUND_STATUS)
        await applyDeliveryRefund(USER_ID, ORDER_ID, COMPLAINT_CATEGORY)(dispatch, getState)
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
        await applyDeliveryRefund(USER_ID, ORDER_ID, COMPLAINT_CATEGORY)(dispatch, getState)
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
          message: `Failed to applyDeliveryRefund for userId: ${USER_ID}, orderId: ${ORDER_ID}`
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
  describe('When the validateDeliveryAction action is called and the API call succeeds', () => {
    const CUSTOMER_ID = '135'
    const ORDER_ID = '456'
    const COMPENSATION_AMOUNT = 25
    const VALIDATION_RESPONSE = {
      data: { compensation: COMPENSATION_AMOUNT }
    }

    beforeEach(() => {
      validateDelivery.mockResolvedValueOnce(VALIDATION_RESPONSE)
      validateDeliveryAction(CUSTOMER_ID, ORDER_ID)(dispatch, getState)
    })

    test('the delivery validation fetched by validateDelivery is dispatched with the right action type', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_HELP_VALIDATE_DELIVERY',
        payload: { compensation: COMPENSATION_AMOUNT, isValid: true }
      })
    })

    test('asyncAndDispatch is called with the right parameters', () => {
      expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          dispatch,
          actionType: 'GET_HELP_VALIDATE_DELIVERY',
          errorMessage: `Delivery validation errored for customerId: ${CUSTOMER_ID}, orderId: ${ORDER_ID}`
        })
      )
    })
  })

  describe('When the validateDeliveryAction action is called and the API call errors', () => {
    const CUSTOMER_ID = '135'
    const ORDER_ID = '456'

    beforeEach(() => {
      validateDelivery.mockRejectedValueOnce({
        status: 'error',
        message: 'error validate api',
      })
      validateDeliveryAction(CUSTOMER_ID, ORDER_ID)(dispatch, getState)
    })

    test('dispatches with the right action type, setting compensation to null and indicating that validation did not pass', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_HELP_VALIDATE_DELIVERY',
        payload: { compensation: null, isValid: false }
      })
    })
  })
  describe('ValidateLatestOrder action', () => {
    describe('when it succeeds', () => {
      const params = {
        accessToken: 'user-access-token',
        costumerId: '777',
        orderId: '888',
      }
      const validationResponse = {
        valid: true,
        ineligibleIngredientUuids: ['a', 'b'],
      }
      const expectedParams = [
        'user-access-token',
        {
          customer_id: 777,
          order_id: 888,
          features: [],
        }
      ]

      beforeEach(() => {
        validateOrder.mockResolvedValueOnce({
          data: validationResponse
        })
      })

      describe('when validateLatestOrder is called', () => {
        beforeEach(() => {
          validateLatestOrder(params)(dispatch, getState)
        })

        test('the validateOrder is being called correctly', () => {
          expect(validateOrder).toHaveBeenCalledWith(...expectedParams)
        })

        test('the ineligible ingredient uuids are dispatched correctly', () => {
          expect(dispatch).toHaveBeenCalledWith({
            type: 'GET_HELP_VALIDATE_ORDER',
            ineligibleIngredientUuids: validationResponse.ineligibleIngredientUuids,
          })
        })
      })

      describe('when ssrShorterCompensationPeriod feature is turned on', () => {
        beforeEach(async () => {
          getState = jest.fn().mockReturnValueOnce({
            ...GET_STATE_PARAMS,
            features: Immutable.fromJS({ ssrShorterCompensationPeriod: { value: true } }),
          })

          await validateLatestOrder(params)(dispatch, getState)
        })

        test('the validateOrder has ssrShorterCompensationPeriod attached to the body request', () => {
          const [accessToken, body] = expectedParams
          expect(validateOrder).toHaveBeenCalledWith(accessToken, {
            ...body,
            features: ['ssrShorterCompensationPeriod'],
          })
        })
      })
    })
  })
})
