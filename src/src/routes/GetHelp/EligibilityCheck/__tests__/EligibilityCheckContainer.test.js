import React from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import thunk from 'redux-thunk'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { redirect } from 'utils/window'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import statusReducer from 'reducers/status'
import { mount } from 'enzyme'
import { fetchUserOrders } from 'apis/user'
import { EligibilityCheckContainer } from '../EligibilityCheckContainer'

jest.mock('apis/user')
jest.mock('utils/window', () => ({
  documentLocation: jest.fn(),
  getWindow: jest.fn(),
  redirect: jest.fn(),
}))

const DELIVERY_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const initialState = {
  getHelp: getHelpInitialState,
  auth: authDefaultState(),
  pending: Immutable.Map(),
  user: userDefaultState,
}

describe('given EligibilityCheckContainer is rendered', () => {
  const getStore = (isAuthenticated = true) => (
    createStore(
      combineReducers(
        {
          ...authReducer,
          ...statusReducer,
          ...userReducer,
          getHelp,
        }
      ),
      {
        ...initialState,
        auth: Immutable.fromJS({
          ...initialState.auth,
          isAuthenticated
        }),
        user: Immutable.fromJS({
          ...initialState.user,
          id: isAuthenticated ? '123' : ''
        })
      },
      compose(applyMiddleware(thunk))
    )
  )

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when customer is eligible', () => {
    const eligibleOrder = [{
      deliveryDate: moment().subtract(8, 'days').format(DELIVERY_DATE_FORMAT),
      deliverySlot: {
        deliveryEnd: '18:59:59',
        deliveryStart: '08:00:00'
      },
      id: '100',
      recipeItems: [
        { id: 'nobody-cares', recipeId: '10' },
        { id: 'nobody-cares', recipeId: '20' },
        { id: 'nobody-cares', recipeId: '30' },
      ],
    }]

    beforeEach(() => {
      browserHistory.push = jest.fn()

      fetchUserOrders.mockResolvedValueOnce({
        data: eligibleOrder
      })

      mount(
        <EligibilityCheckContainer store={getStore()} />
      )
    })

    test('redirects to the get help page', () => {
      expect(browserHistory.push).toHaveBeenCalledWith('/get-help?orderId=100')
    })
  })

  describe('when customer is not eligible', () => {
    const notEligibleOrder = [{
      deliveryDate: moment().subtract(12, 'days').format(DELIVERY_DATE_FORMAT),
      deliverySlot: {
        deliveryEnd: '18:59:59',
        deliveryStart: '08:00:00'
      },
      id: '100',
      recipeItems: [
        { id: 'nobody-cares', recipeId: '10' },
        { id: 'nobody-cares', recipeId: '20' },
        { id: 'nobody-cares', recipeId: '30' },
      ],
    }]

    beforeEach(() => {
      fetchUserOrders.mockResolvedValueOnce({
        data: notEligibleOrder
      })
    })

    describe('and customer is authenticated', () => {
      beforeEach(() => {
        mount(
          <EligibilityCheckContainer store={getStore()} />
        )
      })

      test('redirects to the knowledge base with the user_id attached to the URL', () => {
        expect(redirect).toHaveBeenCalledWith('https://gousto.zendesk.com/hc/en-gb/?user_id=123')
      })
    })

    describe('and customer is not authenticated', () => {
      beforeEach(() => {
        mount(
          <EligibilityCheckContainer store={getStore(false)} />
        )
      })

      test('redirects to the knowledge base without the user_id attached to the URL', () => {
        expect(redirect).toHaveBeenCalledWith('https://gousto.zendesk.com/hc/en-gb')
      })
    })
  })
})
