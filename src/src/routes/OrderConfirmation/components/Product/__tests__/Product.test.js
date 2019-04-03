import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { Product } from '..'
import { mockProduct } from '../config'

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
})
