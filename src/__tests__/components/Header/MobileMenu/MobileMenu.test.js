import React from 'react'
import { shallow } from 'enzyme'
import MobileMenu from 'Header/MobileMenu'
import Link from 'Link'

describe('MobileMenu', () => {
  const menuItems = [
    { name: 'Home', url: '/home', clientRouted: true },
    { name: 'Choose Recipes', url: '/menu' },
    { name: 'Help', url: '/help', clientRouted: false },
    { name: 'Rate My Recipes', url: '/rate-my-recipes', clientRouted: false },
  ]
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <MobileMenu
        show
        menuItems={menuItems}
        isAuthenticated
        loginFunc={jest.fn()}
        logoutFunc={jest.fn()}
        hideNav={false}
        promoCodeUrl={""}
      />
    )
  })

  describe('should render all items in the menu', () => {
    describe('when is authenticated', () => {
      test('should render all menu items provided as links', () => {
        expect(wrapper.find(Link).length).toEqual(4)
        expect(wrapper.find(Link).find({to:'/home'}).length).toEqual(1)
        expect(wrapper.find(Link).find({to:'/menu'}).length).toEqual(1)
        expect(wrapper.find(Link).find({to:'/help'}).length).toEqual(1)
        expect(wrapper.find(Link).find({to:'/rate-my-recipes'}).length).toEqual(1)
      })
    })
  })

  describe('clicking the menu items', () => {
    test('opens the Help link into a new tab', () => {
      const helpLink = wrapper.findWhere(n => n.prop('to') === '/help')
      expect(helpLink.prop('target')).toBe('_blank')
    })

    test('does not open other links in a new tab', () => {
      const linksWithNewTab = wrapper.findWhere(n => n.prop('target') === '_blank')
      expect(linksWithNewTab).toHaveLength(1)
    })
  })
})
