import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { Product } from '..'
import { mockProduct } from '../config'
global.scrollTo = jest.fn()

jest.mock('../../ProductDetails', () => 'div')

describe('Product component', () => {
  let wrapper

  describe('render', () => {
    beforeEach(() => {
      
      wrapper = mount(<Product product={mockProduct} ageVerified />)
    })
    
    test('should render image of product', () => {
      expect(wrapper.find('img').length).toBe(1)
    })

    test('should render title of product', () => {
      expect(wrapper.find('.productTitle').length).toBe(1)
    })

    test('should render price of product', () => {
      expect(wrapper.find('.productPrice').length).toBe(1)
    })

    test('should render add button', () => {
      expect(wrapper.find('Button').length).toBe(1)
    })

    test('should render low stock ribbon if stock less than lowStockThreshold', () => {
      mockProduct.stock = 9
      wrapper = mount(<Product product={mockProduct} ageVerified />)
      expect(wrapper.find('.productLowStock').length).toBe(1)
    })

    test('should NOT render low stock ribbon if stock more than lowStockThreshold', () => {
      mockProduct.stock = 12
      wrapper = mount(<Product product={mockProduct} ageVerified />)
      expect(wrapper.find('.productLowStock').length).toBe(0)
    })
  })

  describe('add/remove product', () => {
    beforeEach(() => {
      wrapper = mount(<Product product={mockProduct} ageVerified limitReached={false} basketProductAdd={jest.fn()} basketProductRemove={jest.fn()} />)
    })
    test('should change the qty of the product', async() => {
      wrapper.setProps({
        basket: Immutable.fromJS({
          products: {
            "1234": 1,
          }
        })
      })

      expect(wrapper.text()).toContain('-1+')
      wrapper.setProps({
        basket: Immutable.fromJS({
          products: {}
        })
      })
      expect(wrapper.text()).toContain('Add')
    })
  })

  describe('toggle description popup', () => {
    beforeEach(() => {
      wrapper = mount(<Product product={mockProduct} ageVerified limitReached={false} basketProductAdd={jest.fn()} basketProductRemove={jest.fn()} />)
    })

    test('should show description popup when click on the image', () => {
      expect(wrapper.state().showDetailsScreen).toBe(false)
      wrapper.find('button.productImage').simulate('click')
      expect(wrapper.state().showDetailsScreen).toBe(true)
    })

    test('should show description popup when click on title', () => {
      expect(wrapper.state().showDetailsScreen).toBe(false)
      wrapper.find('button.productInfo').simulate('click')
      expect(wrapper.state().showDetailsScreen).toBe(true)
    })

  })
})
