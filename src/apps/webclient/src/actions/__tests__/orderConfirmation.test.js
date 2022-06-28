import { safeJestMock } from '_testing/mocks'
import Immutable from 'immutable'
import { push } from 'react-router-redux'

import { actionTypes } from 'actions/actionTypes'
import { basketOrderLoad } from 'actions/basket'
import { orderCheckPossibleDuplicate } from 'actions/order'
import {
  orderConfirmationProductTracking,
  orderConfirmationRedirect,
  orderConfirmationUpdateOrderTracking,
  orderDetails,
} from 'actions/orderConfirmation'
import { productsLoadProducts } from 'actions/products'
import recipes from 'actions/recipes'
import { marketProductAdded, marketProductRemoved } from 'actions/trackingKeys'
import { fetchOrder } from 'routes/Menu/apis/orderV2'
import { redirect } from 'utils/window'

import * as menuApis from '../../routes/Menu/fetchData/menuApi'

jest.mock('apis/orders')
jest.mock('actions/basket')
jest.mock('selectors/features')
jest.mock('utils/window')

jest.mock('react-router-redux', () => ({
  push: jest.fn(),
}))

jest.mock('actions/recipes', () => ({
  recipesLoadFromMenuRecipesById: jest.fn(),
}))

jest.mock('actions/products', () => ({
  productsLoadProducts: jest.fn(),
  productsLoadStock: jest.fn(),
  productsLoadCategories: jest.fn(),
}))

jest.mock('actions/order', () => ({
  orderCheckPossibleDuplicate: jest.fn(),
}))

jest.mock('routes/Menu/apis/orderV2')

jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: () => 'local',
  getProtocol: () => 'http:',
}))

describe('orderConfirmation actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    safeJestMock(menuApis, 'fetchSimpleMenu').mockResolvedValue()
    getState.mockReturnValue({
      auth: Immutable.Map({
        accessToken: 'access-token',
      }),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('orderConfirmationRedirect', () => {
    const orderId = '1234'
    test('should call orderDetails', () => {
      orderConfirmationRedirect(orderId, 'transactional')(dispatch, getState)

      expect(dispatch).toHaveBeenCalled()
    })

    test('should call orderCheckPossibleDuplicate', () => {
      orderConfirmationRedirect(orderId, 'transactional')(dispatch, getState)

      expect(orderCheckPossibleDuplicate).toHaveBeenCalled()
    })

    test('should push the client to the order confirmation', () => {
      orderConfirmationRedirect(orderId, 'transactional')(dispatch, getState)

      expect(redirect).not.toHaveBeenCalled()
      expect(push).toHaveBeenCalledWith('/order-confirmation/1234?order_action=transactional')
    })
  })

  describe('orderDetails', () => {
    const orderId = '1234'
    beforeEach(() => {
      safeJestMock(menuApis, 'fetchSimpleMenu').mockResolvedValue({ data: [] })
    })

    test('should attempt to fetch the order details for the orderId given', async () => {
      fetchOrder.mockReturnValue(
        Promise.resolve({ data: { id: '1234', whenCutoff: '2019-04-12 19:00:00' } }),
      )

      await orderDetails(orderId)(dispatch, getState)

      expect(fetchOrder).toHaveBeenCalled()
    })

    describe('when fetchOrder returns an order containing recipe ids', () => {
      beforeEach(() => {
        fetchOrder.mockReturnValue(
          Promise.resolve({
            data: {
              id: '1234',
              whenCutoff: '2019-04-12 19:00:00',
              recipeItems: [{ recipeUuid: 'uuid-1' }, { recipeUuid: 'uuid-2' }],
            },
          }),
        )
      })

      test('should fetch the recipes for the given recipe ids in the order', async () => {
        await orderDetails(orderId)(dispatch, getState)

        expect(recipes.recipesLoadFromMenuRecipesById).toHaveBeenCalledWith(['uuid-1', 'uuid-2'])
      })
    })

    describe('when fetchOrder returns an order and a cutoff date', () => {
      beforeEach(() => {
        fetchOrder.mockReturnValue(
          Promise.resolve({
            data: {
              id: '1234',
              whenCutoff: '2019-04-12 19:00:00',
              periodId: '5678',
              deliveryDate: '2019-04-16 19:00:00',
              box: {
                numPortions: 4,
              },
              shippingAddress: {
                postcode: 'AA1 2AA',
              },
            },
          }),
        )
      })

      test('should fetch the products for the returned cutoff date', async () => {
        await orderDetails(orderId)(dispatch, getState)

        expect(productsLoadProducts).toHaveBeenCalledWith(
          '2019-04-12 19:00:00',
          '5678',
          { reload: true },
          [],
        )
      })

      test('should call basket order load for the returned order', async () => {
        const addRecipe = jest.fn()
        await orderDetails(orderId, addRecipe)(dispatch, getState)

        expect(basketOrderLoad).toHaveBeenCalledWith(
          orderId,
          addRecipe,
          Immutable.Map({
            id: '1234',
            whenCutoff: '2019-04-12 19:00:00',
            periodId: '5678',
            deliveryDate: '2019-04-16 19:00:00',
            box: Immutable.Map({
              numPortions: 4,
            }),
            shippingAddress: Immutable.Map({
              postcode: 'AA1 2AA',
            }),
          }),
        )
      })

      test('should fetch the products for the returned menu data', async () => {
        safeJestMock(menuApis, 'fetchSimpleMenu').mockResolvedValue({
          data: [
            {
              id: '1234',
              attributes: {
                ends_at: '2020-08-11T11:59:59+01:00',
              },
            },
          ],
        })

        await orderDetails(orderId)(dispatch, getState)

        expect(productsLoadProducts).toHaveBeenCalledWith(
          '2019-04-12 19:00:00',
          '5678',
          { reload: true },
          [
            {
              id: '1234',
              attributes: {
                ends_at: '2020-08-11T11:59:59+01:00',
              },
            },
          ],
        )
      })
    })

    describe('when the fetchOrder call fails', () => {
      beforeEach(() => {
        fetchOrder.mockReturnValue(Promise.reject(new Error('error')))
      })

      test('should not fetch the products', async () => {
        await orderDetails(orderId)(dispatch, getState)

        expect(productsLoadProducts).not.toHaveBeenCalled()
      })
    })
  })

  describe('orderConfirmationProductTracking', () => {
    const trackingData = {
      eventName: marketProductAdded,
      trackingData: '1234',
    }
    test('should return actionType as MarketProduct Added if boolean value is true', () => {
      orderConfirmationProductTracking(trackingData, true)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.BASKET_PRODUCT_TRACKING,
        trackingData: {
          actionType: marketProductAdded,
          trackingData: {
            trackingData: '1234',
            eventName: marketProductAdded,
          },
        },
      })
    })

    test('should return actionType as MarketProduct Removed if boolean value is false', () => {
      trackingData.eventName = marketProductRemoved

      orderConfirmationProductTracking(trackingData, false)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.BASKET_PRODUCT_TRACKING,
        trackingData: {
          actionType: marketProductRemoved,
          trackingData: {
            trackingData: '1234',
            eventName: marketProductRemoved,
          },
        },
      })
    })
  })

  describe('orderConfirmationUpdateOrderTracking', () => {
    beforeEach(() => {
      getState.mockReturnValueOnce({
        basket: Immutable.fromJS({
          orderId: '123',
          orderDetails: {
            prices: {
              total: '25.5',
              promoCode: false,
            },
          },
        }),
        user: Immutable.fromJS({
          subscription: {
            state: 'active',
          },
        }),
      })
    })

    test('should dispatch orderConfirmationUpdateOrderTracking with the right details', () => {
      orderConfirmationUpdateOrderTracking()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_CONFIRMATION_EDITED_TRACKING,
        trackingData: {
          actionType: 'Order Edited',
          order_id: '123',
          order_total: '25.5',
          promo_code: false,
          signup: false,
          subscription_active: true,
        },
      })
    })
  })
})
