import { fromJS } from 'immutable'
import {
  getAccessToken,
  getIsLoadOrderError,
  getIsOrderLoading,
  getIsTrackingUrlLoading,
  getOrderDeliveryDate,
  getOrderDeliverySlot,
  getTrackingUrl,
} from '../selectors'

const ACCESS_TOKEN = 'shhh-its-a-secret'
const ERROR_MESSAGE = 'An error message'
const ORDER_PENDING_VALUE = 'order pending can be true or false'
const TRACKING_URL_PENDING_VALUE = 'trackingUrl pending can be true or false'
const DELIVERY_DATE = '2020-01-01 01:02:03'
const DELIVERY_SLOT = {
  deliveryEnd: '18:59:59',
  deliveryStart: '08:00:00',
}
const TRACKING_URL = 'https://amazing-courier.com/order/1111'
const STATE = {
  auth: fromJS({
    accessToken: ACCESS_TOKEN,
  }),
  error: fromJS({
    GET_HELP_LOAD_ORDERS_BY_ID: ERROR_MESSAGE,
  }),
  getHelp: fromJS({
    order: {
      deliveryDate: DELIVERY_DATE,
      deliverySlot: DELIVERY_SLOT,
      trackingUrl: TRACKING_URL,
    },
  }),
  pending: fromJS({
    GET_HELP_LOAD_ORDERS_BY_ID: ORDER_PENDING_VALUE,
    GET_HELP_LOAD_TRACKING_URL: TRACKING_URL_PENDING_VALUE,
  }),
}

describe('Get Help selectors', () => {
  let result

  describe.each([
    ['getAccessToken', getAccessToken, ACCESS_TOKEN],
    ['getIsOrderLoading', getIsOrderLoading, ORDER_PENDING_VALUE],
    ['getIsTrackingUrlLoading', getIsTrackingUrlLoading, TRACKING_URL_PENDING_VALUE],
    ['getOrderDeliveryDate', getOrderDeliveryDate, DELIVERY_DATE],
    ['getOrderDeliverySlot', getOrderDeliverySlot, DELIVERY_SLOT],
    ['getTrackingUrl', getTrackingUrl, TRACKING_URL],
  ])('Given %s is called', (_selectorName, selector, expectedResult) => {
    beforeEach(() => {
      result = selector(STATE)
    })

    test('gets the corresponding value from the store', () => {
      expect(result).toEqual(expectedResult)
    })
  })

  describe.each([
    ['getIsLoadOrderError', ERROR_MESSAGE, getIsLoadOrderError, true],
    ['getIsLoadOrderError', null, getIsLoadOrderError, false],
  ])('Given %s is called and the error value of the corresponding action type is %s',
    (selectorName, storeValue, selector, expectedResult) => {
      beforeEach(() => {
        result = selector({
          ...STATE,
          error: fromJS({
            GET_HELP_LOAD_ORDERS_BY_ID: storeValue,
          }),
        })
      })

      test(`the selector ${selectorName} returns ${expectedResult}`, () => {
        expect(result).toEqual(expectedResult)
      })
    }
  )
})
