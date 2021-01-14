import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { Checkout } from '../Checkout'
import { BaseBannerButton } from '../../BaseBannerButton'

describe('CheckoutButton', () => {
  let wrapper
  let propsToPass

  beforeEach(() => {
    propsToPass = {
      view: '',
      section: 'menu',
      checkoutBasket: jest.fn(),
      isAuthenticated: false,
      menuRecipes: Immutable.List(),
      numPortions: 2,
      stock: Immutable.Map({}),
    }
  })

  describe('the button text', () => {
    test('is Checkout', () => {
      wrapper = shallow(<Checkout />)

      expect(wrapper.childAt(0).text()).toBe('Checkout')
    })
  })

  describe('when the button\'s nested child is clicked', () => {
    const wrapAndClick = (props) => {
      const checkoutProps = { ...propsToPass, ...props }
      wrapper = shallow(
        <Checkout {...checkoutProps} />
      )
      const child = wrapper.find(BaseBannerButton)

      child.prop('onClick')()
    }
    test('should trigger an checkoutTransactionalOrder', () => {
      const checkoutBasket = jest.fn()

      wrapAndClick({
        isAuthenticated: true,
        checkoutBasket,
      })

      expect(checkoutBasket).toHaveBeenCalled()
    })
  })
})
