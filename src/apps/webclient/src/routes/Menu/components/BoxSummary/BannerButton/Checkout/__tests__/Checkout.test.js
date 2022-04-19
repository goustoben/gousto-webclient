import React from 'react'
import { shallow } from 'enzyme'
import * as Redux from 'react-redux'
import Immutable from 'immutable'
import { Checkout } from '../Checkout'
import { BaseBannerButton } from '../../BaseBannerButton'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => true),
  useSelector: jest.fn(),
}))

jest.mock('utils/configFromWindow', () => ({
  getClientEnvironment: () => 'local',
}))

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
      isBoxSummaryOpened: false,
      toggleBasketView: () => {}
    }
    jest.spyOn(Redux, 'useSelector').mockReturnValue(true) // getIsSimplifyBasketBarEnabled
  })

  describe('the button text', () => {
    test('is Checkout', () => {
      wrapper = shallow(<Checkout />)

      expect(wrapper.childAt(0).text()).toBe('Checkout')
    })
  })

  describe('when order is created', () => {
    const wrapAndClick = (props) => {
      const checkoutProps = { ...propsToPass, ...props }
      wrapper = shallow(<Checkout {...checkoutProps} />)
      const child = wrapper.find(BaseBannerButton)
      child.simulate('click', { stopPropagation: () => undefined })
    }

    test('when the button\'s nested child is clicked it should trigger a basket checkout', () => {
      const checkoutBasket = jest.fn()
      const openSidesModal = jest.fn()

      wrapAndClick({ checkoutBasket, openSidesModal })

      expect(openSidesModal).not.toHaveBeenCalled()
      expect(checkoutBasket).toHaveBeenCalled()
    })
  })
})
