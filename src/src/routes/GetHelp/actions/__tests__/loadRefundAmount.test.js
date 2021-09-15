import Immutable from 'immutable'
import { fetchRefundAmount } from 'apis/getHelp'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { loadRefundAmount } from '../loadRefundAmount'
import * as getHelpActionsUtils from '../utils'

jest.mock('apis/getHelp')

const AMOUNT = 2.4
const LOW_AMOUNT = 1.9
const TYPE = 'credit'
const ACCESS_TOKEN = 'adfjlakjds13'

const RESPONSE = {
  status: 'ok',
  data: {
    value: AMOUNT,
    multiComplaintTotalValue: 0,
    type: TYPE,
  }
}

const RESPONSE_WITH_AUTO_ACCEPT_AMOUNT = {
  status: 'ok',
  data: {
    value: LOW_AMOUNT,
    multiComplaintTotalValue: 0,
    type: TYPE,
  }
}

const USER_ID = '1234'
const ORDER_ID = '4455'
const ACTION_TYPE = 'GET_HELP_LOAD_REFUND_AMOUNT'
const INGREDIENT_UUIDS = [
  '3c07d126-f655-437c-aa1d-c38dbbae0398',
  '488d5751-dcff-4985-88c0-bf745ff54904',
]

const STATE = {
  auth: Immutable.fromJS({ accessToken: ACCESS_TOKEN }),
  user: Immutable.fromJS({
    id: USER_ID,
  }),
  getHelp: Immutable.fromJS({
    order: {
      id: ORDER_ID,
    },
    selectedIngredients: {
      '385&3c07d126-f655-437c-aa1d-c38dbbae0398': {
        recipeId: '385',
        ingredientUuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
        label: '8ml soy sauce',
        recipeGoustoReference: '408',
        issueId: '4',
        issueName: 'Wrong Ingredients',
        issueDescription: 'assd'
      },
      '2223&488d5751-dcff-4985-88c0-bf745ff54904': {
        recipeId: '2223',
        ingredientUuid: '488d5751-dcff-4985-88c0-bf745ff54904',
        label: '40g Cornish clotted cream',
        recipeGoustoReference: '2093',
        issueId: '3',
        issueName: 'Missing Ingredients',
        issueDescription: 'ssss'
      },
    }
  })
}

const STATE_WITH_ONLY_ONE_INGREDIENT = {
  auth: Immutable.fromJS({ accessToken: ACCESS_TOKEN }),
  user: Immutable.fromJS({
    id: USER_ID,
  }),
  getHelp: Immutable.fromJS({
    order: {
      id: ORDER_ID,
    },
    selectedIngredients: {
      '385&3c07d126-f655-437c-aa1d-c38dbbae0398': {
        recipeId: '385',
        ingredientUuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
        label: '8ml soy sauce',
        recipeGoustoReference: '408',
        issueId: '4',
        issueName: 'Wrong Ingredients',
        issueDescription: 'assd'
      },
    }
  })
}

const dispatch = jest.fn()
const getState = jest.fn().mockReturnValue(STATE)
const asyncAndDispatchSpy = jest.spyOn(getHelpActionsUtils, 'asyncAndDispatch')

describe('Given loadRefundAmount action is called', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When api call returns successfully', () => {
    beforeEach(async () => {
      fetchRefundAmount.mockResolvedValueOnce(RESPONSE)
      await loadRefundAmount()(dispatch, getState)
    })

    test('the refund amount and the refund type are dispatched', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ACTION_TYPE,
        payload: {
          amount: AMOUNT,
          isAutoAccept: false,
          type: TYPE,
          totalAmount: 0,
        },
      })
    })

    test('fetchRefundAmount is called with the right params', () => {
      expect(fetchRefundAmount).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        {
          customer_id: Number(USER_ID),
          order_id: Number(ORDER_ID),
          ingredient_ids: INGREDIENT_UUIDS,
        }
      )
    })

    test('asyncAndDispatch is called with the right params', () => {
      expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          dispatch,
          actionType: ACTION_TYPE,
          errorMessage: `Failed to loadRefundAmount for orderId: ${ORDER_ID}, userId: ${USER_ID}, ingredientIds: ${INGREDIENT_UUIDS}`,
        })
      )
    })
  })

  describe('When api call returns successfully', () => {
    describe('and the refund amount and number of ingredients are lower than the max auto accept amount', () => {
      beforeEach(async () => {
        getState.mockReturnValueOnce(STATE_WITH_ONLY_ONE_INGREDIENT)

        fetchRefundAmount.mockResolvedValueOnce(RESPONSE_WITH_AUTO_ACCEPT_AMOUNT)
        await loadRefundAmount()(dispatch, getState)
      })

      test('isAutoAccept is dispatched as true', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ACTION_TYPE,
          payload: {
            amount: LOW_AMOUNT,
            isAutoAccept: true,
            type: TYPE,
            totalAmount: 0,
          },
        })
      })

      test('trackIngredientsAutoAcceptCheck is dispatched with isAutoAccept true', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.TRACKING,
          trackingData: {
            actionType: 'ssr_ingredients_auto_accept_check',
            auto_accept: true,
            is_second_complaint: false,
            seCategory: 'help',
          }
        })
      })
    })

    describe('and the refund amount is higher than the max auto accept amount ', () => {
      beforeEach(async () => {
        fetchRefundAmount.mockResolvedValueOnce(RESPONSE)
        await loadRefundAmount()(dispatch, getState)
      })

      test('isAutoAccept is dispatched as false', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ACTION_TYPE,
          payload: {
            amount: AMOUNT,
            isAutoAccept: false,
            type: TYPE,
            totalAmount: 0,
          },
        })
      })

      test('trackIngredientsAutoAcceptCheck is dispatched with isAutoAccept false', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.TRACKING,
          trackingData: {
            actionType: 'ssr_ingredients_auto_accept_check',
            auto_accept: false,
            is_second_complaint: false,
            seCategory: 'help',
          }
        })
      })
    })

    describe('and number of ingredients are more than the max auto accept amount', () => {
      beforeEach(async () => {
        getState.mockReturnValueOnce(STATE)

        fetchRefundAmount.mockResolvedValueOnce(RESPONSE_WITH_AUTO_ACCEPT_AMOUNT)
        await loadRefundAmount()(dispatch, getState)
      })

      test('isAutoAccept is dispatched as false', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ACTION_TYPE,
          payload: {
            amount: LOW_AMOUNT,
            isAutoAccept: false,
            type: TYPE,
            totalAmount: 0,
          },
        })
      })

      test('trackIngredientsAutoAcceptCheck is dispatched with isAutoAccept false', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.TRACKING,
          trackingData: {
            actionType: 'ssr_ingredients_auto_accept_check',
            auto_accept: false,
            is_second_complaint: false,
            seCategory: 'help',
          }
        })
      })
    })
  })
})
