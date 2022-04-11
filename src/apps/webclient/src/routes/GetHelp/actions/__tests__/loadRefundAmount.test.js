import { safeJestMock } from '_testing/mocks'
import * as authSelectors from 'selectors/auth'
import * as userSelectors from 'selectors/user'
import * as fetchRefundApi from 'apis/getHelp'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { loadRefundAmount } from '../loadRefundAmount'
import * as getHelpSelectors from '../../selectors/selectors'
import * as AutoAcceptEnabledFeature from '../../../../selectors/features'
import * as getHelpActionsUtils from '../utils'

const getAccessToken = safeJestMock(authSelectors, 'getAccessToken')
const getUserId = safeJestMock(userSelectors, 'getUserId')
const fetchRefundAmount = safeJestMock(fetchRefundApi, 'fetchRefundAmount')
const getOrderId = safeJestMock(getHelpSelectors, 'getOrderId')
const getSelectedIngredients = safeJestMock(getHelpSelectors, 'getSelectedIngredients')
const getIsAutoAcceptEnabled = safeJestMock(AutoAcceptEnabledFeature, 'getIsAutoAcceptEnabled')

const ACCESS_TOKEN = 'adfjlakjds13'
const ACTION_TYPE = 'GET_HELP_LOAD_REFUND_AMOUNT'
const AMOUNT = 2.4
const LOW_AMOUNT = 1.9
const INGREDIENT_UUID = [
  '3c07d126-f655-437c-aa1d-c38dbbae0398',
]
const INGREDIENT_UUIDS = [
  '3c07d126-f655-437c-aa1d-c38dbbae0398',
  '488d5751-dcff-4985-88c0-bf745ff54904',
]
const ORDER_ID = '4455'
const TYPE = 'credit'
const USER_ID = '1234'

const RESPONSE = {
  status: 'ok',
  data: {
    value: AMOUNT,
    multiComplaintTotalValue: 5,
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

const SELECTED_INGREDIENTS = {
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
const MULTIPLE_SELECTED_INGREDIENTS = {
  ...SELECTED_INGREDIENTS,
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

const dispatch = jest.fn()
const getState = jest.fn()
const asyncAndDispatchSpy = jest.spyOn(getHelpActionsUtils, 'asyncAndDispatch')

jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: () => 'local',
  getProtocol: () => 'http:'
}))

describe('loadRefundAmount', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    getAccessToken.mockReturnValue(ACCESS_TOKEN)
    getUserId.mockReturnValue(USER_ID)
    getOrderId.mockReturnValue(ORDER_ID)
    getSelectedIngredients.mockReturnValue(SELECTED_INGREDIENTS)
  })

  test('fetchRefundAmount is called with the right params', async () => {
    await loadRefundAmount()(dispatch, getState)

    expect(fetchRefundAmount).toHaveBeenCalledWith(
      ACCESS_TOKEN,
      {
        customer_id: Number(USER_ID),
        order_id: Number(ORDER_ID),
        ingredient_ids: INGREDIENT_UUID,
      }
    )
  })

  describe('When isAutoAcceptEnabled flag is false', () => {
    beforeEach(() => {
      getIsAutoAcceptEnabled.mockReturnValue(false)
    })

    describe('and isMultiComplaint is false', () => {
      beforeEach(async () => {
        fetchRefundAmount.mockResolvedValue(RESPONSE_WITH_AUTO_ACCEPT_AMOUNT)

        await loadRefundAmount()(dispatch, getState)
      })

      test('trackIngredientsAutoAcceptCheck is dispatched with isAutoAccept and isMultiComplaint false ', () => {
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

    describe('and isMultiComplaint is true', () => {
      beforeEach(async () => {
        fetchRefundAmount.mockResolvedValue(RESPONSE)

        await loadRefundAmount()(dispatch, getState)
      })

      test('trackIngredientsAutoAcceptCheck is dispatched with isAutoAccept false and isMultiComplaint true ', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: webClientActionTypes.TRACKING,
          trackingData: {
            actionType: 'ssr_ingredients_auto_accept_check',
            auto_accept: false,
            is_second_complaint: true,
            seCategory: 'help',
          }
        })
      })
    })
  })

  describe('When isAutoAcceptEnabled flag is true', () => {
    beforeEach(() => {
      getIsAutoAcceptEnabled.mockReturnValue(true)
    })

    describe('and api call returns successfully with auto accept amount', () => {
      beforeEach(() => {
        fetchRefundAmount.mockResolvedValueOnce(RESPONSE_WITH_AUTO_ACCEPT_AMOUNT)
      })

      test('asyncAndDispatch is called with the right params', async () => {
        await loadRefundAmount()(dispatch, getState)

        expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            dispatch,
            actionType: ACTION_TYPE,
            errorMessage: `Failed to loadRefundAmount for orderId: ${ORDER_ID}, userId: ${USER_ID}, ingredientIds: ${INGREDIENT_UUID}`,
          })
        )
      })

      describe('and the number of ingredients is lower than the max auto accept amount', () => {
        beforeEach(async () => {
          getSelectedIngredients.mockReturnValue(SELECTED_INGREDIENTS)

          await loadRefundAmount()(dispatch, getState)
        })

        test('correct payload with isAutoAccept set to true is dispatched', async () => {
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

      describe('and the number of ingredients is more than the max auto accept amount', () => {
        beforeEach(async () => {
          getSelectedIngredients.mockReturnValue(MULTIPLE_SELECTED_INGREDIENTS)

          await loadRefundAmount()(dispatch, getState)
        })

        test('correct payload with isAutoAccept set to false is dispatched', async () => {
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

        test('asyncAndDispatch is called with the right params', async () => {
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
  })
})
