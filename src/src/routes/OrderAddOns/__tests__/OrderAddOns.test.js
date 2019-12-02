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
    basket: Immutable.Map(),
    productsCategories: Immutable.Map(),
    orderConfirmationRedirect: jest.fn(),
    basketReset: jest.fn(),
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

  describe('when skipping the page', () => {
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
