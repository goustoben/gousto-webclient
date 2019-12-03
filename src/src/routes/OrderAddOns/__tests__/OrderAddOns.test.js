import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { OrderAddOns } from '../OrderAddOns'

describe('the OrderAddOns component', () => {
  const basketUpdateProducts = jest.fn()
  let wrapper
  const mockProps = {
    orderDetails: () => {},
    orderId: '123456',
    products: {
      '12345': { id: '12345', title: 'First test product' }
    },
    ageVerified: true,
    basket: Immutable.fromJS({
      products: {},
    }),
    productsCategories: Immutable.Map(),
    orderConfirmationRedirect: jest.fn(),
    basketReset: jest.fn(),
    basketUpdateProducts,
  }

  beforeEach(() => {
    wrapper = shallow(<OrderAddOns {...mockProps} />)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should pass the number of products to the header', () => {
    expect(wrapper.find('OrderAddOnsHeader').prop('numberOfProducts')).toBe(Object.keys(mockProps.products).length)
  })

  describe('when the page is loading', () => {
    beforeEach(() => {
      wrapper.setProps({ isPageLoading: true })
    })

    test('renders only a PageLoader', () => {
      expect(wrapper.find('PageLoader')).toHaveLength(1)
      expect(wrapper.find('LayoutPageWrapper').exists()).toBe(false)
    })
  })

  describe('the continueWithoutProducts class method', () => {
    beforeEach(() => {
      wrapper.instance().continueWithoutProducts()
    })

    test('resets the basket', () => {
      expect(mockProps.basketReset).toHaveBeenCalledTimes(1)
    })

    test('redirects to the order confirmation page', () => {
      const { orderConfirmationRedirect, orderId } = mockProps
      expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, 'choice')
    })
  })

  describe('skipping the page without products', () => {
    describe('when clicking the skip link in the header', () => {
      beforeEach(() => {
        const pageHeader = wrapper.find('OrderAddOnsHeader').dive()
        pageHeader.find('.skipButton').simulate('click')
      })

      test('resets the basket', () => {
        expect(mockProps.basketReset).toHaveBeenCalledTimes(1)
      })

      test('redirects to the order confirmation page', () => {
        const { orderConfirmationRedirect, orderId } = mockProps
        expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, 'choice')
      })
    })
  })

  describe('when clicking the continue without products button', () => {
    describe('and products basket are empty', () => {
      beforeEach(() => {
        wrapper.find('OrderAddOnsFooter').find('.ContinueButton').simulate('click')
      })

      test('resets the basket', () => {
        expect(mockProps.basketReset).toHaveBeenCalledTimes(1)
      })

      test('redirects to the order confirmation page', () => {
        const { orderConfirmationRedirect, orderId } = mockProps
        expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, 'choice')
      })
    })

    describe('and products basket are not empty', () => {
      beforeEach(() => {
        wrapper.setProps({
          basket: Immutable.fromJS({ products: { '2': 2 }, orderId: '123' })
        })

        wrapper.find('OrderAddOnsFooter').find('.ContinueButton').simulate('click')
      })

      test('basketUpdateProducts is being called correctly', () => {
        expect(basketUpdateProducts).toHaveBeenCalledTimes(1)
      })

      test('not reset the basket', () => {
        expect(mockProps.basketReset).not.toHaveBeenCalled()
      })

      test('redirects to the order confirmation page', () => {
        const { orderConfirmationRedirect, orderId } = mockProps
        expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, 'choice')
      })

      describe('products has returned an error', () => {
        beforeEach(() => {
          basketUpdateProducts.mockRejectedValue('error')

          wrapper.find('OrderAddOnsFooter').find('.ContinueButton').simulate('click')
        })

        test('redirects to the order confirmation page', () => {
          const { orderConfirmationRedirect, orderId } = mockProps
          expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, 'choice')
        })
      })
    })
  })
})
