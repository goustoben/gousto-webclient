import React, { Fragment } from 'react'
import { shallow } from 'enzyme'

import CheckoutButton from 'BoxSummary/CheckoutButton/CheckoutButton'

describe('CheckoutButton', () => {
  let wrapper

  describe('when the button\'s nested child is clicked', () => {
    const onClick = jest.fn()

    const wrapAndClick = (props) => {
      wrapper = shallow(
        <CheckoutButton {...props} onClick={onClick}>
          <Fragment>
            <Fragment className="child" />
          </Fragment>
        </CheckoutButton>
      )
      const child = wrapper.find('.child')

      child.simulate('click')
    }

    afterEach(() => {
      onClick.mockClear()
    })

    test('should trigger the onClick handler', () => {
      wrapAndClick()

      expect(onClick).toHaveBeenCalled()
    })

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
