import { fromJS } from 'immutable'
import {
  getAccessToken,
  getCompensation,
  getIneligibleIngredientUuids,
  getIsLoadOrderError,
  getIsOrderLoading,
  getIsTrackingUrlLoading,
  getOrder,
  getOrderDeliveryDate,
  getOrderDeliverySlot,
  getOrderId,
  getRecipes,
  getSelectedIngredients,
  getTrackingUrl,
} from '../selectors'

const ACCESS_TOKEN = 'shhh-its-a-secret'
const COMPENSATION = {
  amount: 5,
  type: 'credit'
}
const ERROR_MESSAGE = 'An error message'
const INELIGIBLE_INGREDIENT_UUIDS = ['a', 'b', 'c']
const ORDER_PENDING_VALUE = 'order pending can be true or false'
const ORDER_ID = '12345'
const TRACKING_URL_PENDING_VALUE = 'trackingUrl pending can be true or false'
const DELIVERY_DATE = '2020-01-01 01:02:03'
const DELIVERY_SLOT = {
  deliveryEnd: '18:59:59',
  deliveryStart: '08:00:00',
}
const TRACKING_URL = 'https://amazing-courier.com/order/1111'
const ORDER = {
  id: ORDER_ID,
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
const SELECTED_INGREDIENTS = {
  '385&3c07d126-f655-437c-aa1d-c38dbbae0398': {
    recipeId: '385',
    ingredientUuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
    label: '8ml soy sauce',
    recipeGoustoReference: '408',
    issueId: '4',
    issueName: 'Wrong Ingredients',
    issueDescription: 'assd'
  },
  '2223&488d5751-dcff-4985-88c0-bf745ff54904': {
    recipeId: '2223',
    ingredientUuid: '488d5751-dcff-4985-88c0-bf745ff54904',
    label: '40g Cornish clotted cream',
    recipeGoustoReference: '2093',
    issueId: '3',
    issueName: 'Missing Ingredients',
    issueDescription: 'ssss'
  },
}
const STATE = {
  auth: fromJS({
    accessToken: ACCESS_TOKEN,
  }),
  error: fromJS({
    GET_HELP_LOAD_ORDERS_BY_ID: ERROR_MESSAGE,
  }),
  getHelp: fromJS({
    compensation: COMPENSATION,
    order: ORDER,
    recipes: RECIPES,
    ineligibleIngredientUuids: fromJS(INELIGIBLE_INGREDIENT_UUIDS),
    selectedIngredients: SELECTED_INGREDIENTS,
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
    ['getCompensation', getCompensation, COMPENSATION],
    ['getIneligibleIngredientUuids', getIneligibleIngredientUuids, INELIGIBLE_INGREDIENT_UUIDS],
    ['getIsOrderLoading', getIsOrderLoading, ORDER_PENDING_VALUE],
    ['getIsTrackingUrlLoading', getIsTrackingUrlLoading, TRACKING_URL_PENDING_VALUE],
    ['getOrder', getOrder, ORDER],
    ['getOrderDeliveryDate', getOrderDeliveryDate, DELIVERY_DATE],
    ['getOrderDeliverySlot', getOrderDeliverySlot, DELIVERY_SLOT],
    ['getOrderId', getOrderId, ORDER_ID],
    ['getRecipes', getRecipes, RECIPES],
    ['getSelectedIngredients', getSelectedIngredients, SELECTED_INGREDIENTS],
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
