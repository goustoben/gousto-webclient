import React from 'react'
import { shallow } from 'enzyme'

import Immutable from 'immutable'
import { Header } from 'Header/Header'
import { AbandonBasketModal } from 'AbandonBasketModal'
import MobileMenu from 'Header/MobileMenu'
import Link from 'Link'
import CancelOrderModal from 'CancelOrderModal'
import ExpiredBillingModal from 'ExpiredBillingModal'
import DuplicateOrderModal from 'DuplicateOrderModal'
import CookieBanner from 'CookieBanner'
import contactConfig from 'config/company'

jest.mock('Header/SimpleHeader', () => 'SimpleHeader')
jest.mock('Modal/ModalPanel', () => 'ModalPanel')
jest.mock('Overlay', () => 'Overlay')
jest.mock('Login', () => 'Login')
jest.mock('PromoModal', () => 'PromoModal')
jest.mock('DuplicateOrderModal', () => 'DuplicateOrderModal')
jest.mock('CancelOrderModal', () => 'CancelOrderModal')
jest.mock('ExpiredBillingModal', () => 'ExpiredBillingModal')
jest.mock('routes/Account/Account', () => 'Account')
jest.mock('routes/Account/Subscription/SubscriptionPause', () => 'SubscriptionPause')
jest.mock('routes/Account/MyDeliveries/OrdersList/OnScreenRecovery', () => 'OnScreenRecovery')

describe('Header', () => {
  const config = {
    routes: {
      client: {
        blog: '/MOCK-blog',
        boxPrices: '/MOCK-box-prices',

        checkout: '/MOCK-checkout',
        contact: '/MOCK-contact',
        cookbook: '/MOCK-cookbook',

        help: '/MOCK-help',

        home: '/MOCK-',
        home2: '/MOCK-home',

        jobs: '/MOCK-jobs',
        join: '/MOCK-join',

        login: '/MOCK-login',
        logout: '/MOCK-logout',
        menu: '/MOCK-menu',

        myGousto: '/MOCK-my-gousto',

        nwr: '/MOCK-next-weeks-recipes',

        ourSuppliers: '/MOCK-our-suppliers',

        privacyPolicy: '/MOCK-privacy-statement',

        resetForm: '/MOCK-resetform',

        welcome: '/MOCK-welcome-to-gousto-2',
        termsAndConditions: '/MOCK-terms-and-conditions',
        termsOfUse: '/MOCK-terms-of-use',
        twr: '/MOCK-this-weeks-recipes',

        weCare: '/MOCK-we-care',

        referFriend: '/MOCK-my-referrals',
        rateMyRecipes: '/MOCK-rate-my-recipes',
      },
    },

    company: {
      telephone: {
        number: 'MOCK-123456677889',
      },
    },
  }

  describe('render components inside Header', () => {

    let wrapper
    let store
    beforeEach(() => {
      store = {
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
      wrapper = shallow(
        <Header loadUserOrders={() => {}} />, { context: { store } }
      )
    })

    test('should return a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render one <CookieBanner />', () => {
      wrapper = shallow(<Header />, { context: { store } })
      expect(wrapper.find(CookieBanner).length).toBe(1)
    })

    test('should render one <AbandonBasketModal /> if feature flag is set to true and isNotFirstLoadOfSession is not set to true', () => {
      if (window.sessionStorage.getItem('isNotFirstLoadOfSession')) {
        window.sessionStorage.removeItem('isNotFirstLoadOfSession')
      }
      wrapper.setProps({ abandonBasketFeature: true })
      expect(wrapper.find(AbandonBasketModal).length).toBe(1)
    })

    test('should not render <AbandonBasketModal /> if feature flag is set to false', () => {
      wrapper.setProps({ abandonBasketFeature: false })
      expect(wrapper.find(AbandonBasketModal).length).toBe(0)
    })

    test('should render one <MobileMenu />', () => {
      expect(wrapper.find(MobileMenu).length).toBe(1)
    })

    test('should render 6 <Link />', () => {
      expect(wrapper.find(Link).length).toEqual(5)
    })

    test('should render 5 <Link /> if existing menu path is passed as prop', () => {
      wrapper.setProps({ path: 'box-prices' })
      expect(wrapper.find(Link).length).toEqual(4)
    })

    test('should alter homepage link when promocode is provided', () => {
      const promoCode = 'test'
      wrapper.setProps({ promoCodeUrl: promoCode })
      expect(wrapper.find(Link).at(0).props().to).toEqual(`/${promoCode}`)
    })

    test('should alter homepage link to /menu when path contains "check-out"', () => {
      wrapper.setProps({ path: 'check-out' })
      expect(wrapper.find(Link).at(0).prop('to')).toEqual('/menu')
    })

    test('should not render a <MobileMenu /> when displaying the simple header', () => {
      wrapper.setProps({ simple: true })
      expect(wrapper.find(MobileMenu).length).toEqual(0)
    })

    test('should render the JS enabled MobileMenu toggle by default', () => {
      expect(wrapper.find('span').at(0).prop('id')).toEqual(null)
    })

    test('should render the fallback MobileMenu toggle if the serverError prop is true', () => {
      wrapper.setProps({ serverError: true })
      expect(wrapper.find('span').at(0).prop('id')).toEqual('mobileMenu')
    })

    test('should render referFriend in the menu if authenticated', () => {
      wrapper.setProps({ isAuthenticated: true })
      expect(wrapper.find(Link).at(2).childAt(0)
        .text()).toEqual('Free Food')
    })

    test('should render boxPrices in the menu if not authenticated', () => {
      wrapper.setProps({ isAuthenticated: false })
      expect(wrapper.find(Link).at(1).childAt(0)
        .text()).toEqual('Box Prices')
    })

    test('should render a PromoModal component', () => {
      wrapper = shallow(<Header {...store} />)
      expect(wrapper.find('PromoModal').length).toEqual(1)
    })

    test('should render a CancelOrderModal component', () => {
      expect(wrapper.find(CancelOrderModal).length).toEqual(1)
    })

    test('should render a ExpiredBillingModal component', () => {
      expect(wrapper.find(ExpiredBillingModal).length).toEqual(1)
    })

    test('should render a DuplicateOrderModal component', () => {
      wrapper.setProps({ trackNavigationClick: jest.fn() })
      expect(wrapper.find(DuplicateOrderModal).length).toEqual(1)
    })

    test('should render a SubscriptionPause component', () => {
      wrapper.setProps({ trackNavigationClick: jest.fn() })
      expect(wrapper.find('SubscriptionPause').length).toEqual(1)
    })

    test('should not render the phone number if the noContactBar prop is set', () => {
      wrapper.setProps({
        noContactBar: true,
        trackNavigationClick: jest.fn()
      })
      expect(wrapper.find('Free delivery').length).toEqual(0)
    })

    test('should render the contact phone number', () => {
      expect(wrapper.find('.contactContent').html()).toContain(
        contactConfig.telephone.number
      )
    })
  })

  describe('render MobileMenu with the right paths when authenticated', () => {
    const wrapper = shallow(
      <Header
        isAuthenticated
        config={config}
        trackNavigationClick={jest.fn()}
        loadUserOrders={() => {}}
      />
    )
    test('should render menu items in correct order when logged in', () => {
      const expected = [
        {
          "clientRouted": false,
          "name": 'My Gousto',
          "url": "/my-gousto",
          "tracking": "MyGoustoNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": 'Deliveries',
          "url": "/my-deliveries",
          "tracking": "DeliveriesNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": 'Subscription',
          "url": "/my-subscription",
          "tracking": "SubscriptionNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": 'Details',
          "url": "/my-details",
          "tracking": "DetailsNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Free Food",
          "url": "/my-referrals",
          "tracking": "ReferAFriendNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Rate My Recipes",
          "url": "/rate-my-recipes",
          "tracking": "RateMyRecipesNavigation Clicked",
        },
        {
          "clientRouted": true,
          "disabled": true,
          "name": "Home",
          "url": "/"
        },
        {
          "name": "Choose Recipes",
          "url": "/menu",
          "tracking": "RecipeNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Sustainability",
          "url": "/blog/sustainability",
          "tracking": "SustainabilityNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Help",
          "url": "/help",
          "tracking": "FAQNavigation Clicked",
        }
      ]
      expect(wrapper.find('MobileMenu').prop('menuItems')).toEqual(expected)
    })
  })

  describe('render MobileMenu with the right paths when not authenticated', () => {
    let wrapper
    const isAuthenticated = false

    beforeEach(() => {
      wrapper = shallow(
        <Header
          isAuthenticated={isAuthenticated}
          config={config}
          loadUserOrders={() => {}}
        />
      )
    })

    test('should render menu items in correct order when logged out', () => {
      const expected = [
        {
          "clientRouted": true,
          "disabled": true,
          "name": "Home",
          "url": "/",
        },
        {
          "clientRouted": true,
          "name": "Box Prices",
          "url": "/box-prices",
          "tracking": "BoxPricingNavigation Clicked",
        },
        {
          "name": "Choose Recipes",
          "url": "/menu",
          "tracking": "RecipeNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Sustainability",
          "url": "/blog/sustainability",
          "tracking": "SustainabilityNavigation Clicked",
        },
        {
          "clientRouted": false,
          "name": "Help",
          "url": "/help",
          "tracking": "FAQNavigation Clicked",
        }
      ]
      expect(wrapper.find('MobileMenu').prop('menuItems')).toEqual(expected)
    })
  })

  describe('forceSignupWizard feature', () => {
    test('render menu with "choose recipes" going to MENU when forceSignupWizard feature is set to false', () => {
      const isAuthenticated = false
      const wrapper = shallow(
        <Header
          isAuthenticated={isAuthenticated}
          config={config}
          forceSignupWizardFeature={false}
          loadUserOrders={() => {}}
        />
      )
      const chooseRecipes = {
        "name": "Choose Recipes",
        "url": "/menu",
        "tracking": "RecipeNavigation Clicked",
      }
      expect(wrapper.find('MobileMenu').prop('menuItems')).toContainEqual(chooseRecipes)
    })

    test('render menu with "choose recipes" going to MENU when forceSignupWizard feature is set to true and is authenticated', () => {
      const wrapper = shallow(
        <Header
          isAuthenticated
          config={config}
          forceSignupWizardFeature
          loadUserOrders={() => {}}
        />
      )
      const chooseRecipes = {
        "name": "Choose Recipes",
        "url": "/menu",
        "tracking": "RecipeNavigation Clicked",
      }
      expect(wrapper.find('MobileMenu').prop('menuItems')).toContainEqual(chooseRecipes)
    })

    test('render menu with "choose recipes" going to SIGNUP WIZARD when forceSignupWizard feature is set to true and authenticated', () => {
      const isAuthenticated = false
      const wrapper = shallow(
        <Header
          isAuthenticated={isAuthenticated}
          config={config}
          forceSignupWizardFeature
          loadUserOrders={() => {}}
        />
      )
      const chooseRecipes = {
        "name": "Choose Recipes",
        "url": "/signup",
        "tracking": "RecipeNavigation Clicked",
      }
      expect(wrapper.find('MobileMenu').prop('menuItems')).toContainEqual(chooseRecipes)
    })
  })

  describe('loading user orders', () => {
    const loadUserOrdersMock = jest.fn()

    afterEach(() => {
      loadUserOrdersMock.mockReset()
    })

    describe('when shouldLoadOrders is true', () => {
      beforeEach(() => {
        shallow(
          <Header
            loadUserOrders={loadUserOrdersMock}
            shouldLoadOrders
          />
        )
      })

      test('calls the userLoadOrders function', () => {
        expect(loadUserOrdersMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('when shouldLoadOrders is false', () => {
      beforeEach(() => {
        shallow(
          <Header
            loadUserOrders={loadUserOrdersMock}
            shouldLoadOrders={false}
          />
        )
      })

      test('does not call the userLoadOrders function', () => {
        expect(loadUserOrdersMock).not.toHaveBeenCalled()
      })
    })
  })
})

