import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { OrderAddOns } from '../OrderAddOns'

describe('the OrderAddOns component', () => {
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
    basketUpdateProducts: jest.fn(),
    orderAction: 'choice',
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
      expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, mockProps.orderAction)
    })
  })

  describe('when skipping the page using the skip link', () => {
    beforeEach(() => {
      const pageHeader = wrapper.find('OrderAddOnsHeader').dive()
      pageHeader.find('.skipButton').simulate('click')
    })

    test('resets the basket', () => {
      expect(mockProps.basketReset).toHaveBeenCalledTimes(1)
    })

    test('redirects to the order confirmation page', () => {
      const { orderConfirmationRedirect, orderId } = mockProps
      expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, mockProps.orderAction)
    })
  })

  describe('when no products have been added', () => {
    let continueButton

    beforeEach(() => {
      wrapper.setProps({ basket: Immutable.fromJS({ products: {} }) })
      continueButton = wrapper.find('.ContinueButton')
    })

    test('continue button shows the correct copy without any price', () => {
      expect(continueButton.children().text()).toBe('Continue without items')
      expect(continueButton.prop('extraInfo')).toBe(null)
    })

    describe('and the continue button is clicked', () => {
      beforeEach(() => {
        continueButton.simulate('click')
      })

      test('resets the basket', () => {
        expect(mockProps.basketReset).toHaveBeenCalledTimes(1)
      })

      test('redirects to the order confirmation page', () => {
        const { orderConfirmationRedirect, orderId } = mockProps
        expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, mockProps.orderAction)
      })
    })
  })

  describe('when products have been added', () => {
    let continueButton

    beforeEach(() => {
      wrapper.setProps({
        basket: Immutable.fromJS({
          products: {
            'product2': 1,
            'product4': 2,
          }
        }),
        basketProductsCost: '8.00',
      })
      continueButton = wrapper.find('.ContinueButton')
    })

    test('continue button shows the correct copy and price', () => {
      expect(continueButton.children().text()).toBe('Continue with items')
      expect(continueButton.prop('extraInfo')).toBe('+£8.00')
    })

    describe('and the continue button is clicked', () => {
      beforeEach(() => {
        wrapper.find('OrderAddOnsFooter').find('.ContinueButton').simulate('click')
      })

      test('basketUpdateProducts is called', () => {
        expect(mockProps.basketUpdateProducts).toHaveBeenCalledTimes(1)
      })

      test('does not reset the basket', () => {
        expect(mockProps.basketReset).not.toHaveBeenCalled()
      })

      test('redirects to the order confirmation page', () => {
        const { orderConfirmationRedirect, orderId } = mockProps
        expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, mockProps.orderAction)
      })

      describe('and products fail to be added', () => {
        beforeEach(() => {
          mockProps.basketUpdateProducts.mockRejectedValue('error')
          wrapper.find('OrderAddOnsFooter').find('.ContinueButton').simulate('click')
        })

        test('redirects to the order confirmation page', () => {
          const { orderConfirmationRedirect, orderId } = mockProps
          expect(orderConfirmationRedirect).toHaveBeenCalledWith(orderId, mockProps.orderAction)
        })
      })
    })
  })
})
