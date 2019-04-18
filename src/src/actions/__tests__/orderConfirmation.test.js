import Immutable from 'immutable'
import { fetchOrder } from 'apis/orders'
import { orderDetails, orderConfirmationProductTracking } from '../orderConfirmation'
import recipeActions from '../recipes'
import productActions from '../products'
import basketActions from '../basket'
import actionTypes from '../actionTypes'

jest.mock('../recipes', () => ({
  recipesLoadRecipesById: jest.fn()
}))

jest.mock('../products', () => ({
  productsLoadProducts: jest.fn(),
  productsLoadStock: jest.fn(),
  productsLoadCategories: jest.fn()
}))

jest.mock('apis/orders', () => ({
  fetchOrder: jest.fn()
}))

jest.mock('../basket', () => ({
  basketOrderLoad: jest.fn()
}))

describe('orderDetails', () => {
  const dispatchSpy = jest.fn()
  const getStateSpy = () => ({
    auth: Immutable.Map({ accessToken: 'access-token' }),
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should get the order details for the orderId given', async () => {
    fetchOrder.mockReturnValue(
      Promise.resolve({ data: { id: '1234', whenCutOff: '2019-04-12 19:00:00' } })
    )

    await orderDetails('1234')(dispatchSpy, getStateSpy)
    expect(fetchOrder).toHaveBeenCalled()
  })

  test('should fetch the recipes for the given recipe ids in the order', async () => {
    fetchOrder.mockReturnValue(
      Promise.resolve({ data: { id: '1234', whenCutOff: '2019-04-12 19:00:00', recipeItems: [{itemableId: '1'}, {itemableId: '2'}] } })
    )

    const recipesLoadRecipesByIdSpy = jest.spyOn(recipeActions, 'recipesLoadRecipesById')
    await orderDetails('1234')(dispatchSpy, getStateSpy)
    expect(recipesLoadRecipesByIdSpy).toHaveBeenCalledWith([ '1','2'])
  })

  test('should fetch the products for the given cutoff date', async () => {
    fetchOrder.mockReturnValue(
      Promise.resolve({ data: { id: '1234', whenCutOff: '2019-04-12 19:00:00' } })
    )

    const productsLoadProductsSpy = jest.spyOn(productActions, 'productsLoadProducts')
    await orderDetails('1234')(dispatchSpy, getStateSpy)
    expect(productsLoadProductsSpy).toHaveBeenCalledWith('2019-04-12 19:00:00')
  })

  test('should fetch the basket order load for the given order', async () => {
    fetchOrder.mockReturnValue(
      Promise.resolve({ data: { id: '1234', whenCutOff: '2019-04-12 19:00:00' } })
    )

    const order = Immutable.Map ({
      "id": "1234", 
      "whenCutOff": "2019-04-12 19:00:00"
    })
    
    const basketOrderLoadSpy = jest.spyOn(basketActions, 'basketOrderLoad')
    await orderDetails('1234')(dispatchSpy, getStateSpy)
    expect(basketOrderLoadSpy).toHaveBeenCalledWith('1234', order)
  })

  test('should not fetch the products if order details are not retrieved', async () => {
    fetchOrder.mockReturnValue(
      Promise.reject(new Error('error'))
    )
    const productsLoadProductsSpy = jest.spyOn(productActions, 'productsLoadProducts')
    await orderDetails('1234')(dispatchSpy, getStateSpy)
    expect(productsLoadProductsSpy).not.toHaveBeenCalled()
  })
})

describe('orderConfirmationProductTracking', () => {
  const dispatch = jest.fn()

  test('should return actionType as MarketProduct Added if boolean value is true', () => {
    const productId = '1234'
    const added = true

    orderConfirmationProductTracking(productId, added)(dispatch)
    
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.BASKET_PRODUCT_TRACKING,
      trackingData: {
        actionType: 'MarketProduct Added',
        product_id: '1234'
      }
    })
  })

  test('should return actionType as MarketProduct Removed if boolean value is false', () => {
    const productId = '1234'
    const added = false

    orderConfirmationProductTracking(productId, added)(dispatch)
    
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.BASKET_PRODUCT_TRACKING,
      trackingData: {
        actionType: 'MarketProduct Removed',
        product_id: '1234'
      }
    })
  })
})
