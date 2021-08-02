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
    { disabled: false, name: 'Help', url: '/help-centre', clientRouted: false },
    { disabled: false, name: 'Rate My Recipes', url: '/rate-my-recipes', clientRouted: false, tracking: 'clickRateRecipes' },
  ]

  describe('when the menu is rendered', () => {
    let wrapper
    const trackClickRateRecipesSpy = jest.fn()
    const trackNavigationClick = jest.fn()

    describe('and customer is authenticated', () => {
      beforeEach(() => {
        wrapper = mount(
          <BurgerMobileMenu
            show
            menuItems={menuItems}
            isAuthenticated
            loginFunc={jest.fn()}
            logoutFunc={jest.fn()}
            hideNav={false}
            promoCodeUrl=""
            trackClickRateRecipes={trackClickRateRecipesSpy}
            trackNavigationClick={trackNavigationClick}
            onLoginClick={jest.fn()}
            onLogoutClick={jest.fn()}
            helpPreLoginVisibilityChange={jest.fn()}
          />
        )
      })

      test('should render all menu items provided as links', () => {
        expect(wrapper.find(Link)).toHaveLength(4)
        expect(wrapper.find(Link).at(0).prop('to')).toEqual('/home')
        expect(wrapper.find(Link).at(1).prop('to')).toEqual('/menu')
        expect(wrapper.find(Link).at(2).prop('to')).toEqual('/help-centre')
        expect(wrapper.find(Link).at(3).prop('to')).toEqual('/rate-my-recipes')
      })

      test('Links should dispatch a tracking action', () => {
        wrapper.find(Link).find({ to: '/menu' }).at(0).simulate('click')
        expect(trackNavigationClick).toHaveBeenCalled()
      })

      test('rate-my-recipes button should dispatch a tracking action', () => {
        wrapper.find(Link).find({ to: '/rate-my-recipes' }).at(0).simulate('click')
        expect(trackClickRateRecipesSpy).toHaveBeenCalledWith('hamburger')
      })

      test('Help link should dispatch a tracking action with correct data', () => {
        const TRACKING_DATA = {
          actionType: 'click_help_navigation',
          seCategory: 'help',
          logged_in: true,
        }
        const helpLink = wrapper
          .find(Link)
          .filterWhere((link) => link.prop('to') === '/help-centre')
        helpLink.simulate('click')
        expect(trackNavigationClick).toHaveBeenCalledWith(TRACKING_DATA)
      })

      test('the help link is not clientRouted', () => {
        const helpLink = wrapper
          .find(Link)
          .filterWhere((link) => link.prop('to') === '/help-centre')
        expect(helpLink.prop('clientRouted')).toBe(false)
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
          trackNavigationClick,
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

        test('Help link should dispatch a tracking action with correct data', () => {
          const TRACKING_DATA = {
            actionType: 'click_help_navigation',
            seCategory: 'help',
            logged_in: false,
          }

          expect(trackNavigationClick).toHaveBeenCalledWith(TRACKING_DATA)
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
