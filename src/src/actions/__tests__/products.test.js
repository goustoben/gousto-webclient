import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'
import { fetchProducts } from 'apis/products'
import productActions from '../products'
import statusActions from '../status'

const { productsLoadProducts} = productActions

jest.mock('apis/products', () => ({
  fetchProducts: jest.fn()
}))

describe('productsLoadProducts', () => {
  let dispatchSpy
  let getStateSpy
  const statusPendingSpy = jest.spyOn(statusActions, 'pending')
  const statusErrorSpy = jest.spyOn(statusActions, 'error')

  beforeEach(() => {
    fetchProducts.mockReturnValue(Promise.resolve(
      { data: [
        {id:'1', isForSale: true},
        {id:'2', isForSale: true}
      ]}
    ))

    dispatchSpy = jest.fn()
    getStateSpy = () => ({
      auth: Immutable.Map({ accessToken: 'access-token' }),
      products: Immutable.OrderedMap({}),
      productsStock: Immutable.OrderedMap({1:1000, 2:1000}),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should dispatch status "pending" true for PRODUCTS_RECEIVE action before fetching products', async () => {
    await productsLoadProducts()(dispatchSpy, getStateSpy)

    expect(statusPendingSpy.mock.calls[0]).toEqual([actionTypes.PRODUCTS_RECEIVE, true])
  })

  test('should dispatch status "pending" false for PRODUCTS_RECEIVE action after fetching products', async () => {
    await productsLoadProducts()(dispatchSpy, getStateSpy)

    expect(statusPendingSpy.mock.calls[1]).toEqual([actionTypes.PRODUCTS_RECEIVE, false])
  })

  test('should dispatch status "error" true for PRODUCTS_RECEIVE action if an error occurs while fetching products', async () => {
    fetchProducts.mockReturnValue(Promise.reject( new Error('error!') ))

    await productsLoadProducts()(dispatchSpy, getStateSpy)

    expect(statusErrorSpy.mock.calls[0]).toEqual([actionTypes.PRODUCTS_RECEIVE, new Error('error!').message])
  })

  test('should fetch in stock products by default if none have been fetched', async () => {
    await productsLoadProducts()(dispatchSpy, getStateSpy)

    const dispatchSpyCalls = dispatchSpy.mock.calls[1]
    const cutoffDate = undefined
    expect(dispatchSpyCalls[0]).toEqual({
      type: actionTypes.PRODUCTS_RECEIVE,
      products: [
        {id:'1', isForSale: true},
        {id:'2', isForSale: true}
      ],
      cutoffDate: cutoffDate,
    })
    expect(fetchProducts).toHaveBeenCalledWith('access-token', cutoffDate)
  })

  test('should not fetch products by default if there are products in product store & no cutoffDate is passed in', async () => {
    getStateSpy = () => ({
      auth: Immutable.fromJS({ accessToken: 'accessToken' }),
      products: Immutable.fromJS({
        1: { id: '1', title: 'Title 1' },
      }),
    })

    await productsLoadProducts()(dispatchSpy, getStateSpy)

    expect(fetchProducts).not.toHaveBeenCalled()
  })

  test('should fetch products for given cutoff date when cutoffDate is passed in', async () => {
    await productsLoadProducts('whenCutoff timestamp')(dispatchSpy, getStateSpy)

    const dispatchSpyCalls = dispatchSpy.mock.calls[1]
    expect(dispatchSpyCalls[0]).toEqual({
      type: actionTypes.PRODUCTS_RECEIVE,
      products: [
        {id:'1', isForSale: true},
        {id:'2', isForSale: true}
      ],
      cutoffDate: 'whenCutoff timestamp',
    })

    expect(fetchProducts).toHaveBeenCalledWith('access-token','whenCutoff timestamp')
  })
})
