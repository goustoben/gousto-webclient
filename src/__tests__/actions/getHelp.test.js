import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'
import { fetchOrderIssues as fetchOrderIssuesApi } from 'apis/getHelp'
import { fetchOrderIssuesMockResponse } from 'apis/__mocks__/getHelp'
import { fetchIngredientIssues as fetchOrderIssuesAction } from 'actions/getHelp'

jest.mock('apis/getHelp')

describe('getHelp actions', () => {
  const dispatch = jest.fn()

  describe('fetchOrderIssues', () => {
    const getState = jest.fn().mockReturnValue({
      auth: Immutable.fromJS({ accessToken: 'access-token' }),
    })

    beforeEach(() => {
      dispatch.mockClear()
    })

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
        () => { throw new Error('error-message')}
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
})
