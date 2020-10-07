import React from 'react'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'
import { mount } from 'enzyme'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { getHelp } from 'reducers/getHelp'
import auth from 'reducers/auth'
import status from 'reducers/status'
import { loadOrderById } from 'actions/getHelp'
import { loadTrackingUrl } from '../../../actions/getHelp'
import { DontKnowWhenContainer } from '../DontKnowWhenContainer'

jest.mock('actions/getHelp', () => ({
  loadOrderById: jest.fn().mockImplementation(() => (dispatch) => {
    dispatch({
      type: 'IRRELEVANT_FOR_THE_TEST'
    })
  })
}))
jest.mock('../../../actions/getHelp', () => ({
  loadTrackingUrl: jest.fn().mockImplementation(() => (dispatch) => {
    dispatch({
      type: 'IRRELEVANT_FOR_THE_TEST'
    })
  })
}))

const DELIVERY_DATE = '2020-07-17 00:00:00'
const DELIVERY_SLOT = {
  deliveryStart: '2020-07-17 08:00:00',
  deliveryEnd: '2020-07-17 18:00:00',
}
const TRACKING_URL = 'https://amazing-courier.com/order/1234'
const ACCESS_TOKEN = 'aalkEEufgGk35h236Q5y23iwgher'
const ORDER_ID = '4321'
const USER_ID = '1111'
const ALL_REDUCERS = { getHelp, ...auth, ...status }
const ERROR_MESSAGE = 'An error message'
const STORE_CONTENT = {
  auth: fromJS({ accessToken: ACCESS_TOKEN }),
  getHelp: fromJS({
    order: {
      deliveryDate: DELIVERY_DATE,
      deliverySlot: DELIVERY_SLOT,
      trackingUrl: TRACKING_URL,
    },
  }),
  pending: fromJS({
    GET_HELP_LOAD_TRACKING_URL: false,
    GET_HELP_LOAD_ORDERS_BY_ID: false,
  })
}
let wrapper
let store

describe('Given DontKnowWhenContainer mounts', () => {
  beforeAll(() => {
    store = createStore(
      combineReducers(ALL_REDUCERS),
      STORE_CONTENT,
      compose(applyMiddleware(thunk))
    )
    wrapper = mount(
      <DontKnowWhenContainer
        params={{
          orderId: ORDER_ID,
          userId: USER_ID,
        }}
        store={store}
      />
    )
  })

  test('the container connects with the DontKnowWhen component', () => {
    expect(wrapper.find('DontKnowWhen')).toHaveLength(1)
  })

  test.each([
    ['auth.accessToken', 'accessToken', ACCESS_TOKEN],
    ['getHelp.order.deliveryDate', 'deliveryDate', DELIVERY_DATE],
    ['getHelp.order.deliverySlot', 'deliverySlot', DELIVERY_SLOT],
    ['getHelp.order.trackingUrl', 'trackingUrl', TRACKING_URL],
  ])('the container connects the store piece %s to the %s prop of the component', (_storePath, prop, expectedValue) => {
    expect(wrapper.find('DontKnowWhen').prop(prop))
      .toEqual(expectedValue)
  })
})

describe.each([
  ['pending', 'GET_HELP_LOAD_TRACKING_URL', true, 'isTrackingUrlLoading'],
  ['pending', 'GET_HELP_LOAD_TRACKING_URL', false, 'isTrackingUrlLoading'],
  ['pending', 'GET_HELP_LOAD_ORDERS_BY_ID', true, 'isOrderLoading'],
  ['pending', 'GET_HELP_LOAD_ORDERS_BY_ID', false, 'isOrderLoading'],
  ['error', 'GET_HELP_LOAD_ORDERS_BY_ID', ERROR_MESSAGE, 'isLoadOrderError'],
  ['error', 'GET_HELP_LOAD_ORDERS_BY_ID', null, 'isLoadOrderError'],
])('Given the store %s.%s value is %s', (statusType, actionType, pendingValue, propName) => {
  beforeEach(() => {
    store = createStore(
      combineReducers(ALL_REDUCERS),
      {
        ...STORE_CONTENT,
        [statusType]: STORE_CONTENT.pending.set(actionType, pendingValue)
      },
      compose(applyMiddleware(thunk))
    )
  })

  describe('When DeliveryCompensationContainer mounts', () => {
    beforeEach(() => {
      wrapper = mount(
        <DontKnowWhenContainer
          params={{
            orderId: ORDER_ID,
            userId: USER_ID,
          }}
          store={store}
        />
      )
    })

    test(`the container passes ${propName} to the Component as ${pendingValue}`, () => {
      expect(
        wrapper.find('DontKnowWhen').prop(propName)
      ).toBe(pendingValue)
    })
  })
})

describe('When the store does not have the required data and the container mounts', () => {
  beforeAll(() => {
    store = createStore(
      combineReducers(ALL_REDUCERS),
      {
        ...STORE_CONTENT,
        getHelp: STORE_CONTENT.getHelp
          .setIn(['order', 'deliveryDate'], '')
          .setIn(['order', 'trackingUrl'], ''),
      },
      compose(applyMiddleware(thunk))
    )
    wrapper = mount(
      <DontKnowWhenContainer
        params={{
          orderId: ORDER_ID,
          userId: USER_ID,
        }}
        store={store}
      />
    )
  })

  test.each([
    ['loadOrderById', loadOrderById],
    ['loadTrackingUrl', loadTrackingUrl]
  ])('the container connects the %s action to the Component, which calls it on mounting with the right parameters', (actionName, action) => {
    expect(action).toHaveBeenCalled()
  })
})
