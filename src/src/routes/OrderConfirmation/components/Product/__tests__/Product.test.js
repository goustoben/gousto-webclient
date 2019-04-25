import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'

import logger from 'utils/logger'
import { mockProduct } from 'routes/OrderConfirmation/components/config'
import { orderConfirmationProductTracking } from 'actions/orderConfirmation'

import { Product } from '../Product.logic'

jest.mock('../../ProductDetails', () => 'div')

jest.mock('actions/orderConfirmation', () => ({
  orderConfirmationProductTracking: jest.fn(),
}))

global.scrollTo = jest.fn()

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
      wrapper = mount(<Product product={mockProduct} ageVerified limitReached={false} basketProductAdd={jest.fn()} basketProductRemove={jest.fn()} temp={jest.fn()} />)
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

    test('given product is 18+ and user not age verified, should call toggleAgeVerificationPopUp', () => {
      const toggleAgeVerificationPopUpSpy = jest.fn()

      wrapper.setProps({
        ageVerified: false,
        toggleAgeVerificationPopUp: toggleAgeVerificationPopUpSpy
      })

      wrapper.find('Buttons').prop('onAdd')()
      expect(toggleAgeVerificationPopUpSpy).toHaveBeenCalled()
    })

    test('should dispatch the order confirmation product tracking with the correct props', () => {
      wrapper.setProps({
        basket: Immutable.fromJS({
          products: {
            "1234": 1,
          }
        }),
        limitReached: false,
        ageVerified: true,
        product: {
          ageRestricted: false,
          id: "1234"
        },
        basketProductAdd: jest.fn(),
        orderConfirmationProductTracking: jest.fn()
      })

      const { onAddProduct } = wrapper.instance()
      Promise.all(onAddProduct()).then(() => {
        expect(orderConfirmationProductTracking).toHaveBeenCalledWith('1234', true)
      })
        .catch(err => {
          logger.error(err)
        })
    })
  })

  describe('toggle description popup', () => {
    beforeEach(() => {
      wrapper = mount(<Product product={mockProduct} ageVerified limitReached={false} basketProductAdd={jest.fn()} basketProductRemove={jest.fn()} temp={jest.fn()}/>)
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

    test('given product is 18+ and user not age verified, should call toggleAgeVerificationPopUp when click on Image', () => {
      const toggleAgeVerificationPopUpSpy = jest.fn()

      wrapper.setProps({
        ageVerified: false,
        toggleAgeVerificationPopUp: toggleAgeVerificationPopUpSpy
      })

      wrapper.find('button.productImage').simulate('click')
      expect(toggleAgeVerificationPopUpSpy).toHaveBeenCalled()
    })

    test('given product is 18+ and user not age verified, should call toggleAgeVerificationPopUp when click on Title', () => {
      const toggleAgeVerificationPopUpSpy = jest.fn()

      wrapper.setProps({
        ageVerified: false,
        toggleAgeVerificationPopUp: toggleAgeVerificationPopUpSpy
      })

      wrapper.find('button.productInfo').simulate('click')
      expect(toggleAgeVerificationPopUpSpy).toHaveBeenCalled()
    })

  })
})
