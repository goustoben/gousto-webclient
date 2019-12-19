import React from 'react'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import basketReducer, { initialState as basketDefaultState } from 'reducers/basket'
import productsReducer from 'reducers/products'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import featuresReducer, { initialState as featuresDefaultState } from 'reducers/features'
import status from 'reducers/status'
import { fetchOrder } from 'apis/orders'
import { fetchProductCategories, fetchProductStock, fetchProducts } from 'apis/products'
import { OrderAddOnsContainer } from '../OrderAddOnsContainer'

jest.mock('apis/products')
jest.mock('apis/orders')

describe('<OrderAddOnsContainer />', () => {
  fetchOrder.mockResolvedValue({
    data: { id: '123', whenCutOff: '', periodId: '' }
  })

  fetchProducts.mockResolvedValue({ data: [
    { id: '1', listPrice: '2.00', isForSale: true, categories: [{ id: 'fec10d0e-bf7d-11e5-90a9-02fada0dd3b8' }] },
    { id: '2', listPrice: '2.00', isForSale: true, categories: [{ id: 'fec10d0e-bf7d-11e5-90a9-02fada0dd3b9' }] },
    { id: '3', listPrice: '2.00', isForSale: true, categories: [{ id: 'fec10d0e-bf7d-11e5-90a9-02fada0dd3b8' }] },
    { id: '4', listPrice: '2.00', isForSale: true, categories: [{ id: 'fec10d0e-bf7d-11e5-90a9-02fada0dd3b9' }] },
  ] })
  fetchProductCategories.mockResolvedValue({ data: {} })
  fetchProductStock.mockResolvedValue({ data: {} })

  const store = createStore(
    combineReducers(
      Object.assign(
        {},
        { ...authReducer },
        { ...basketReducer },
        { ...featuresReducer },
        { ...productsReducer },
        { ...userReducer },
        { ...status },
      )
    ),
    {
      auth: authDefaultState(),
      basket: Immutable.fromJS({
        ...basketDefaultState().toJS(),
        products: {
          '2': 2
        },
        orderId: '123',
      }),
      features: featuresDefaultState(),
      user: userDefaultState,
      pending: Immutable.Map()
    },
    compose(applyMiddleware(thunk))
  )
  const ORDER_ACTION = 'transaction'
  const location = {
    pathname: '/order-add-ons/123',
    query: { order_action: ORDER_ACTION},
  }
  const wrapper = mount(
    <OrderAddOnsContainer
      location={location}
      store={store}
    />
  )

  describe('when products are loaded', () => {
    test('product list are rendered with desserts option only', async () => {
      await wrapper.update()

      const ProductList = wrapper.find('ProductList')

      expect(Object.keys(ProductList.prop('products')).length).toBe(2)
      expect(ProductList.prop('products')['2'].categories[0].id).toBe(
        'fec10d0e-bf7d-11e5-90a9-02fada0dd3b9'
      )
      expect(ProductList.prop('products')['4'].categories[0].id).toBe(
        'fec10d0e-bf7d-11e5-90a9-02fada0dd3b9'
      )
    })
  })

  describe('when component mounts', () => {
    test('orderDetails action is called correctly', () => {
      expect(wrapper.find('OrderAddOns').prop('orderId')).toBe('123')
    })

    test('order_action query parameter is mapped to orderAction prop', () => {
      expect(wrapper.find('OrderAddOns').prop('orderAction')).toBe(ORDER_ACTION)
    })
  })
})
