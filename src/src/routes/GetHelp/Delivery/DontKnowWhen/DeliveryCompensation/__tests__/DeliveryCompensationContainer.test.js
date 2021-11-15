import React from 'react'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import status from 'reducers/status'
import { error } from "actions/status/error"
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { DeliveryCompensationContainer } from '../DeliveryCompensationContainer'
import { applyDeliveryRefund } from "routes/GetHelp/actions/getHelp/applyDeliveryRefund"

jest.mock('actions/status')
jest.mock('../../../../actions/getHelp')

const COMPENSATION_AMOUNT = 7.7
const DELIVERY_COMPLAINT_CATEGORY_ID = '333'
const ORDER_ID = '111'
const USER_ID = '222'
let store
let wrapper

describe.each([
  [null, false],
  ['Irrelevante error message', true]
])('Given the store error.GET_HELP_APPLY_DELIVERY_COMPENSATION value is %s', (errorValue, isApplyCompensationError) => {
  beforeEach(() => {
    store = createStore(
      combineReducers({...status,}),
      { error: Immutable.fromJS({
        GET_HELP_APPLY_DELIVERY_COMPENSATION: errorValue
      })},
      compose(applyMiddleware(thunk))
    )
  })

  describe('When DeliveryCompensationContainer mounts', () => {
    beforeEach(() => {
      wrapper = mount(
        <DeliveryCompensationContainer
          compensationAmount={COMPENSATION_AMOUNT}
          store={store}
          orderId={ORDER_ID}
          userId={USER_ID}
        />
      )
    })

    test(`the container passes isApplyCompensationError to the Component as ${isApplyCompensationError}`, () => {
      expect(
        wrapper.find('DeliveryCompensation').prop('isApplyCompensationError')
      ).toBe(isApplyCompensationError)
    })
  })
})

describe.each([[true], [false]])('Given the store pending.GET_HELP_APPLY_DELIVERY_COMPENSATION value is %s', (pendingValue) => {
  beforeEach(() => {
    store = createStore(
      combineReducers({...status,}),
      { pending: Immutable.fromJS({
        GET_HELP_APPLY_DELIVERY_COMPENSATION: pendingValue
      })},
      compose(applyMiddleware(thunk))
    )
  })

  describe('When DeliveryCompensationContainer mounts', () => {
    beforeEach(() => {
      wrapper = mount(
        <DeliveryCompensationContainer
          compensationAmount={COMPENSATION_AMOUNT}
          store={store}
          orderId={ORDER_ID}
          userId={USER_ID}
        />
      )
    })

    test(`the container passes isApplyCompensationPending to the Component as ${pendingValue}`, () => {
      expect(
        wrapper.find('DeliveryCompensation').prop('isApplyCompensationPending')
      ).toBe(pendingValue)
    })
  })
})

describe('When DeliveryCompensationContainer mounts', () => {
  const ERROR_MESSAGE = 'error message'

  beforeEach(() => {
    store = createStore(
      combineReducers({...status,}),
      {},
      compose(applyMiddleware(thunk))
    )
    store.dispatch = jest.fn()
    wrapper = mount(
      <DeliveryCompensationContainer
        compensationAmount={COMPENSATION_AMOUNT}
        store={store}
        orderId={ORDER_ID}
        userId={USER_ID}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('the container connects the applyDeliveryRefund action to the Component', () => {
    wrapper.find('DeliveryCompensation').prop('applyDeliveryRefund')(
      USER_ID,
      ORDER_ID,
      DELIVERY_COMPLAINT_CATEGORY_ID,
      COMPENSATION_AMOUNT,
    )

    expect(applyDeliveryRefund).toHaveBeenCalledWith(
      USER_ID,
      ORDER_ID,
      DELIVERY_COMPLAINT_CATEGORY_ID,
      COMPENSATION_AMOUNT,
    )
  })

  test('the container connects the status error action (as setErrorStatus prop) to the Component', () => {
    wrapper.find('DeliveryCompensation').prop('setErrorStatus')(
      webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
      ERROR_MESSAGE,
    )

    expect(error).toHaveBeenCalledWith(
      'GET_HELP_APPLY_DELIVERY_COMPENSATION',
      ERROR_MESSAGE,
    )
  })
})
