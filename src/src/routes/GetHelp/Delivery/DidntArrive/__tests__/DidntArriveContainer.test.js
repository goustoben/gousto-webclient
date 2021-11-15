import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { createStore, compose, applyMiddleware } from 'redux'
import { DidntArriveContainer } from '../DidntArriveContainer'
import {
  getAccessToken,
  getIsLoadOrderError,
  getIsOrderLoading,
  getIsTrackingUrlLoading,
  getOrderDeliveryDate,
  getOrderDeliverySlot,
  getTrackingUrl,
} from '../../../selectors/selectors'
import { loadOrderById } from "routes/GetHelp/actions/getHelp/loadOrderById"
import { loadTrackingUrl } from "routes/GetHelp/actions/getHelp/loadTrackingUrl"

jest.mock('../../../selectors/selectors')
jest.mock('../../../actions/getHelp', () => ({
  loadOrderById: jest.fn().mockImplementation(() => (dispatch) => {
    dispatch({
      type: 'IRRELEVANT_FOR_THE_TEST'
    })
  }),
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
const PARAMS = {
  orderId: '4321',
  userId: '1111',
}
const EMPTY_STORE = createStore(
  () => {},
  {},
  compose(applyMiddleware(thunk))
)
let wrapper

describe('Given DidntArriveContainer mounts', () => {
  beforeAll(() => {
    getAccessToken.mockReturnValue(ACCESS_TOKEN)
    getOrderDeliveryDate.mockReturnValue(DELIVERY_DATE)
    getOrderDeliverySlot.mockReturnValue(DELIVERY_SLOT)
    getTrackingUrl.mockReturnValue(TRACKING_URL)

    wrapper = mount(
      <DidntArriveContainer
        params={PARAMS}
        store={EMPTY_STORE}
      />
    )
  })

  test('the container connects with the DidntArrive component', () => {
    expect(wrapper.find('DidntArrive')).toHaveLength(1)
  })

  test.each([
    ['getAccessToken', 'accessToken', ACCESS_TOKEN],
    ['getOrderDeliveryDate', 'deliveryDate', DELIVERY_DATE],
    ['getOrderDeliverySlot', 'deliverySlot', DELIVERY_SLOT],
    ['getTrackingUrl', 'trackingUrl', TRACKING_URL],
  ])('the container connects the result of the selector %s to the %s prop of the component',
    (_selectorName, prop, expectedValue) => {
      expect(wrapper.find('DidntArrive').prop(prop))
        .toEqual(expectedValue)
    }
  )
})

describe.each([
  ['getIsLoadOrderError', true, getIsLoadOrderError, 'isLoadOrderError'],
  ['getIsLoadOrderError', false, getIsLoadOrderError, 'isLoadOrderError'],
  ['getIsOrderLoading', true, getIsOrderLoading, 'isOrderLoading'],
  ['getIsOrderLoading', false, getIsOrderLoading, 'isOrderLoading'],
  ['getIsTrackingUrlLoading', true, getIsTrackingUrlLoading, 'isTrackingUrlLoading'],
  ['getIsTrackingUrlLoading', false, getIsTrackingUrlLoading, 'isTrackingUrlLoading'],
])('Given the selector %s returns %s', (_selectorName, returnValue, selector, propName) => {
  beforeEach(() => {
    selector.mockReturnValueOnce(returnValue)
  })

  describe('When DeliveryCompensationContainer mounts', () => {
    beforeEach(() => {
      wrapper = mount(
        <DidntArriveContainer
          params={PARAMS}
          store={EMPTY_STORE}
        />
      )
    })

    test(`the container passes ${propName} to the Component as ${returnValue}`, () => {
      expect(
        wrapper.find('DidntArrive').prop(propName)
      ).toBe(returnValue)
    })
  })
})

describe.each([
  ['getOrderDeliveryDate', getOrderDeliveryDate, loadOrderById],
  ['getTrackingUrl', getTrackingUrl, loadTrackingUrl],
])('When %s returns an empty string and the container mounts', (_selectorName, selector, action) => {
  beforeAll(() => {
    selector.mockReturnValueOnce('')
    wrapper = mount(
      <DidntArriveContainer
        params={PARAMS}
        store={EMPTY_STORE}
      />
    )
  })

  test('the container connects the %s action to the Component, which calls it on mounting', () => {
    expect(action).toHaveBeenCalled()
  })
})
