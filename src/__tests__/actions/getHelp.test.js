import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'
import {
  fetchOrderIssues as fetchOrderIssuesApi,
  validateIngredients,
  validateOrder,
} from 'apis/getHelp'
import { fetchOrderIssuesMockResponse } from 'apis/__mocks__/getHelp'
import {
  fetchIngredientIssues as fetchOrderIssuesAction,
  validateLatestOrder,
  validateSelectedIngredients,
} from 'actions/getHelp'

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
      ingredientIds: ['2222'],
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

    describe('when ssrShorterCompensationPeriod feature is turned on', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValueOnce({
          ...GET_STATE_PARAMS,
          features: Immutable.fromJS({ ssrShorterCompensationPeriod: { value: true } }),
        })

        await validateSelectedIngredients(body)(dispatch, getState)
      })

      test('the validateIngredients has ssrShorterCompensationPeriod attached to the body request', () => {
        const [accessToken, body] = expectedParams
        expect(validateIngredients).toHaveBeenCalledWith(accessToken, {
          ...body,
          features: ['ssrShorterCompensationPeriod'],
        })
      })
    })
  })

  describe('given validateLatestOrder is called', () => {
    const body = {
      accessToken: 'user-access-token',
      costumerId: '777',
      orderId: '888',
    }
    const expectedParams = [
      'user-access-token',
      {
        customer_id: 777,
        order_id: 888,
        features: [],
      }
    ]

    beforeEach(async () => {
      getState = jest.fn().mockReturnValueOnce(GET_STATE_PARAMS)

      await validateLatestOrder(body)(dispatch, getState)
    })

    test('the validateOrder is being called correctly', () => {
      expect(validateOrder).toHaveBeenCalledWith(...expectedParams)
    })

    describe('when ssrShorterCompensationPeriod feature is turned on', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValueOnce({
          ...GET_STATE_PARAMS,
          features: Immutable.fromJS({ ssrShorterCompensationPeriod: { value: true } }),
        })

        await validateLatestOrder(body)(dispatch, getState)
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
