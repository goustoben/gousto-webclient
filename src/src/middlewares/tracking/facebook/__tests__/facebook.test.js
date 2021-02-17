import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'
import { getWindow } from 'utils/window'
import { getUserData } from 'middlewares/tracking/facebook/router'
import Tracker from 'middlewares/tracking/facebook/facebook'

jest.mock('utils/window', () => ({
  getWindow: jest.fn(),
}))

jest.mock('middlewares/tracking/utils', () => ({
  getPathName: jest.fn().mockReturnValue('test-path'),
}))

jest.mock('middlewares/tracking/facebook/router', () => ({
  getUserData: jest.fn(),
}))

describe('fbTracking', () => {
  const fbq = jest.fn()

  beforeEach(() => {
    getWindow.mockReturnValue({
      fbq,
    })
  })

  afterEach(() => {
    fbq.mockClear()
  })

  test('should call showRecipeTracking with actions.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE', () => {
    const recipeId = '1'
    const recipes = Immutable.fromJS({
      1: {
        title: 'test-recipe',
      },
    })
    const routing = {
      locationBeforeTransitions: {
        query: {
          collection: 'test-collection',
        },
      },
    }
    Tracker(
      {
        type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
        recipeId,
      },
      { recipes, routing },
    )
    expect(fbq).toHaveBeenCalled()
    expect(fbq).toHaveBeenCalledWith('track', 'ViewContent', {
      content_name: 'test-recipe',
      content_ids: ['1'],
      content_type: 'product',
      content_category: 'test-collection',
    })
  })

  test('should call showCollectionTracking with actions.FILTERS_COLLECTION_CHANGE', () => {
    const menuCollections = Immutable.fromJS({
      1: {
        recipesInCollection: ['123', '234', '345', '456']
      },
    })
    Tracker(
      {
        type: actionTypes.FILTERS_COLLECTION_CHANGE,
        collectionName: 'test-collection',
        collectionId: '1',
      },
      { menuCollections },
    )
    expect(fbq).toHaveBeenCalled()
    expect(fbq).toHaveBeenCalledWith('trackCustom', 'ViewCategory', {
      content_name: 'test-collection',
      content_ids: ['123', '234', '345', '456'],
      content_type: 'product',
      content_category: 'test-collection',
    })
  })

  test('should call addRecipeToBasket with actionTypes.BASKET_RECIPE_ADD', () => {
    const recipeId = '1'
    const recipes = Immutable.fromJS({
      1: {
        title: 'test-recipe',
      },
    })
    Tracker(
      {
        type: actionTypes.BASKET_RECIPE_ADD,
        recipeId,
      },
      { recipes },
    )
    expect(fbq).toHaveBeenCalled()
    expect(fbq).toHaveBeenCalledWith('track', 'AddToCart', {
      content_name: 'test-recipe',
      content_ids: ['1'],
      content_type: 'product',
    })
  })

  test('should call initiateCheckout with actions.BASKET_CHECKOUT', () => {
    const basket = Immutable.fromJS({
      recipes: {
        1: 2,
        2: 2,
      },
    })
    Tracker(
      {
        type: actionTypes.BASKET_CHECKOUT,
      },
      { basket },
    )
    expect(fbq).toHaveBeenCalled()
    expect(fbq).toHaveBeenCalledWith('track', 'InitiateCheckout', {
      content_ids: ['1', '2'],
      content_type: 'product',
    })
  })

  test('should call signupPurchaseCompleted with actions.CHECKOUT_SIGNUP_SUCCESS', () => {
    const basket = Immutable.Map({
      recipes: Immutable.Map({
        1: 1,
        2: 1,
      }),
    })
    const pricing = Immutable.Map({
      prices: Immutable.Map({
        total: 40,
      }),
    })

    Tracker({
      type: actionTypes.CHECKOUT_SIGNUP_SUCCESS,
      orderId: '1',
    },
    {
      basket,
      pricing,
    })

    expect(fbq).toHaveBeenCalled()
    expect(fbq).toHaveBeenCalledWith('track', 'Purchase', {
      content_ids: ['1', '2'],
      content_type: 'product',
      num_items: 2,
      value: 40,
      currency: 'GBP',
      order_id: '1',
    })
  })

  describe('when OrderAPI V1 Order', () => {
    test('should call customerPurchaseCompleted with actions.ORDER_CREATE_TRANSACTIONAL', () => {
      Tracker({
        type: actionTypes.ORDER_CREATE_TRANSACTIONAL,
        order: {
          id: 2,
          recipeItems: [
            { recipeId: '3' },
            { recipeId: '4' },
          ],
          box: {
            numRecipes: 2,
          },
          prices: {
            total: '19.99',
          }
        }
      })

      expect(fbq).toHaveBeenCalled()
      expect(fbq).toHaveBeenCalledWith('track', 'Purchase', {
        content_ids: ['3', '4'],
        content_type: 'product',
        num_items: 2,
        value: '19.99',
        currency: 'GBP',
        order_id: '2',
      })
    })
  })

  describe('when OrderAPI V2 Order', () => {
    test('should call customerPurchaseCompleted with actions.ORDER_CREATE_TRANSACTIONAL', () => {
      Tracker({
        type: actionTypes.ORDER_CREATE_TRANSACTIONAL,
        order: {
          data: {
            id: 2,
            prices: {
              total: '19.99',
            },
            relationships: {
              components: {
                data: [
                  { id: '3', type: 'recipe' },
                  { id: '4', type: 'recipe' },
                ]
              }
            }
          }
        }
      })

      expect(fbq).toHaveBeenCalled()
      expect(fbq).toHaveBeenCalledWith('track', 'Purchase', {
        content_ids: ['3', '4'],
        content_type: 'product',
        num_items: 2,
        value: '19.99',
        currency: 'GBP',
        order_id: '2',
      })
    })
  })

  describe('onLocationChange', () => {
    fbq.getState = jest.fn()

    beforeEach(() => {
      getUserData.mockReturnValue(true)
    })

    afterEach(() => {
      fbq.getState.mockClear()
    })

    const initializeFacebookState = state => {
      fbq.getState.mockReturnValue(state)
    }

    test('should call onLocationChange on @@router/LOCATION_CHANGE', () => {
      initializeFacebookState({
        pixelInstantiationIdentifier: 12345,
        pixels: [
          { id: 1 },
        ],
      })

      Tracker({ type: '@@router/LOCATION_CHANGE' })

      expect(fbq).toHaveBeenCalledWith(
        'init',
        1,
        true,
        12345
      )
    })

    test('should only initialize empty pixels', () => {
      initializeFacebookState({
        pixelInstantiationIdentifier: 72452,
        pixels: [
          { id: 1, userData: { fn: 'Alice' } },
          { id: 2 },
          { id: 3 },
          { id: 4, userData: {} },
          { id: 5, userData: { ln: 'Tester' } },
        ],
      })

      Tracker({ type: '@@router/LOCATION_CHANGE' })

      const arguementExpectations = [
        ['init', 2, true, 72452,],
        ['init', 3, true, 72452,],
        ['init', 4, true, 72452,],
      ]

      expect(fbq).toHaveBeenCalledTimes(arguementExpectations.length)
      arguementExpectations.forEach(arguements => {
        expect(fbq).toHaveBeenCalledWith(...arguements)
      })
    })
  })
})
