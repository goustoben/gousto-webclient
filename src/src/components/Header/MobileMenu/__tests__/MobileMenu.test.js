import React from 'react'
import { shallow } from 'enzyme'
import { MobileMenu } from '../MobileMenu'

describe('MenuWrapper', () => {
  let wrapper
  const props = {
    isAuthenticated: false,
    hideNav: false,
    mobileMenuOpen: false,
    mobileMenuItems: [{ name: '', url: '' }],
    hideMobileMenu: false,
    onOpen: () => { },
    logoutFunc: () => { },
    showMobileMenu: () => { },
    promoCodeUrl: '',
    trackNavigationClick: () => { },
    serverError: false,
  }

  describe('when shouldRenderNewMenuDesign false', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        shouldRenderNewMenuDesign: false
      }
      wrapper = shallow(<MobileMenu {...newProps} />)
    })

    test('should render BurgerMobileMenu', () => {
      expect(wrapper.find('BurgerMobileMenu').exists()).toBe(true)
    })

    test('should render burgerMenu button', () => {
      expect(wrapper.find('[data-testing="burgerMenu"]').exists()).toBe(true)
    })
  })

  describe('when shouldRenderNewMenuDesign true', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        shouldRenderNewMenuDesign: true
      }
      wrapper = shallow(<MobileMenu {...newProps} />)
    })
    test('should render LinkMobileMenu', () => {
      expect(wrapper.find('LinkMobileMenu').exists()).toBe(true)
    })
  })
})
