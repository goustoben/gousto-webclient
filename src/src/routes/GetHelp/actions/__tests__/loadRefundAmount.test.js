import Immutable from 'immutable'
import { fetchRefundAmount } from 'apis/getHelp'
import { loadRefundAmount } from '../loadRefundAmount'
import * as getHelpActionsUtils from '../utils'

jest.mock('apis/getHelp')

const AMOUNT = 1.4
const TYPE = 'credit'
const ACCESS_TOKEN = 'adfjlakjds13'

const RESPONSE = {
  status: 'ok',
  data: {
    value: AMOUNT,
    num_orders: 4,
    num_orders_compensated: 0,
    multi_complaint_total_value: 0,
    type: TYPE,
    key_ingredients: [],
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
          type: TYPE,
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
})
