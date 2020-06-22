import React from 'react'
import { shallow } from 'enzyme'

import Immutable from 'immutable'
import actions from 'actions'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { Header } from 'Header/Header'
import routesConfig, { zendesk } from 'config/routes'
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

  beforeEach(() => {
    wrapper = shallow(
      <Header
        loginVisibilityChange={loginVisibilityChange}
        helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
        closeBoxModalVisibilityChange={() => {}}
        logoutUser={() => {}}
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
        expect(trackNavigationClickSpy).toHaveBeenCalledWith('UseAppHeaderCta Clicked')
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

  describe('isAccountTabNameTest', () => {
    beforeEach(() => {
      wrapper.setProps({ isAuthenticated: true })
    })

    describe('when isAccountTabNameTest is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ isAccountTabNameTest: true })
      })

      test('then the menu items should include "Upcoming Deliveries", "Subscription Settings" and "Account Details"', () => {
        const result = wrapper.instance().getMenuItems('mobile', '/')
        expect(result[1].name).toEqual('Upcoming Deliveries')
        expect(result[2].name).toEqual('Subscription Settings')
        expect(result[3].name).toEqual('Account Details')
      })
    })

    describe('when isAccountTabNameTest is set to false', () => {
      test('then the menu items should include "Deliveries", "My Subscription" and "Details"', () => {
        const result = wrapper.instance().getMenuItems('mobile', '/')
        expect(result[1].name).toEqual('Deliveries')
        expect(result[2].name).toEqual('Subscription')
        expect(result[3].name).toEqual('Details')
      })
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
      const getHelpRoute = routesConfig.client.getHelp
      const expected = [
        {
          clientRouted: true,
          name: 'My Gousto',
          url: routesConfig.client.myGousto,
          tracking: 'MyGoustoNavigation Clicked',
        },
        {
          clientRouted: false,
          name: 'Deliveries',
          url: routesConfig.client.myDeliveries,
          tracking: 'DeliveriesNavigation Clicked',
        },
        {
          clientRouted: false,
          name: 'Subscription',
          url: routesConfig.client.mySubscription,
          tracking: 'SubscriptionNavigation Clicked',
        },
        {
          clientRouted: false,
          name: 'Details',
          url: routesConfig.client.myDetails,
          tracking: 'DetailsNavigation Clicked',
        },
        {
          clientRouted: true,
          name: 'Free Food',
          url: routesConfig.client.myReferral,
          tracking: 'ReferAFriendNavigation Clicked',
        },
        {
          clientRouted: false,
          name: 'Rate My Recipes',
          url: routesConfig.client.rateMyRecipes,
          tracking: trackingKeys.clickRateMyRecipesNavigation,
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
          clientRouted: true,
          name: 'Help',
          url: `${getHelpRoute.index}/${getHelpRoute.eligibilityCheck}`,
          tracking: 'FAQNavigation Clicked',
        }
      ]

      expect(wrapper.find('MobileMenu').prop('mobileMenuItems')).toEqual(expected)
    })

    test('on desktop the help links to eligibility check page', () => {
      const helpLink = wrapper.find('GoustoLink').at(4)

      expect(helpLink.prop('to')).toContain('get-help/eligibility-check')
    })

    test('on mobile the help links to eligibility check page', () => {
      const helpMenuItem = wrapper
        .find('MobileMenu')
        .prop('mobileMenuItems')
        .filter((menuItem) => menuItem.name === 'Help')
        .pop()

      expect(helpMenuItem.url).toContain('get-help/eligibility-check')
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
      const getHelpRoute = routesConfig.client.getHelp
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
          clientRouted: true,
          name: 'Help',
          url: `${getHelpRoute.index}/${getHelpRoute.eligibilityCheck}`,
          tracking: 'FAQNavigation Clicked',
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

  describe('Given isHelpPreloginOpen is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isHelpPreLoginOpen: true })
    })

    test('renders the Login component with pre loging Help title', () => {
      expect(wrapper.find('Connect(Login)').prop('title'))
        .toBe('We can help you faster if you\'re logged in')
    })

    test('renders the Continue as new customer link to Zendesk', () => {
      expect(wrapper.find('.continueAsNewCustomerLink').prop('to'))
        .toBe(zendesk.faqs)
    })

    test('renders the Continue as new customer link with client routed set to false', () => {
      expect(wrapper.find('.continueAsNewCustomerLink').prop('clientRouted'))
        .toBe(false)
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

  describe('homepageRedesign', () => {
    describe('Given home page redesign is disabled', () => {
      describe('When isHomePageRedesignEnabled set to false/default', () => {
        beforeEach(() => {
          wrapper.setProps({ isHomePageRedesignEnabled: false })
        })
        test('Then Header should be rendered without homepageRedesign class attribute', () => {
          expect(wrapper.hasClass('homepageRedesign')).toBeFalsy()
        })
      })
    })

    describe('Given home page redesign is enabled', () => {
      describe('When isHomePageRedesignEnabled set to true', () => {
        beforeEach(() => {
          wrapper.setProps({ isHomePageRedesignEnabled: true })
        })
        test('Then Header should be rendered with homepageRedesign class attribute', () => {
          expect(wrapper.hasClass('homepageRedesign')).toBeTruthy()
        })
      })
    })
  })
})

