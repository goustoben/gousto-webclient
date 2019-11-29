import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { Checkout } from '../Checkout'
import { BaseBannerButton } from '../../BaseBannerButton'

describe('CheckoutButton', () => {
  let wrapper

  describe('when the button\'s nested child is clicked', () => {
    const wrapAndClick = (props) => {
      const propsToPass = {
        boxSummaryVisibilityChange: jest.fn(),
        basketCheckedOut: jest.fn(),
        basketProceedToCheckout: jest.fn(),
        isAuthenticated: false,
        menuRecipes: Immutable.List(),
        numPortions: 0,
        slotId: '',
        stock: Immutable.Map({}),
        ...props
      }

      wrapper = shallow(
        <Checkout {...propsToPass} />
      )
      const child = wrapper.find(BaseBannerButton)

      child.prop('onClick')()
    }

    describe('when orderId is set', () => {
      test('should trigger an orderUpdate', () => {
        const orderUpdate = jest.fn()

        wrapAndClick({
          orderId: 'test',
          orderUpdate,
        })

        expect(orderUpdate).toHaveBeenCalled()
      })
    })

    describe('when orderId is not set and user is not authenticated', () => {
      test('should trigger a basketProceedToCheckout', () => {
        const basketProceedToCheckout = jest.fn()

        wrapAndClick({
          basketProceedToCheckout,
        })

        expect(basketProceedToCheckout).toHaveBeenCalled()
      })
    })

    describe('when orderId is not set and user is authenticated', () => {
      test('should trigger an checkoutTransactionalOrder', () => {
        const checkoutTransactionalOrder = jest.fn()

        wrapAndClick({
          isAuthenticated: true,
          checkoutTransactionalOrder,
        })

        expect(checkoutTransactionalOrder).toHaveBeenCalled()
      })
    })
  })
})
