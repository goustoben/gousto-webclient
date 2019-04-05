import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { ProductList } from '..'
import { mockProducts } from '../../config' 

jest.mock('utils/basket', () => ({
  getProductLimitReached: jest.fn()
}))

describe('ProductList component', () => {
  let wrapper
  const propsProductList = { 
    basket: Immutable.fromJS({
      products: {
        '1234': 1
      }
    }),
    productsCategories: Immutable.Map({}),
    ageVerified: true,
    basketProductAdd: jest.fn(),
    basketProductRemove: jest.fn(),
  }

  describe('render', () => {
    test('should NOT render product lost wrapper if no products', () => {
      wrapper = mount(<ProductList {...propsProductList} />)
      expect(wrapper.find('div.productList').length).toBe(0)
    })
  
    test('should render product list wrapper', () => {
      propsProductList.products = mockProducts,
      wrapper = mount(<ProductList {...propsProductList} />)
      expect(wrapper.find('div.productList').length).toBe(1)
    })

    test('should render 2 products', () => {
      propsProductList.products = mockProducts,
      wrapper = mount(<ProductList {...propsProductList} />)
      expect(wrapper.find('Product').length).toBe(2)
    })

  })
})
