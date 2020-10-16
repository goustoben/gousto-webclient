import React from 'react'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'
import { mount } from 'enzyme'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { getHelp } from 'reducers/getHelp'
import auth from 'reducers/auth'
import status from 'reducers/status'
import { DeliveryValidationContainer } from '../DeliveryValidationContainer'

jest.mock('../../../actions/getHelp', () => ({
  validateDeliveryAction: jest.fn().mockImplementation(() => (dispatch) => {
    dispatch({
      type: 'IRRELEVANT_FOR_THE_TEST'
    })
  })
}))

const ACCESS_TOKEN = 'aalkEEufgGk35h236Q5y23iwgher'
const COMPENSATION_AMOUNT = 25
const ORDER_ID = '4321'
const USER_ID = '1111'
const ALL_REDUCERS = { getHelp, ...auth, ...status }
const STORE_CONTENT = {
  auth: fromJS({ accessToken: ACCESS_TOKEN }),
  getHelp: fromJS({
    order: {
      deliveryCompensationAmount: COMPENSATION_AMOUNT,
      hasPassedDeliveryValidation: true,
    },
  }),
  pending: fromJS({
    GET_HELP_VALIDATE_DELIVERY: false,
  })
}
let wrapper
let store

describe('Given DeliveryValidationContainer mounts', () => {
  beforeAll(() => {
    store = createStore(
      combineReducers(ALL_REDUCERS),
      STORE_CONTENT,
      compose(applyMiddleware(thunk))
    )
    wrapper = mount(
      <DeliveryValidationContainer
        params={{
          orderId: ORDER_ID,
          userId: USER_ID,
        }}
        store={store}
      />
    )
  })

  test('the container connects with the DeliveryValidation component', () => {
    expect(wrapper.find('DeliveryValidation')).toHaveLength(1)
  })

  test('the container connects the store piece order.deliveryCompensationAmount to the compensationAmount prop of the component', () => {
    expect(wrapper.find('DeliveryValidation').prop('compensationAmount')).toEqual(COMPENSATION_AMOUNT)
  })

  test('the container connects the store piece order.deliveryCompensationAmount to the hasPassedDeliveryValidation prop of the component', () => {
    expect(wrapper.find('DeliveryValidation').prop('hasPassedDeliveryValidation')).toEqual(true)
  })
})

describe.each([
  ['pending', true, 'isDeliveryValidationPending'],
  ['pending', false, 'isDeliveryValidationPending'],
])('Given the store %s.GET_HELP_VALIDATE_DELIVERY value is %s', (statusType, pendingValue, propName) => {
  beforeEach(() => {
    store = createStore(
      combineReducers(ALL_REDUCERS),
      {
        ...STORE_CONTENT,
        [statusType]: STORE_CONTENT.pending.set('GET_HELP_VALIDATE_DELIVERY', pendingValue)
      },
      compose(applyMiddleware(thunk))
    )
  })

  describe('When DeliveryValidationContainer mounts', () => {
    beforeEach(() => {
      wrapper = mount(
        <DeliveryValidationContainer
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
        wrapper.find('DeliveryValidation').prop(propName)
      ).toBe(pendingValue)
    })
  })
})
