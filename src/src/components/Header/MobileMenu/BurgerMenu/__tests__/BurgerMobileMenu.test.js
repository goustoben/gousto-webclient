import React from 'react'
import { shallow, mount } from 'enzyme'
import Link from 'Link'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { BurgerMobileMenu } from '../BurgerMobileMenu'

jest.mock('actions/login')

describe('given BurgerMobileMenu is called', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const menuItems = [
    { disabled: false, name: 'Home', url: '/home', clientRouted: true },
    { disabled: false, name: 'Choose Recipes', url: '/menu' },
    { disabled: false, name: 'Help', url: '/help', clientRouted: true },
    { disabled: false, name: 'Rate My Recipes', url: '/rate-my-recipes', clientRouted: false, tracking: 'clickRateRecipes' },
  ]

  describe('when the menu is rendered', () => {
    let wrapper

    beforeEach(() => {
      const trackClickRateRecipesSpy = jest.fn()
      const trackNavigationClickSpy = jest.fn()
      wrapper = shallow(
        <BurgerMobileMenu
          show
          menuItems={menuItems}
          isAuthenticated={false}
          loginFunc={jest.fn()}
          logoutFunc={jest.fn()}
          hideNav={false}
          promoCodeUrl=""
          trackClickRateRecipes={trackClickRateRecipesSpy}
          trackNavigationClick={trackNavigationClickSpy}
          onLoginClick={jest.fn()}
          onLogoutClick={jest.fn()}
          helpPreLoginVisibilityChange={jest.fn()}
        />
      )
    })

    describe('and customer is authenticated', () => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated: true })
      })

      test('should render all menu items provided as links', () => {
        expect(wrapper.find(Link)).toHaveLength(4)
        expect(wrapper.find(Link).find({ to: '/home' })).toHaveLength(1)
        expect(wrapper.find(Link).find({ to: '/menu' })).toHaveLength(1)
        expect(wrapper.find(Link).find({ to: '/help' })).toHaveLength(1)
        expect(wrapper.find(Link).find({ to: '/rate-my-recipes' })).toHaveLength(1)
      })

      test('rate-my-recipes button should dispatch a tracking action', () => {
        const trackClickRateRecipesSpy = jest.fn()
        const trackNavigationClickSpy = jest.fn()
        wrapper = mount(
          <BurgerMobileMenu
            show
            menuItems={menuItems}
            isAuthenticated={false}
            loginFunc={jest.fn()}
            logoutFunc={jest.fn()}
            hideNav={false}
            promoCodeUrl=""
            trackClickRateRecipes={trackClickRateRecipesSpy}
            trackNavigationClick={trackNavigationClickSpy}
            onLoginClick={jest.fn()}
            onLogoutClick={jest.fn()}
            helpPreLoginVisibilityChange={jest.fn()}
          />
        )
        wrapper.find(Link).find({ to: '/rate-my-recipes' }).at(0).simulate('click')
        expect(trackClickRateRecipesSpy).toHaveBeenCalledWith('hamburger')
        expect(trackNavigationClickSpy).toHaveBeenCalledWith('clickRateRecipes')
      })

      describe('and the feature isHelpCentreActive is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isHelpCentreActive: true })
        })

        test('the help link points to the help centre', () => {
          const helpLink = wrapper
            .find(Link)
            .filterWhere((link) => link.prop('to') === '/help-centre')
          expect(helpLink.exists()).toBe(true)
        })

        test('the help link is not clientRouted', () => {
          const helpLink = wrapper
            .find(Link)
            .filterWhere((link) => link.prop('to') === '/help-centre')
          expect(helpLink.prop('clientRouted')).toBe(false)
        })
      })

      describe('when a menu option is set as disabled', () => {
        const disabledLink = {
          disabled: true,
          name: 'Test',
          url: '/test',
          clientRouted: false,
        }

        beforeEach(() => {
          menuItems.push(disabledLink)

          wrapper = shallow(
            <BurgerMobileMenu
              show
              menuItems={menuItems}
              isAuthenticated
              loginFunc={jest.fn()}
              logoutFunc={jest.fn()}
              hideNav={false}
              promoCodeUrl=""
              trackClickRateRecipes={jest.fn()}
              trackNavigationClick={jest.fn()}
              onLoginClick={jest.fn()}
              onLogoutClick={jest.fn()}
              helpPreLoginVisibilityChange={jest.fn()}
            />
          )
        })

        test('the Link component should not wrap a disabled item', () => {
          expect(wrapper.find(Link).find({ to: '/test' })).toHaveLength(0)
          expect(wrapper.find('.disabled').length).toBe(1)
        })
      })
    })

    describe('given the user is logged out', () => {
      let helpLink

      beforeEach(() => {
        wrapper.setProps({
          isAuthenticated: false,
          helpPreLoginVisibilityChange,
        })
        helpLink = wrapper.find('[data-test="help-link"]')
      })

      test('the help link is not a Link component', () => {
        expect(helpLink.name()).not.toBe('GoustoLink')
      })

      describe('when Help link is clicked', () => {
        beforeEach(() => {
          helpLink.simulate('click')
        })

        test('helpPreLoginVisibilityChange action generator is called with visibility true', () => {
          expect(helpPreLoginVisibilityChange).toHaveBeenCalledWith(true)
        })
      })

      describe('when Help link is clicked using ENTER in the keyboard', () => {
        beforeEach(() => {
          helpLink.simulate('keyDown', { keyCode: 13 })
        })

        test('helpPreLoginVisibilityChange action generator is called with visibility true', () => {
          expect(helpPreLoginVisibilityChange).toHaveBeenCalledWith(true)
        })
      })
    })
  })
})
