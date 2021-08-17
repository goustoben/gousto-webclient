import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import * as useOptimizely from 'containers/OptimizelyRollouts/useOptimizely.hook'
import { Checkout } from '../Checkout'
import { BaseBannerButton } from '../../BaseBannerButton'

describe('CheckoutButton', () => {
  let wrapper
  let propsToPass
  let useIsOptimizelyFeatureEnabledSpy

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

    useIsOptimizelyFeatureEnabledSpy = jest.spyOn(useOptimizely, 'useIsOptimizelyFeatureEnabled').mockReturnValue(false)
  })

  describe('the button text', () => {
    test('is Checkout', () => {
      wrapper = shallow(<Checkout />)

      expect(wrapper.childAt(0).text()).toBe('Checkout')
    })
  })

  describe('when mounted useIsOptimizelyFeatureEnabled is called', () => {
    test('its called with experiment name, user id and tracking function', () => {
      const userId = 'user-id'
      const trackExperimentInSnowplow = jest.fn()

      wrapper = shallow(
        <Checkout
          userId={userId}
          trackExperimentInSnowplow={trackExperimentInSnowplow}
        />
      )

      expect(useIsOptimizelyFeatureEnabledSpy).toBeCalledWith({
        name: 'radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled',
        userId,
        trackExperimentInSnowplow
      })
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
        useIsOptimizelyFeatureEnabledSpy.mockReturnValue(false)
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
        useIsOptimizelyFeatureEnabledSpy.mockReturnValue(true)
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
        useIsOptimizelyFeatureEnabledSpy.mockReturnValue(false)
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
        useIsOptimizelyFeatureEnabledSpy.mockReturnValue(true)
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
