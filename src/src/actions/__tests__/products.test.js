import Immutable from 'immutable'
import productActions from '../products'
import statusActions from '../status'
import actionTypes from 'actions/actionTypes'

const { productsLoadProducts} = productActions

jest.mock('apis/products', () => ({
  fetchProducts: jest.fn().mockReturnValue(
    Promise.resolve({ data: ['1', '2'] })
  )}))

describe('productsLoadProducts', () => {
  let fetchProductsMock0
  let dispatchSpy
  let getStateSpy
  const statusPendingSpy = jest.spyOn(statusActions, 'pending')
  const statusErrorSpy = jest.spyOn(statusActions, 'error')

  beforeEach(() => {
    dispatchSpy = jest.fn()
    getStateSpy = () => ({
      auth: Immutable.Map({ accessToken: 'access-token' }),
      products: Immutable.OrderedMap({}),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should dispatch status "pending" true for PRODUCTS_RECEIVE action before fetching products', async function() {
    await productsLoadProducts()(dispatchSpy, getStateSpy)

    expect(statusPendingSpy).toHaveBeenCalledWith(actionTypes.PRODUCTS_RECEIVE, true)
  })

  // test('should dispatch status "pending" false for PRODUCTS_RECEIVE action after fetching products', async function() {
  //   await productActions.productsLoadProducts()(dispatchSpy, getStateSpy)

  //   expect(statusPendingSpy.args[1]).to.deep.equal([actionTypes.PRODUCTS_RECEIVE, false])
  // })

  // test('should dispatch status "error" true for PRODUCTS_RECEIVE action if an error occurs while fetching products', async function() {
  //   fetchProductsMock.returns(new Promise(function() { throw new Error('error!') }))

  //   productActions = require('inject-loader?apis/products&./status&!actions/products')({
  //     'apis/products': { fetchProducts: fetchProductsMock },
  //     './status': { pending: statusPendingSpy, error: statusErrorSpy },
  //   }).default

  //   await productActions.productsLoadProducts()(dispatchSpy, getStateSpy)

  //   expect(statusErrorSpy.args[0]).to.deep.equal([actionTypes.PRODUCTS_RECEIVE, new Error('error!').message])
  // })

  // test('should fetch products by default if none have been fetched', async function() {
  //   await productActions.productsLoadProducts()(dispatchSpy, getStateSpy)

  //   const dispatchSpyCalls = dispatchSpy.args[1]
  //   expect(dispatchSpyCalls[0]).to.deep.equal({
  //     type: actionTypes.PRODUCTS_RECEIVE,
  //     products: ['1', '2'],
  //     cutoffDate: undefined,
  //   })

  //   const fetchProductsMockCalls = fetchProductsMock.args[0]
  //   expect(fetchProductsMockCalls[0]).to.equal('accessToken')
  // })

  // test('should not fetch products by default if there are products in product store & no cutoffDate is passed in', async function() {
  //   getStateSpy.returns({
  //     auth: Immutable.fromJS({ accessToken: 'accessToken' }),
  //     products: Immutable.fromJS({
  //       1: { id: '1', title: 'Title 1' },
  //     }),
  //   })

  //   await productActions.productsLoadProducts()(dispatchSpy, getStateSpy)

  //   expect(fetchProductsMock).to.not.have.been.called
  // })

  // test('should fetch products for given cutoff date when cutoffDate is passed in', async function() {
  //   await productActions.productsLoadProducts('whenCutoff timestamp')(dispatchSpy, getStateSpy)

  //   const dispatchSpyCalls = dispatchSpy.args[1]
  //   expect(dispatchSpyCalls[0]).to.deep.equal({
  //     type: actionTypes.PRODUCTS_RECEIVE,
  //     products: ['1', '2'],
  //     cutoffDate: 'whenCutoff timestamp',
  //   })

  //   const fetchProductsMockCalls = fetchProductsMock.args[0]
  //   expect(fetchProductsMockCalls[0]).to.equal('accessToken')
  //   expect(fetchProductsMockCalls[1]).to.equal('whenCutoff timestamp')
  // })
})