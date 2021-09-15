import Immutable from 'immutable'
import { browserHistory } from 'react-router'
import logger from 'utils/logger'
import { fetchDeliveryConsignment } from 'apis/deliveries'
import { fetchOrder } from 'apis/orders'
import { fetchUserOrders } from 'apis/user'
import * as getHelpApi from 'apis/getHelp'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { client as clientRoutes } from 'config/routes'
import { safeJestMock } from '_testing/mocks'
import * as menuApi from '../../apis/menu'
import * as getHelpActionsUtils from '../utils'
import {
  applyDeliveryRefund,
  getUserOrders,
  loadOrderById,
  loadOrderAndRecipesByIds,
  loadTrackingUrl,
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
  trackHelpPreLoginModalDisplayed,
  trackIngredientReasonsConfirmed,
  trackMassIssueAlertDisplayed,
  trackNextBoxTrackingClick,
  trackRecipeCardClick,
  trackRecipeCardGetInTouchClick,
  trackRefundFAQClick,
  trackIngredientsAutoAcceptCheck,
  trackIngredientsGetInTouchClick,
  trackSelectDeliveryCategory,
  trackSelectIngredient,
  validateDeliveryAction,
  validateLatestOrder,
} from '../getHelp'
import { transformRecipesWithIngredients } from '../transformers/recipeTransform'

jest.mock('utils/logger', () => ({
  error: jest.fn(),
}))
jest.mock('apis/deliveries')
jest.mock('apis/orders')
jest.mock('apis/user')
jest.mock('../transformers/recipeTransform')
const applyDeliveryCompensation = safeJestMock(getHelpApi, 'applyDeliveryCompensation')
const asyncAndDispatchSpy = jest.spyOn(getHelpActionsUtils, 'asyncAndDispatch')
const fetchRecipesWithIngredients = safeJestMock(menuApi, 'fetchRecipesWithIngredients')
const validateDelivery = safeJestMock(getHelpApi, 'validateDelivery')
const validateOrder = safeJestMock(getHelpApi, 'validateOrder')

const ACCESS_TOKEN = 'access-token'
const GET_STATE_PARAMS = {
  auth: Immutable.fromJS({ accessToken: ACCESS_TOKEN }),
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

  describe('loadOrderAndRecipesByIds', () => {
    const MOCK_RECIPES = [
      {
        id: '2871',
        title: 'Cheesy Pizza-Topped Chicken With Mixed Salad',
        ingredients: [
          { uuid: '3139eeba-c3a1-477c-87e6-50ba5c3d21e0', label: '1 shallot' },
          { uuid: 'd93301c4-2563-4b9d-b829-991800ca87b4', label: 'mozzarella' },
        ],
        goustoReference: '2145',
      },
      {
        id: '1783',
        title: 'Sesame Tofu Nuggets, Wedges & Spicy Dipping Sauce',
        ingredients: [
          { uuid: 'f0273bb0-bb2b-46e5-8ce4-7e09f413c97b', label: '1 spring onion' },
          { uuid: '4cd305c4-d372-4d9f-8110-dae88209ce57', label: '1 carrot' },
        ],
        goustoReference: '5678',
      },
    ]

    const FETCH_ORDER_RESPONSE = {
      data: {
        recipeItems: [
          { recipeId: '2871', recipeUuid: 'uuid1', recipeGoustoReference: '2145' },
          { recipeId: '1783', recipeUuid: 'uuid2', recipeGoustoReference: '5678' },
        ],
        deliveryDate: '2021-05-01 00:00:00',
        deliverySlot: {
          deliveryEnd: '18:59:59',
          deliveryStart: '08:00:00',
        },
      }
    }

    const FETCH_RECIPES_RESPONSE = {
      data: [],
      included: [],
    }

    const ORDER_PAYLOAD = {
      recipeItems: ['2871', '1783'],
      deliveryDate: '2021-05-01 00:00:00',
      deliverySlot: {
        deliveryEnd: '18:59:59',
        deliveryStart: '08:00:00',
      },
    }

    const ORDER_ID = '12345'

    describe('when the action is called and the order details are not in the store', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({ accessToken: ACCESS_TOKEN }),
          features: Immutable.fromJS({ ssrShorterCompensationPeriod: { value: false } }),
          getHelp: Immutable.fromJS({
            order: {
              id: ORDER_ID,
              recipeItems: [],
            },
            recipes: [],
            ingredients: [],
          })
        })
        fetchOrder.mockResolvedValueOnce(FETCH_ORDER_RESPONSE)
        fetchRecipesWithIngredients.mockResolvedValueOnce(FETCH_RECIPES_RESPONSE)

        await loadOrderAndRecipesByIds(ORDER_ID)(dispatch, getState)
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      test('fetchOrder is called', () => {
        expect(fetchOrder).toHaveBeenCalled()
      })

      test('fetchRecipesWithIngredients is called', () => {
        expect(fetchRecipesWithIngredients).toHaveBeenCalledWith(['uuid1', 'uuid2'])
      })

      test('dispatch is called with the right action type and payload', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS',
          payload: {
            order: ORDER_PAYLOAD,
            recipes: transformRecipesWithIngredients(FETCH_RECIPES_RESPONSE, FETCH_RECIPES_RESPONSE.included),
          },
        })
      })

      test('asyncAndDispatch is called with the correct parameters', () => {
        expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            dispatch,
            actionType: 'GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS',
            errorMessage: `Failed to loadOrderAndRecipesByIds for orderId: ${ORDER_ID}`,
          })
        )
      })
    })

    describe('when the action is called and the order details are in the store', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({ accessToken: ACCESS_TOKEN }),
          features: Immutable.fromJS({ ssrShorterCompensationPeriod: { value: false } }),
          getHelp: Immutable.fromJS({
            order: {
              id: ORDER_ID,
              recipeItems: ['2871', '1783'],
            },
            recipes: [ MOCK_RECIPES[0], MOCK_RECIPES[1] ],
          })
        })
        await loadOrderAndRecipesByIds(ORDER_ID)(dispatch, getState)
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      test('fetchOrder is not called ', () => {
        expect(fetchOrder).not.toHaveBeenCalled()
      })

      test('fetchRecipesWithIngredients is not called', () => {
        expect(fetchRecipesWithIngredients).not.toHaveBeenCalled()
      })

      test('dispatch is called with the right action type and payload', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS',
          payload: {
            order: getState().getHelp.get('order').toJS(),
            recipes: getState().getHelp.get('recipes').toJS(),
          },
        })
      })

      test('asyncAndDispatch is called with the correct parameters', () => {
        expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            dispatch,
            actionType: 'GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS',
            errorMessage: `Failed to loadOrderAndRecipesByIds for orderId: ${ORDER_ID}`,
          })
        )
      })
    })
  })

  describe('When the loadOrderById action is called and the API call succeeds', () => {
    const FETCH_ORDER_RESPONSE = {
      data: {
        recipeItems: [{ recipeId: '2871', recipeGoustoReference: '2733' }],
        deliveryDate: '2021-05-01 00:00:00',
        deliverySlot: {
          deliveryEnd: '18:59:59',
          deliveryStart: '08:00:00',
        },
      }
    }

    const ORDER_ID = '12345'
    const PARAMS = {
      accessToken: ACCESS_TOKEN,
      orderId: ORDER_ID,
    }

    beforeEach(() => {
      fetchOrder.mockResolvedValueOnce(FETCH_ORDER_RESPONSE)
      loadOrderById(PARAMS)(dispatch, getState)
    })

    test('the order fetched by fetchOrder is dispatched with the right action type', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_HELP_LOAD_ORDERS_BY_ID',
        payload: { order: FETCH_ORDER_RESPONSE.data },
      })
    })

    test('asyncAndDispatch is called with the right parameters', () => {
      expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          dispatch,
          actionType: 'GET_HELP_LOAD_ORDERS_BY_ID',
          errorMessage: `Failed to loadOrderById for orderId: ${ORDER_ID}`,
        })
      )
    })
  })

  describe('When the loadOrderById action is called and the API call errors', () => {
    const ORDER_ID = '12345'
    const PARAMS = {
      accessToken: ACCESS_TOKEN,
      orderId: ORDER_ID,
    }
    const FETCH_ORDER_ERROR = {
      status: 'error',
      message: 'error order api',
    }

    beforeEach(() => {
      fetchOrder.mockRejectedValueOnce(FETCH_ORDER_ERROR)
    })

    test('returns an expected error object', async () => {
      await expect(loadOrderById(PARAMS)(dispatch, getState)).rejects.toBe(FETCH_ORDER_ERROR)
    })
  })

  describe('trackIngredientsGetInTouchClick with autoAccept true', () => {
    beforeEach(() => {
      const PARAMS = {
        ...GET_STATE_PARAMS,
        getHelp: Immutable.fromJS({
          isAutoAccept: true,
          compensation: {
            totalAmount: 0,
            amount: 4
          }
        })
      }
      getState = jest.fn().mockReturnValue(PARAMS)
    })

    test('creates the tracking action', () => {
      trackIngredientsGetInTouchClick()(dispatch, getState)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_ingredients_click_get_in_touch',
          amount: 4,
          auto_accept: true,
          is_second_complaint: false,
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackIngredientsGetInTouchClick with autoAccept false', () => {
    beforeEach(() => {
      const PARAMS = {
        ...GET_STATE_PARAMS,
        getHelp: Immutable.fromJS({
          isAutoAccept: false,
          compensation: {
            totalAmount: 0,
            amount: 4
          }
        })
      }
      getState = jest.fn().mockReturnValue(PARAMS)
    })

    test('creates the tracking action', () => {
      trackIngredientsGetInTouchClick()(dispatch, getState)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_ingredients_click_get_in_touch',
          amount: 4,
          auto_accept: false,
          is_second_complaint: false,
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackIngredientsGetInTouchClick with is_second_complaint true', () => {
    beforeEach(() => {
      const PARAMS = {
        ...GET_STATE_PARAMS,
        getHelp: Immutable.fromJS({
          isAutoAccept: false,
          compensation: {
            totalAmount: 6,
            amount: 4
          }
        })
      }
      getState = jest.fn().mockReturnValue(PARAMS)
    })

    test('creates the tracking action', () => {
      trackIngredientsGetInTouchClick()(dispatch, getState)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_ingredients_click_get_in_touch',
          amount: 4,
          auto_accept: false,
          is_second_complaint: true,
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackIngredientsAutoAcceptCheck', () => {
    const IS_AUTO_ACCEPT = 'true or false'
    const IS_MULTI_COMPLAINT = 'true or false'

    test('creates the tracking action with the right isAutoAccept and isMultiComplaint values', () => {
      expect(trackIngredientsAutoAcceptCheck(IS_AUTO_ACCEPT, IS_MULTI_COMPLAINT)).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_ingredients_auto_accept_check',
          auto_accept: IS_AUTO_ACCEPT,
          is_second_complaint: IS_MULTI_COMPLAINT,
          seCategory: 'help',
        }
      })
    })
  })

  describe('trackConfirmationCTA', () => {
    beforeEach(() => {
      const PARAMS = {
        ...GET_STATE_PARAMS,
        getHelp: Immutable.fromJS({
          isAutoAccept: false,
          compensation: {
            totalAmount: 0
          }
        })
      }
      getState = jest.fn().mockReturnValue(PARAMS)
    })

    test('creates the tracking action with isAutoAccept and isMultiComplaint false', () => {
      trackConfirmationCTA()(dispatch, getState)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_ingredients_done_click',
          auto_accept: false,
          is_second_complaint: false,
          seCategory: 'help'
        }
      })
    })

    describe('when isAutoAccept true', () => {
      beforeEach(() => {
        const PARAMS = {
          ...GET_STATE_PARAMS,
          getHelp: Immutable.fromJS({
            isAutoAccept: true,
            compensation: {
              totalAmount: 0
            }
          })
        }
        getState = jest.fn().mockReturnValue(PARAMS)
      })

      test('creates the tracking action with the auto_accept true', () => {
        trackConfirmationCTA()(dispatch, getState)
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: webClientActionTypes.TRACKING,
          trackingData: {
            actionType: 'ssr_ingredients_done_click',
            auto_accept: true,
            is_second_complaint: false,
            seCategory: 'help'
          }
        })
      })
    })

    describe('when it is a multi complaint', () => {
      beforeEach(() => {
        const PARAMS = {
          ...GET_STATE_PARAMS,
          getHelp: Immutable.fromJS({
            isAutoAccept: false,
            compensation: {
              totalAmount: 2
            }
          })
        }
        getState = jest.fn().mockReturnValue(PARAMS)
      })

      test('creates the tracking action with is_second_complaint set to true', () => {
        trackConfirmationCTA()(dispatch, getState)
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: webClientActionTypes.TRACKING,
          trackingData: {
            actionType: 'ssr_ingredients_done_click',
            auto_accept: false,
            is_second_complaint: true,
            seCategory: 'help'
          }
        })
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

  describe('trackRefundFAQClick', () => {
    const COMPENSATION_AMOUNT = 7.89
    const ARTICLE_NAME = 'An article title'
    const IS_AUTO_ACCEPT = 'true or false'

    test('creates the tracking action with the right isAutoAccept value', () => {
      expect(trackRefundFAQClick({
        compensationAmount: COMPENSATION_AMOUNT,
        articleName: ARTICLE_NAME,
        isAutoAccept: IS_AUTO_ACCEPT,
      })).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: 'ssr_ingredients_open_refund_article',
          seCategory: 'help',
          amount: COMPENSATION_AMOUNT,
          article_name: ARTICLE_NAME,
          auto_accept: IS_AUTO_ACCEPT,
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
        accessToken: ACCESS_TOKEN,
        costumerId: '777',
        orderId: '888',
      }
      const validationResponse = {
        valid: true,
        massIssueIneligibleIngredientUuids: ['a', 'b'],
        otherIssueIneligibleIngredientUuids: ['c', 'd']
      }
      const expectedParams = [
        ACCESS_TOKEN,
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
            massIssueIneligibleIngredientUuids: validationResponse.massIssueIneligibleIngredientUuids,
            otherIssueIneligibleIngredientUuids: validationResponse.otherIssueIneligibleIngredientUuids,
          })
        })
      })
    })
  })
})
