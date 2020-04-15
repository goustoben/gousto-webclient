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
    const wrap = (props) => {
      const checkoutProps = { ...propsToPass, ...props }
      wrapper = shallow(
        <Checkout {...checkoutProps} />
      )
    }

    describe('when the "isAddOnsFeatureFlagOn" is true and user is logged in', () => {
      beforeEach(() => {
        wrap({ isAddOnsFeatureFlagOn: true, isAuthenticated: true })
      })

      test('is Confirm', () => {
        expect(wrapper.childAt(0).text()).toBe('Confirm')
      })
    })

    describe('when the "isAddOnsFeatureFlagOn" is false and user is logged in', () => {
      beforeEach(() => {
        wrap({ isAddOnsFeatureFlagOn: false, isAuthenticated: true })
      })

      test('is Checkout', () => {
        expect(wrapper.childAt(0).text()).toBe('Checkout')
      })
    })

    describe('when the user is not logged in', () => {
      beforeEach(() => {
        wrap({ isAuthenticated: false })
      })

      test('is Checkout', () => {
        expect(wrapper.childAt(0).text()).toBe('Checkout')
      })
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
