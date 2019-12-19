import React from 'react'
import { shallow } from 'enzyme'

import Immutable from 'immutable'
import { Header } from 'Header/Header'
import routesConfig from 'config/routes'

describe('Header', () => {
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
    loginVisibility: '',
    features: Immutable.fromJS({}),
    persist: Immutable.fromJS({
      simpleHeader: false,
    })
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Header />, { context: { store } })
  })

  test('renders the <CookieBanner />', () => {
    expect(wrapper.find('Connect(CookieBanner)').exists()).toBe(true)
  })

  test('should render one <MobileMenu />', () => {
    expect(wrapper.find('MobileMenu').exists()).toBe(true)
  })

  test('renders 5 <GoustoLink />s', () => {
    expect(wrapper.find('GoustoLink').length).toEqual(5)
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

  test('opens the Help link into a new tab', () => {
    const helpLink = wrapper.findWhere(n => n.prop('to') === routesConfig.zendesk.faqs)

    expect(helpLink.prop('target')).toBe('_blank')
  })

  test('does not open other links in a new tab', () => {
    const linksWithNewTab = wrapper.findWhere(n => n.prop('target') === '_blank')

    expect(linksWithNewTab).toHaveLength(1)
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

    test('renders 4 <GoustoLink />s', () => {
      expect(wrapper.find('GoustoLink').length).toEqual(4)
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
      wrapper.setProps({ isAuthenticated: true })
    })

    test('renders referFriend', () => {
      expect(wrapper.find('GoustoLink').at(2).childAt(0).text()).toEqual('Free Food')
    })

    test('renders menu items in correct order', () => {
      const expected = [
        {
          "clientRouted": true,
          "name": 'My Gousto',
          "url": routesConfig.client.myGousto,
          "tracking": "MyGoustoNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": 'Deliveries',
          "url": routesConfig.client.myDeliveries,
          "tracking": "DeliveriesNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": 'Subscription',
          "url": routesConfig.client.mySubscription,
          "tracking": "SubscriptionNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": 'Details',
          "url": routesConfig.client.myDetails,
          "tracking": "DetailsNavigation Clicked",
        },
        {
          "clientRouted": true,
          "name": "Free Food",
          "url": routesConfig.client.myReferral,
          "tracking": "ReferAFriendNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Rate My Recipes",
          "url": routesConfig.client.rateMyRecipes,
          "tracking": "RateMyRecipesNavigation Clicked",
        },
        {
          "clientRouted": true,
          "disabled": true,
          "name": "Home",
          "url": routesConfig.client.home,
        },
        {
          "name": "Choose Recipes",
          "url": routesConfig.client.menu,
          "tracking": "RecipeNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Sustainability",
          "url": routesConfig.client.weCare,
          "tracking": "SustainabilityNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Help",
          "url": routesConfig.zendesk.faqs,
          "tracking": "FAQNavigation Clicked",
        }
      ]

      expect(wrapper.find('MobileMenu').prop('mobileMenuItems')).toEqual(expected)
    })
  })

  describe('when isAuthenticated prop is false', () => {
    beforeEach(() => {
      wrapper.setProps({ isAuthenticated: false })
    })

    test('renders boxPrices', () => {
      expect(wrapper.find('GoustoLink').at(1).childAt(0).text()).toEqual('Box Prices')
    })

    test('should render menu items in correct order when logged out', () => {
      const expected = [
        {
          "clientRouted": true,
          "disabled": true,
          "name": "Home",
          "url": routesConfig.client.home,
        },
        {
          "clientRouted": true,
          "name": "Box Prices",
          "url": routesConfig.client.boxPrices,
          "tracking": "BoxPricingNavigation Clicked",
        },
        {
          "name": "Choose Recipes",
          "url": routesConfig.client.menu,
          "tracking": "RecipeNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Sustainability",
          "url": routesConfig.client.weCare,
          "tracking": "SustainabilityNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Help",
          "url": routesConfig.zendesk.faqs,
          "tracking": "FAQNavigation Clicked",
        }
      ]
      expect(wrapper.find('MobileMenu').prop('mobileMenuItems')).toEqual(expected)
    })
  })
})

