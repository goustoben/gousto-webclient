import React from 'react'
import { shallow } from 'enzyme'
import MobileMenu from 'Header/MobileMenu'
import Link from 'Link'

describe('MobileMenu', () => {
  describe('should render all items in the menu', () => {
    describe('when is authenticated', () => {
      const menuItem = [
        { name: 'Home', url: '/home', clientRouted: true },
        { name: 'Choose Recipes', url: '/menu' },
        { name: 'Help', url: '/help', clientRouted: false },
        { name: 'Rate My Recipes', url: '/rate-my-recipes', clientRouted: false },
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

      test('should render all menu items provided as links', () => {
        expect(wrapper.find(Link).length).toEqual(4)
        expect(wrapper.find(Link).find({to:'/home'}).length).toEqual(1)
        expect(wrapper.find(Link).find({to:'/menu'}).length).toEqual(1)
        expect(wrapper.find(Link).find({to:'/help'}).length).toEqual(1)
        expect(wrapper.find(Link).find({to:'/rate-my-recipes'}).length).toEqual(1)
      })
    })
  })
})
