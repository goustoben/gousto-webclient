import React from 'react'
import { shallow } from 'enzyme'

import Immutable from 'immutable'
import actions from 'actions'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { Header } from 'Header/Header'
import routesConfig from 'config/routes'
import * as trackingKeys from 'actions/trackingKeys'

jest.mock('actions')
jest.mock('actions/login')

const { loginVisibilityChange } = actions

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const store = {
    serverError: false,
    auth: Immutable.Map({
      isAuthenticated: true,
      isAdmin: false,
    }),
    routing: {},
    basket: Immutable.fromJS({
      promoCodeUrl: '',
    }),
    loginVisibility: Immutable.fromJS({
      login: false,
      helpPreLogin: false,
    }),
    features: Immutable.fromJS({}),
    persist: Immutable.fromJS({
      simpleHeader: false,
    }),
  }

  let wrapper
  const trackNavigationClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Header
        loginVisibilityChange={loginVisibilityChange}
        helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
        closeBoxModalVisibilityChange={() => {}}
        logoutUser={() => {}}
        trackNavigationClick={trackNavigationClick}
      />,
      { context: { store } }
    )
  })

  test('renders the <CookieBanner />', () => {
    expect(wrapper.find('Connect(CookieBanner)').exists()).toBe(true)
  })

  test('should render one <MobileMenu />', () => {
    expect(wrapper.find('MobileMenu').exists()).toBe(true)
  })

  test('renders 1 logo link', () => {
    expect(wrapper.find('.logoLink').length).toEqual(1)
  })

  test('renders 4 desktop links', () => {
    expect(wrapper.find('.linkDesktop').length).toEqual(4)
  })

  test('renders the JS enabled MobileMenu toggle by default', () => {
    expect(wrapper.find('[data-testing="header"]').prop('id')).toEqual(null)
  })

  test('renders a PromoModal component', () => {
    expect(wrapper.find('Connect(PromoModalWrapper)').exists()).toBe(true)
  })

  test('renders a CancelOrderModal component', () => {
    expect(wrapper.find('Connect(CancelOrderModal)').exists()).toBe(true)
  })

  test('renders a ExpiredBillingModal component', () => {
    expect(wrapper.find('Connect(ExpiredBillingModal)').exists()).toBe(true)
  })

  test('renders a DuplicateOrderModal component', () => {
    expect(wrapper.find('Connect(DuplicateOrderModalWrapper)').exists()).toBe(true)
  })

  test('renders a SubscriptionPause component', () => {
    expect(wrapper.find('Connect(SubscriptionPause)').exists()).toBe(true)
  })

  test('does not open other links in a new tab', () => {
    const linksWithNewTab = wrapper.findWhere(n => n.prop('target') === '_blank')

    expect(linksWithNewTab).toHaveLength(0)
  })

  describe('use app cta', () => {
    describe('when the user is logged in and the pathname is NOT /menu', () => {
      beforeEach(() => {
        wrapper.setProps({
          isAuthenticated: true,
          routing: {
            locationBeforeTransitions: {
              pathname: '/',
            },
          },
        })
      })

      test('then the use app cta should render', () => {
        expect(wrapper.find('Button').findWhere(el => el.text() === 'Use App').exists()).toEqual(true)
      })
    })

    describe('when the user is logged in and the pathname is /menu', () => {
      beforeEach(() => {
        wrapper.setProps({
          isAuthenticated: true,
          routing: {
            locationBeforeTransitions: {
              pathname: '/menu',
            },
          },
        })
      })

      test('then the use app cta should NOT render', () => {
        expect(wrapper.find('Button').findWhere(el => el.text() === 'Use App').exists()).toEqual(false)
      })
    })

    describe('when the user is NOT logged in and the pathname is NOT /menu', () => {
      beforeEach(() => {
        wrapper.setProps({
          isAuthenticated: false,
          routing: {
            locationBeforeTransitions: {
              pathname: '/',
            },
          },
        })
      })

      test('then the use app cta should NOT render', () => {
        expect(wrapper.find('Button').findWhere(el => el.text() === 'Use App').exists()).toEqual(false)
      })
    })

    describe('when the user is NOT logged in and the pathname is /menu', () => {
      beforeEach(() => {
        wrapper.setProps({
          isAuthenticated: false,
          routing: {
            locationBeforeTransitions: {
              pathname: '/menu',
            },
          },
        })
      })

      test('then the use app cta should NOT render', () => {
        expect(wrapper.find('Button').findWhere(el => el.text() === 'Use App').exists()).toEqual(false)
      })
    })

    describe('when the user clicks', () => {
      const trackNavigationClickSpy = jest.fn()

      beforeEach(() => {
        wrapper = shallow(<Header isAuthenticated trackNavigationClick={trackNavigationClickSpy} />, { context: { store } })

        delete window.location
        window.location = { assign: jest.fn() }

        wrapper.find('Button').simulate('click')
      })

      test('then trackNavigationClick should be called', () => {
        expect(trackNavigationClickSpy).toHaveBeenCalledWith({ actionType: 'UseAppHeaderCta Clicked' })
      })

      test('then the user should be redirected to /apps', () => {
        expect(window.location.assign).toHaveBeenCalledWith('/apps')
      })
    })
  })

  describe('when abandonBasketFeature flag is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ abandonBasketFeature: true })
    })

    describe('and isNotFirstLoadOfSession is not set to true', () => {
      beforeEach(() => {
        window.sessionStorage.removeItem('isNotFirstLoadOfSession')
      })

      test('renders the <AbandonBasketModal />', () => {
        expect(wrapper.find('Connect(AbandonBasketModal)').exists()).toBe(true)
      })
    })
  })

  describe('when abandonBasketFeature flag is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ abandonBasketFeature: false })
    })

    test('does not render the <AbandonBasketModal />', () => {
      expect(wrapper.find('Connect(AbandonBasketModal)').exists()).toBe(false)
    })
  })

  describe('when existing menu path is passed as prop', () => {
    beforeEach(() => {
      wrapper.setProps({ path: 'box-prices' })
    })

    test('renders 4 desktop links', () => {
      expect(wrapper.find('.linkDesktop').length).toEqual(4)
    })
  })

  describe('when promocode is provided', () => {
    const PROMO_CODE = 'test'

    beforeEach(() => {
      wrapper.setProps({ promoCodeUrl: PROMO_CODE })
    })

    test('updates the homepage link', () => {
      expect(wrapper.find('GoustoLink').first().props().to).toEqual(`/${PROMO_CODE}`)
    })
  })

  describe('when path contains "check-out"', () => {
    beforeEach(() => {
      wrapper.setProps({ path: 'check-out' })
    })

    test('updates the homepage link to /menu', () => {
      expect(wrapper.find('GoustoLink').first().prop('to')).toEqual('/menu')
    })
  })

  describe('when displaying the simple header', () => {
    beforeEach(() => {
      wrapper.setProps({ simple: true })
    })

    test('does not render a <MobileMenu />', () => {
      expect(wrapper.find('MobileMenu').exists()).toBe(false)
    })
  })

  describe('when serverError prop is true', () => {
    beforeEach(() => {
      wrapper.setProps({ serverError: true })
    })

    test('renders the fallback MobileMenu toggle', () => {
      expect(wrapper.find('[data-testing="header"]').prop('id')).toBe('mobileMenu')
    })
  })

  describe('when isAuthenticated prop is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isAuthenticated: true, userId: '123' })
    })

    test('renders referFriend', () => {
      expect(wrapper.find('GoustoLink').at(2).childAt(0).text()).toEqual('Free Food')
    })

    test('does NOT render Login button', () => {
      expect(wrapper.find('Button').findWhere(el => el.text() === 'Login').exists()).toEqual(false)
    })

    test('does render Logout button', () => {
      expect(wrapper.find('Button').findWhere(el => el.text() === 'Logout').exists()).toEqual(false)
    })

    test('renders menu items in correct order', () => {
      const expected = [
        {
          clientRouted: true,
          name: 'Account',
          url: routesConfig.client.myGousto,
          tracking: 'MyGoustoNavigation Clicked',
        },
        {
          clientRouted: false,
          name: 'Upcoming Deliveries',
          url: routesConfig.client.myDeliveries,
          tracking: 'DeliveriesNavigation Clicked',
        },
        {
          clientRouted: true,
          name: 'Subscription Settings',
          url: routesConfig.client.mySubscription,
          tracking: 'SubscriptionSettingsNavigation Clicked',
        },
        {
          clientRouted: false,
          name: 'Account Details',
          url: routesConfig.client.myDetails,
          tracking: 'DetailsNavigation Clicked',
        },
        {
          clientRouted: true,
          name: 'Refer a Friend',
          url: routesConfig.client.myReferral,
          tracking: 'ReferAFriendNavigation Clicked',
        },
        {
          clientRouted: false,
          name: 'Rate My Recipes',
          url: routesConfig.client.rateMyRecipes,
          tracking: 'RateMyRecipes Clicked',
        },
        {
          clientRouted: true,
          disabled: true,
          name: 'Home',
          url: routesConfig.client.home,
        },
        {
          name: 'Choose Recipes',
          url: routesConfig.client.menu,
          tracking: trackingKeys.clickRecipeNavigation,
        },
        {
          clientRouted: false,
          name: 'Sustainability',
          url: routesConfig.client.weCare,
          tracking: 'SustainabilityNavigation Clicked',
        },
        {
          clientRouted: false,
          name: 'Help',
          url: routesConfig.client.helpCentre,
          tracking: 'click_help_navigation',
        }
      ]

      expect(wrapper.find('MobileMenu').prop('mobileMenuItems')).toEqual(expected)
    })

    test('on desktop the help links to the help centre', () => {
      const helpLink = wrapper.find('GoustoLink').at(4)

      expect(helpLink.prop('to')).toContain('/help-centre')
    })

    test('on mobile the help links to the help centre', () => {
      const helpMenuItem = wrapper
        .find('MobileMenu')
        .prop('mobileMenuItems')
        .filter((menuItem) => menuItem.name === 'Help')
        .pop()

      expect(helpMenuItem.url).toContain('/help-centre')
    })

    test('help link dispatches a tracking action with correct data', () => {
      const TRACKING_DATA = {
        actionType: 'click_help_navigation',
        seCategory: 'help',
        logged_in: true,
      }
      const helpLink = wrapper.find('GoustoLink').at(4)
      helpLink.prop('tracking')()

      expect(trackNavigationClick).toHaveBeenCalledWith(TRACKING_DATA)
    })
  })

  describe('when isAuthenticated prop is false', () => {
    beforeEach(() => {
      wrapper.setProps({ isAuthenticated: false, helpPreLoginVisibilityChange })
    })

    test('renders boxPrices', () => {
      expect(wrapper.find('GoustoLink').at(1).childAt(0).text()).toEqual('Box Prices')
    })

    test('does NOT render Logout button', () => {
      expect(wrapper.find('Button').findWhere(el => el.text() === 'Logout').exists()).toEqual(false)
    })

    test('does render Login button', () => {
      expect(wrapper.find('Button').findWhere(el => el.text() === 'Login').exists()).toEqual(false)
    })

    test('should render menu items in correct order', () => {
      const expected = [
        {
          clientRouted: true,
          disabled: true,
          name: 'Home',
          url: routesConfig.client.home,
        },
        {
          clientRouted: true,
          name: 'Box Prices',
          url: routesConfig.client.boxPrices,
          tracking: 'BoxPricingNavigation Clicked',
        },
        {
          name: 'Choose Recipes',
          url: routesConfig.client.menu,
          tracking: trackingKeys.clickRecipeNavigation,
        },
        {
          clientRouted: false,
          name: 'Sustainability',
          url: routesConfig.client.weCare,
          tracking: 'SustainabilityNavigation Clicked',
        },
        {
          clientRouted: false,
          name: 'Help',
          url: routesConfig.client.helpCentre,
          tracking: 'click_help_navigation',
        }
      ]
      expect(wrapper.find('MobileMenu').prop('mobileMenuItems')).toEqual(expected)
    })

    test('the help link is not a Link component', () => {
      const helpLink = wrapper.find('[data-test="help-link"]')
      expect(helpLink.name()).not.toBe('GoustoLink')
    })

    describe('and Help link is clicked', () => {
      beforeEach(() => {
        const helpLink = wrapper.find('[data-test="help-link"]')
        helpLink.simulate('click')
      })

      test('helpPreLoginVisibilityChange action generator is called with visibility true', () => {
        expect(helpPreLoginVisibilityChange).toHaveBeenCalledWith(true)
      })

      test('tracking action is dispatched with correct data', () => {
        const TRACKING_DATA = {
          actionType: 'click_help_navigation',
          seCategory: 'help',
          logged_in: false,
        }

        expect(trackNavigationClick).toHaveBeenCalledWith(TRACKING_DATA)
      })
    })

    describe('and Help link is clicked using ENTER in the keyboard', () => {
      beforeEach(() => {
        const helpLink = wrapper.find('[data-test="help-link"]')
        helpLink.simulate('keyDown', { keyCode: 13 })
      })

      test('helpPreLoginVisibilityChange action generator is called with visibility true', () => {
        expect(helpPreLoginVisibilityChange).toHaveBeenCalledWith(true)
      })
    })
  })

  describe('Given isHelpPreloginOpen changes from false to true', () => {
    const trackHelpPreLoginModalDisplayed = jest.fn()
    const trackContinueAsNewCustomer = jest.fn()

    beforeEach(() => {
      wrapper.setProps({ isHelpPreLoginOpen: true, trackHelpPreLoginModalDisplayed, trackContinueAsNewCustomer })
    })

    test('renders the Login component with pre loging Help title', () => {
      expect(wrapper.find('Connect(LoginWrapper)').prop('title'))
        .toBe('We can help you faster if you\'re logged in')
    })

    test('renders the Continue as new customer link to Help Centre', () => {
      expect(wrapper.find('.continueAsNewCustomerLink').prop('to'))
        .toBe(routesConfig.client.helpCentre)
    })

    test('renders the Continue as new customer link with client routed set to false', () => {
      expect(wrapper.find('.continueAsNewCustomerLink').prop('clientRouted'))
        .toBe(false)
    })

    test('tracks Continue as new customer link', () => {
      expect(wrapper.find('.continueAsNewCustomerLink').prop('tracking'))
        .toBe(trackContinueAsNewCustomer)
    })

    test('tracks Help Pre Login modal visibility', () => {
      expect(trackHelpPreLoginModalDisplayed).toHaveBeenCalled()
    })

    describe('and the close button of the modal panel is clicked', () => {
      beforeEach(() => {
        wrapper.find('ModalPanel').prop('closePortal')()
      })

      test.each([
        [loginVisibilityChange.name, loginVisibilityChange],
        [helpPreLoginVisibilityChange.name, helpPreLoginVisibilityChange],
      ])('%s is called with visibility set to false', (_actionName, action) => {
        expect(action).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('handleQuery', () => {
    beforeEach(() => {
      wrapper.setProps({
        isAuthenticated: true,
        routing: {
          locationBeforeTransitions: {
            pathname: '/my-referrals',
            query: {
              from_wizard: true,
            },
          },
        },
      })
    })

    test('should return correct results when from_wizard is set to true', () => {
      const result = wrapper.instance().handleQuery()
      expect(result).toEqual({ fromWizard: true, newPath: '/my-referrals' })
    })

    test('should return correct results when from_wizard is NOT set to true', () => {
      wrapper.setProps({
        isAuthenticated: true,
        routing: {
          locationBeforeTransitions: {
            pathname: '/my-referrals',
            query: {
              from_wizard: false,
            },
          },
        },
      })

      const result = wrapper.instance().handleQuery()
      expect(result).toEqual({ fromWizard: false, newPath: '/my-referrals' })
    })
  })

  describe('when onCloseCancelBoxModal is called', () => {
    let instance
    const closeBoxModalVisibilityChange = jest.fn()

    beforeEach(() => {
      wrapper.setProps({
        closeBoxModalVisibilityChange
      })
      instance = wrapper.instance()
      instance.onCloseCancelBoxModal()
    })

    test('then closeBoxModalVisibilityChange should be called with true', () => {
      expect(closeBoxModalVisibilityChange).toHaveBeenCalled()
    })
  })
})
