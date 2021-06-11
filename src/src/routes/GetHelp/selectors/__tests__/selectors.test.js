import { fromJS } from 'immutable'
import {
  getAccessToken,
  getIsLoadOrderError,
  getIsOrderLoading,
  getIsTrackingUrlLoading,
  getOrder,
  getOrderDeliveryDate,
  getOrderDeliverySlot,
  getRecipes,
  getTrackingUrl,
  getIneligibleIngredientUuids,
} from '../selectors'

const ACCESS_TOKEN = 'shhh-its-a-secret'
const ERROR_MESSAGE = 'An error message'
const INELIGIBLE_INGREDIENT_UUIDS = ['a', 'b', 'c']
const ORDER_PENDING_VALUE = 'order pending can be true or false'
const TRACKING_URL_PENDING_VALUE = 'trackingUrl pending can be true or false'
const DELIVERY_DATE = '2020-01-01 01:02:03'
const DELIVERY_SLOT = {
  deliveryEnd: '18:59:59',
  deliveryStart: '08:00:00',
}
const TRACKING_URL = 'https://amazing-courier.com/order/1111'
const ORDER = {
  deliveryDate: DELIVERY_DATE,
  deliverySlot: DELIVERY_SLOT,
  trackingUrl: TRACKING_URL,
}
const RECIPES = [
  {
    id: '2871',
    title: 'Cheesy Pizza-Topped Chicken With Mixed Salad',
    url: 'gousto.co.uk/cookbook/recipes/cheesy-pizza-topped-chicken-with-mixed-salad',
    ingredients: [
      { uuid: '3139eeba-c3a1-477c-87e6-50ba5c3d21e0', label: '1 shallot' },
      { uuid: 'd93301c4-2563-4b9d-b829-991800ca87b4', label: 'mozzarella' },
    ],
    goustoReference: '2145',
  },
]
const STATE = {
  auth: fromJS({
    accessToken: ACCESS_TOKEN,
  }),
  error: fromJS({
    GET_HELP_LOAD_ORDERS_BY_ID: ERROR_MESSAGE,
  }),
  getHelp: fromJS({
    order: ORDER,
    recipes: RECIPES,
    ineligibleIngredientUuids: fromJS(INELIGIBLE_INGREDIENT_UUIDS),
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
    ['getOrder', getOrder, ORDER],
    ['getOrderDeliveryDate', getOrderDeliveryDate, DELIVERY_DATE],
    ['getOrderDeliverySlot', getOrderDeliverySlot, DELIVERY_SLOT],
    ['getRecipes', getRecipes, RECIPES],
    ['getTrackingUrl', getTrackingUrl, TRACKING_URL],
    ['getIneligibleIngredientUuids', getIneligibleIngredientUuids, INELIGIBLE_INGREDIENT_UUIDS],
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
