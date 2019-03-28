import Immutable from 'immutable'
import { fetchOrder } from 'apis/orders'
import { orderDetails } from '../orderConfirmation'
import productActions from '../products'

jest.mock('../products', () => ({
  productsLoadProducts: jest.fn(),
  productsLoadStock: jest.fn(),
  productsLoadCategories: jest.fn()
}))

jest.mock('apis/orders', () => ({
  fetchOrder: jest.fn()
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

  test('should fetch the products for the given cutoff date', async () => {
    fetchOrder.mockReturnValue(
      Promise.resolve({ data: { id: '1234', whenCutOff: '2019-04-12 19:00:00' } })
    )

    const productsLoadProductsSpy = jest.spyOn(productActions, 'productsLoadProducts')
    await orderDetails('1234')(dispatchSpy, getStateSpy)
    expect(productsLoadProductsSpy).toHaveBeenCalledWith('2019-04-12 19:00:00')
  })

  test('should fetch the products for the given cutoff date', async () => {
    fetchOrder.mockReturnValue(
      Promise.reject(new Error('error'))
    )
    const productsLoadProductsSpy = jest.spyOn(productActions, 'productsLoadProducts')
    await orderDetails('1234')(dispatchSpy, getStateSpy)
    expect(productsLoadProductsSpy).not.toHaveBeenCalled()
  })
})
