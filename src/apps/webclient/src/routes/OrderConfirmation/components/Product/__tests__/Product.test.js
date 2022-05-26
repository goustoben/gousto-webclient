import React from 'react'

import { mount } from 'enzyme'
import Immutable from 'immutable'

import { marketProductAdded } from 'actions/trackingKeys'
import { mockProduct } from 'routes/OrderConfirmation/components/config'

import { Product } from '../Product.logic'

jest.mock('../../ProductDetails', () => ({
  ProductDetailContainer: jest.fn(() => 'div'),
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
      expect(wrapper.find('img').prop('src')).toBe(
        'https://production-media.gousto.co.uk/cms/product-image-landscape/YAddOns-WhiteWines-Borsao_013244-x400.jpg',
      )
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

    test('should not render low stock ribbon if stock more than lowStockThreshold', () => {
      mockProduct.stock = 12
      wrapper = mount(<Product product={mockProduct} ageVerified />)
      expect(wrapper.find('.productLowStock').length).toBe(0)
    })

    test('should not render the low stock ribbon if the product is out of stock', () => {
      mockProduct.stock = 0
      wrapper = mount(<Product product={mockProduct} ageVerified />)
      expect(wrapper.find('.productLowStock').length).toBe(0)
    })

    test('product price is not rendered with the product header', () => {
      expect(wrapper.find('.productInfo').find('.productPrice').exists()).toBe(false)
    })

    test('product price is rendered in the same level as Add Product button', () => {
      expect(wrapper.find('.productContent').childAt(1).find('.productPrice').exists()).toBe(true)

      expect(wrapper.find('.productContent').childAt(1).find('Buttons').exists()).toBe(true)
    })

    test('Button is set to fullWidth', () => {
      expect(
        wrapper.find('.productButtonWrapper').find('Button').hasClass('btnWrapper--fullWidth'),
      ).toEqual(true)
    })

    describe('when product is missing image', () => {
      beforeEach(() => {
        const mockWithoutImages = {
          ...mockProduct,
          images: {
            400: null,
          },
        }

        wrapper = mount(<Product product={mockWithoutImages} ageVerified />)
      })

      test('should render image of product', () => {
        expect(wrapper.find('img').length).toBe(1)
        expect(wrapper.find('img').prop('src')).toBe(null)
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
  })

  describe('add/remove product', () => {
    beforeEach(() => {
      mockProduct.stock = 100
      wrapper = mount(
        <Product
          product={mockProduct}
          ageVerified
          limitReached={false}
          basketProductAdd={jest.fn()}
          basketProductRemove={jest.fn()}
          temp={jest.fn()}
        />,
      )
    })

    test('should change the qty of the product', async () => {
      wrapper.setProps({
        basket: Immutable.fromJS({
          products: {
            1234: 1,
          },
        }),
      })

      expect(wrapper.text()).toContain('-1+')
      wrapper.setProps({
        basket: Immutable.fromJS({
          products: {},
        }),
      })

      expect(wrapper.text()).toContain('Add')
    })

    test('given product is 18+ and user not age verified, should call toggleAgeVerificationPopUp', () => {
      const toggleAgeVerificationPopUpSpy = jest.fn()

      wrapper.setProps({
        ageVerified: false,
        toggleAgeVerificationPopUp: toggleAgeVerificationPopUpSpy,
      })

      wrapper.find('Buttons').prop('onAdd')()
      expect(toggleAgeVerificationPopUpSpy).toHaveBeenCalled()
    })

    test('should dispatch the order confirmation product tracking with the correct props', async () => {
      const orderConfirmationProductTrackingMock = jest.fn()
      await wrapper.setProps({
        basket: Immutable.fromJS({
          products: {
            1234: 1,
          },
        }),
        limitReached: false,
        ageVerified: true,
        product: {
          ageRestricted: false,
          id: '1234',
        },
        category: 'Test Category',
        basketProductAdd: jest.fn(),
        orderConfirmationProductTracking: orderConfirmationProductTrackingMock,
      })

      const { onAddProduct } = wrapper.instance()
      await onAddProduct()

      expect(orderConfirmationProductTrackingMock).toHaveBeenCalledWith({
        eventAction: 'clicked',
        eventName: marketProductAdded,
        eventProperties: {
          productProperties: { ageRestricted: false, category: 'Test Category', id: '1234' },
        },
        eventType: 'primary_action',
      })
    })
  })

  describe('toggle description popup', () => {
    beforeEach(() => {
      wrapper = mount(
        <Product
          product={mockProduct}
          ageVerified
          limitReached={false}
          basketProductAdd={jest.fn()}
          basketProductRemove={jest.fn()}
          temp={jest.fn()}
          openProductModalTracking={jest.fn()}
        />,
      )
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
        toggleAgeVerificationPopUp: toggleAgeVerificationPopUpSpy,
      })

      wrapper.find('button.productImage').simulate('click')
      expect(toggleAgeVerificationPopUpSpy).toHaveBeenCalled()
    })

    test('given product is 18+ and user not age verified, should call toggleAgeVerificationPopUp when click on Title', () => {
      const toggleAgeVerificationPopUpSpy = jest.fn()

      wrapper.setProps({
        ageVerified: false,
        toggleAgeVerificationPopUp: toggleAgeVerificationPopUpSpy,
      })

      wrapper.find('button.productInfo').simulate('click')
      expect(toggleAgeVerificationPopUpSpy).toHaveBeenCalled()
    })
  })
})
