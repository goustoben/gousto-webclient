import { fromJS } from 'immutable'
import {
  getAccessToken,
  getError,
  getMassIssueIneligibleIngredientUuids,
  getOtherIssueIneligibleIngredientUuids,
  getIsAutoAccept,
  getIsError,
  getIsLoadOrderError,
  getIsOrderLoading,
  getIsTrackingUrlLoading,
  getOrder,
  getOrderDeliveryDate,
  getOrderDeliverySlot,
  getOrderId,
  getPending,
  getRecipes,
  getSelectedIngredients,
  getSelectedIngredientIssuesIDs,
  getSelectedIngredientsWithImage,
  getTrackingUrl,
} from '../selectors'

const ACCESS_TOKEN = 'shhh-its-a-secret'
const ERROR_MESSAGE = 'An error message'
const MASS_ISSUE_INELIGIBLE_INGREDIENT_UUIDS = ['a', 'b', 'c']
const OTHER_ISSUE_INELIGIBLE_INGREDIENT_UUIDS = ['a324', 'b345', 'c3454']
const IS_AUTO_ACCEPT = 'is auto accept can be true or false'
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
    ingredients: [
      { uuid: 'd93301c4-2563-4b9d-b829-991800ca87b4',
        label: '40g Cornish clotted cream',
        urls: [
          {
            url: 'ingredient-cornish-image-url',
            width: 50,
          },
        ] },
    ],
    goustoReference: '2145',
  },
  {
    id: '385',
    title: 'Recipe 2',
    ingredients: [
      {
        uuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
        label: '8ml soy sauce',
        urls: [
          {
            url: 'ingredient-soy-image-url',
            width: 50,
          },
        ]
      },
    ],
    goustoReference: '354',
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
  '2871&d93301c4-2563-4b9d-b829-991800ca87b4': {
    recipeId: '2871',
    ingredientUuid: 'd93301c4-2563-4b9d-b829-991800ca87b4',
    label: '40g Cornish clotted cream',
    recipeGoustoReference: '2093',
    issueId: '3',
    issueName: 'Missing Ingredients',
    issueDescription: 'ssss'
  },
}
const SELECTED_INGREDIENTS_ISSUES_IDS = ['4', '3']

const SELECTED_INGREDIENTS_WITH_IMG = [{
  ingredientUuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
  label: '8ml soy sauce',
  srcSet: 'ingredient-soy-image-url 50w',
},
{ ingredientUuid: 'd93301c4-2563-4b9d-b829-991800ca87b4',
  label: '40g Cornish clotted cream',
  srcSet: 'ingredient-cornish-image-url 50w'
}]

const STATE = {
  auth: fromJS({
    accessToken: ACCESS_TOKEN,
  }),
  error: fromJS({
    GET_HELP_LOAD_ORDERS_BY_ID: ERROR_MESSAGE,
  }),
  getHelp: fromJS({
    massIssueIneligibleIngredientUuids: fromJS(MASS_ISSUE_INELIGIBLE_INGREDIENT_UUIDS),
    otherIssueIneligibleIngredientUuids: fromJS(OTHER_ISSUE_INELIGIBLE_INGREDIENT_UUIDS),
    isAutoAccept: IS_AUTO_ACCEPT,
    order: ORDER,
    recipes: RECIPES,
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
    ['getMassIssueIneligibleIngredientUuids', getMassIssueIneligibleIngredientUuids, MASS_ISSUE_INELIGIBLE_INGREDIENT_UUIDS],
    ['getOtherIssueIneligibleIngredientUuids', getOtherIssueIneligibleIngredientUuids, OTHER_ISSUE_INELIGIBLE_INGREDIENT_UUIDS],
    ['getIsAutoAccept', getIsAutoAccept, IS_AUTO_ACCEPT],
    ['getIsOrderLoading', getIsOrderLoading, ORDER_PENDING_VALUE],
    ['getIsTrackingUrlLoading', getIsTrackingUrlLoading, TRACKING_URL_PENDING_VALUE],
    ['getOrder', getOrder, ORDER],
    ['getOrderDeliveryDate', getOrderDeliveryDate, DELIVERY_DATE],
    ['getOrderDeliverySlot', getOrderDeliverySlot, DELIVERY_SLOT],
    ['getOrderId', getOrderId, ORDER_ID],
    ['getRecipes', getRecipes, RECIPES],
    ['getSelectedIngredients', getSelectedIngredients, SELECTED_INGREDIENTS],
    ['getTrackingUrl', getTrackingUrl, TRACKING_URL],
    ['getSelectedIngredientIssuesIDs', getSelectedIngredientIssuesIDs, SELECTED_INGREDIENTS_ISSUES_IDS],
    ['getSelectedIngredientsWithImage', getSelectedIngredientsWithImage, SELECTED_INGREDIENTS_WITH_IMG],
  ])('Given %s is called', (_selectorName, selector, expectedResult) => {
    beforeEach(() => {
      result = selector(STATE)
    })

    test('gets the corresponding value from the store', () => {
      expect(result).toEqual(expectedResult)
    })
  })

  describe('Given getError is called with an action type', () => {
    beforeEach(() => {
      result = getError(STATE, 'GET_HELP_LOAD_ORDERS_BY_ID')
    })

    test('gets the error value for the corresponding action type', () => {
      expect(result).toBe(ERROR_MESSAGE)
    })
  })

  describe('Given getPending is called with an action type', () => {
    beforeEach(() => {
      result = getPending(STATE, 'GET_HELP_LOAD_ORDERS_BY_ID')
    })

    test('gets the pending value for the corresponding action type', () => {
      expect(result).toBe(ORDER_PENDING_VALUE)
    })
  })

  describe('Given getIsError is called', () => {
    describe('and there is an error for the corresponding action type', () => {
      beforeEach(() => {
        result = getIsError({
          ...STATE,
          error: fromJS({
            GET_HELP_LOAD_ORDERS_BY_ID: ERROR_MESSAGE,
          }),
        }, 'GET_HELP_LOAD_ORDERS_BY_ID')
      })

      test('the selector returns true', () => {
        expect(result).toEqual(true)
      })
    })

    describe('and there is not an error for the corresponding action type', () => {
      beforeEach(() => {
        result = getIsError({
          ...STATE,
          error: fromJS({
            GET_HELP_LOAD_ORDERS_BY_ID: null,
          }),
        }, 'GET_HELP_LOAD_ORDERS_BY_ID')
      })

      test('the selector returns false', () => {
        expect(result).toEqual(false)
      })
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
