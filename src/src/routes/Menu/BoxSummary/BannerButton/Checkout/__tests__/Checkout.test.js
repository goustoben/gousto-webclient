import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { Checkout } from '../Checkout'
import { BaseBannerButton } from '../../BaseBannerButton'

describe('CheckoutButton', () => {
  let wrapper
  let propsToPass
  let sidesExperimentEnabled = false

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

    jest.spyOn(React, 'useContext').mockImplementation(() => (
      sidesExperimentEnabled
    ))
  })

  describe('the button text', () => {
    test('is Checkout', () => {
      wrapper = shallow(<Checkout />)

      expect(wrapper.childAt(0).text()).toBe('Checkout')
    })
  })

  describe('when order is a transactional order', () => {
    beforeEach(() => {
      propsToPass.isBasketTransactionalOrder = true
    })

    const wrapAndClick = (props) => {
      const checkoutProps = { ...propsToPass, isAuthenticated: true, ...props }
      wrapper = shallow(<Checkout {...checkoutProps} />)
      const child = wrapper.find(BaseBannerButton)

      child.prop('onClick')()
    }

    describe('when experiment is not enabled', () => {
      beforeEach(() => {
        sidesExperimentEnabled = false
      })

      test('when the button\'s nested child is clicked it should trigger a basket checkout', () => {
        const checkoutBasket = jest.fn()
        const openSidesModal = jest.fn()

        wrapAndClick({ checkoutBasket, openSidesModal })

        expect(openSidesModal).not.toHaveBeenCalled()
        expect(checkoutBasket).toHaveBeenCalled()
      })
    })

    describe('when experiment is enabled', () => {
      beforeEach(() => {
        sidesExperimentEnabled = true
      })

      test('when the button\'s nested child is clicked it should trigger a basket checkout', () => {
        const checkoutBasket = jest.fn()
        const openSidesModal = jest.fn()

        wrapAndClick({ checkoutBasket, openSidesModal })

        expect(openSidesModal).not.toHaveBeenCalled()
        expect(checkoutBasket).toHaveBeenCalled()
      })
    })
  })

  describe('when order is not transactional order', () => {
    beforeEach(() => {
      propsToPass.isBasketTransactionalOrder = false
    })

    const wrapAndClick = (props) => {
      const checkoutProps = { ...propsToPass, ...props }
      wrapper = shallow(<Checkout {...checkoutProps} />)
      const child = wrapper.find(BaseBannerButton)

      child.prop('onClick')()
    }

    describe('when experiment is not enabled', () => {
      beforeEach(() => {
        sidesExperimentEnabled = false
      })

      test('when the button\'s nested child is clicked it should trigger a basket checkout', () => {
        const checkoutBasket = jest.fn()
        const openSidesModal = jest.fn()

        wrapAndClick({ checkoutBasket, openSidesModal })

        expect(openSidesModal).not.toHaveBeenCalled()
        expect(checkoutBasket).toHaveBeenCalled()
      })
    })

    describe('when experiment is enabled', () => {
      beforeEach(() => {
        sidesExperimentEnabled = true
      })

      test('when the button\'s nested child is clicked it should trigger the sides modal opening', () => {
        const checkoutBasket = jest.fn()
        const openSidesModal = jest.fn()

        wrapAndClick({ checkoutBasket, openSidesModal })

        expect(openSidesModal).toHaveBeenCalled()
        expect(checkoutBasket).not.toHaveBeenCalled()
      })
    })
  })
})
