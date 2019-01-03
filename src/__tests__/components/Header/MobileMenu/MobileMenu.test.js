import React from 'react'
import { shallow } from 'enzyme'
import MobileMenu from 'Header/MobileMenu'

describe('MobileMenu', () => {
  describe('should render all items in the menu', () => {
    describe('when is authenticated', () => {
      const menuItem = [
        { name: 'Home', icon: 'home', url: '/home', clientRouted: true },
        { name: 'Choose Recipes', url: '/menu', icon: 'menu' },
        { name: 'Help', icon: 'faq', url: '/help', clientRouted: false },
        { name: 'Rate My Recipes', icon: 'star', url: '/rate-my-recipes', clientRouted: false },
      ]
      const wrapper = shallow(<MobileMenu
        show
        menuItems={menuItem}
        isAuthenticated
        loginFunc={jest.fn()}
        logoutFunc={jest.fn()}
        hideNav={false}
        promoCodeUrl={""}
      />)

      test('should render Rate My Recipe on burger menu', () => {
        expect(wrapper.find('.icon-star').length).toEqual(1)
      })
    })
  })
})
