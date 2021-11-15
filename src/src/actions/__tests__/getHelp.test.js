import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'
import { fetchOrderIssuesMockResponse } from 'apis/__mocks__/getHelp'
import { trackAcceptIngredientsRefund } from "actions/getHelp/trackAcceptIngredientsRefund"
import { validateSelectedIngredients } from "actions/getHelp/validateSelectedIngredients"
import { fetchIngredientIssues as fetchOrderIssuesAction } from "actions/getHelp/fetchIngredientIssues"
import { validateIngredients } from "apis/getHelp/validateIngredients"
import { fetchOrderIssues as fetchOrderIssuesApi } from "apis/getHelp/fetchOrderIssues"

jest.mock('apis/getHelp')

const GET_STATE_PARAMS = {
  auth: Immutable.fromJS({ accessToken: 'access-token' }),
  features: Immutable.fromJS({ ssrShorterCompensationPeriod: { value: false } }),
}

describe('getHelp actions', () => {
  const dispatch = jest.fn()
  let getState

  beforeEach(() => {
    dispatch.mockClear()

    getState = jest.fn().mockReturnValue(GET_STATE_PARAMS)
  })

  describe('fetchOrderIssues', () => {
    test('pending action with true is dispatched', async () => {
      await fetchOrderIssuesAction()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'PENDING',
        key: actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES,
        value: true,
      })
    })

    test('pending action with false is dispatched when it finishes', async () => {
      await fetchOrderIssuesAction()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'PENDING',
        key: actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES,
        value: false,
      })
    })

    test('error action with null is dispatched', async () => {
      await fetchOrderIssuesAction()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'ERROR',
        key: actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES,
        value: null,
      })
    })

    test('error action with corresponding error is dispatched if an error occurs', async () => {
      fetchOrderIssuesApi.mockImplementationOnce(
        () => { throw new Error('error-message') }
      )
      await fetchOrderIssuesAction()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'ERROR',
        key: actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES,
        value: 'error-message',
      })
    })

    test('api function is called with the access token', async () => {
      await fetchOrderIssuesAction()(dispatch, getState)

      expect(fetchOrderIssuesApi).toHaveBeenCalledWith('access-token')
    })

    test('result from the api function is dispatched in an action', async () => {
      await fetchOrderIssuesAction()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES,
        ingredientIssues: fetchOrderIssuesMockResponse,
      })
    })
  })

  describe('given validateSelectedIngredients is called', () => {
    const body = {
      accessToken: 'user-access-token',
      costumerId: '777',
      ingredientUuids: ['2222'],
      orderId: '888',
    }
    const expectedParams = [
      'user-access-token',
      {
        customer_id: 777,
        ingredient_ids: ['2222'],
        order_id: 888,
        features: [],
      }
    ]

    beforeEach(async () => {
      getState = jest.fn().mockReturnValueOnce(GET_STATE_PARAMS)

      await validateSelectedIngredients(body)(dispatch, getState)
    })

    test('the validateIngredients is being called correctly', () => {
      expect(validateIngredients).toHaveBeenCalledWith(...expectedParams)
    })
  })

  describe('trackAcceptIngredientsRefund', () => {
    beforeEach(() => {
      getState = jest.fn().mockReturnValue({
        ...GET_STATE_PARAMS,
        getHelp: Immutable.fromJS({
          compensation: {
            amount: 2,
          }
        })
      })
      trackAcceptIngredientsRefund()(dispatch, getState)
    })

    test('dispatch is called with amount', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_HELP_INGREDIENTS_ACCEPT_REFUND,
        amount: 2,
        isMultiComplaints: false
      })
    })

    describe('when isMultiComplaint', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          ...GET_STATE_PARAMS,
          getHelp: Immutable.fromJS({
            compensation: {
              amount: 2,
              totalAmount: 4
            }
          })
        })
        trackAcceptIngredientsRefund()(dispatch, getState)
      })

      test('dispatch is called with amount and isMultiComplaints', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.GET_HELP_INGREDIENTS_ACCEPT_REFUND,
          amount: 2,
          isMultiComplaints: true
        })
      })
    })
  })
})
