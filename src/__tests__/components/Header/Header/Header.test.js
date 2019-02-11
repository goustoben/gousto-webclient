import React from 'react'
import { shallow, mount } from 'enzyme'

import Immutable from 'immutable'
import Header from 'components/Header/Header'
import MobileMenu from 'Header/MobileMenu'
import Link from 'Link'
import CancelOrderModal from 'CancelOrderModal'
import ExpiredBillingModal from 'ExpiredBillingModal'
import DuplicateOrderModal from 'DuplicateOrderModal'

jest.mock('Header/SimpleHeader', () => 'SimpleHeader')
jest.mock('Modal/ModalPanel', () => 'ModalPanel')
jest.mock('Overlay', () => 'Overlay')
jest.mock('Login', () => 'Login')
jest.mock('components/PromoModal',() => 'PromoModal')
jest.mock('components/DuplicateOrderModal', () => 'DuplicateOrderModal')
jest.mock('components/CancelOrderModal', () => 'CancelOrderModal')
jest.mock('components/ExpiredBillingModal', () => 'ExpiredBillingModal')    
jest.mock('routes/Account/Account', () =>'Account')
jest.mock('routes/Account/Subscription/SubscriptionPause', () =>'SubscriptionPause')
jest.mock('routes/Account/MyDeliveries/OrdersList/OrderSkipRecovery', () => 'OrderSkipRecovery')

describe('Header', () => {
  const config= {
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
      wrapper = shallow(<Header />, {context: {store}})
    })
    
    test('should return a <span>', () => {
    
      expect(wrapper.type()).toEqual('span')
    })
    
    test('should render one <MobileMenu />', () => {
      expect(wrapper.find(MobileMenu).length).toBe(1)
    })
    
    test('should render 5 <Link />', () => {
      expect(wrapper.find(Link).length).toEqual(4)
    })
    
    test('should render 4 <Link /> if existing menu path is passed as prop', () => {
      const wrapper = shallow(<Header path="box-prices" />, {context: {store}})
    
      expect(wrapper.find(Link).length).toEqual(3)
    })
    
    test('should alter homepage link when promocode is provided', () => {
      const promoCode = 'test'
      const wrapper = shallow(<Header promoCodeUrl={promoCode} />)
    
      expect(wrapper.find(Link).at(0).props().to).toEqual(`/${promoCode}`)
    })
    
    test('should alter homepage link to /menu when path contains "check-out"', () => {
      const wrapper = shallow(<Header path="check-out" />)
    
      expect(wrapper.find(Link).at(0).prop('to')).toEqual('/menu')
    })
    
    test('should not render a <MobileMenu /> when displaying the simple header', () => {
      const simple = true
      const wrapper = shallow(<Header simple={simple} />)
      expect(wrapper.find(MobileMenu).length).toEqual(0)
    })
    
    test('should render the JS enabled MobileMenu toggle by default', () => {
      const wrapper = shallow(<Header />)
      expect(wrapper.find('span').at(0).prop('id')).toEqual(null)
    })
    
    test('should render the fallback MobileMenu toggle if the serverError prop is true', () => {
      const wrapper = shallow(<Header serverError />)
      expect(wrapper.find('span').at(0).prop('id')).toEqual('mobileMenu')
    })
    
    test('should render referFriend in the menu if authenticated', () => {
      const isAuthenticated = true
      const wrapper = shallow(<Header isAuthenticated={isAuthenticated} />)
      expect(wrapper.find(Link).at(1).childAt(0)
        .text()).toEqual('Free Food')
    })
    
    test('should render boxPrices in the menu if not authenticated', () => {
      const isAuthenticated = false
      const wrapper = shallow(<Header isAuthenticated={isAuthenticated} />)
      expect(wrapper.find(Link).at(1).childAt(0)
        .text()).toEqual('Box Prices')
    })
    
    test('should render a PromoModal component', () => {
      const wrapper = shallow(<Header {...store}/>)
      expect(wrapper.find('PromoModal').length).toEqual(1)
    })
    
    test('should render a CancelOrderModal component', () => {
      const wrapper = shallow(<Header />)
      expect(wrapper.find(CancelOrderModal).length).toEqual(1)
    })
    
    test('should render a ExpiredBillingModal component', () => {
      const wrapper = shallow(<Header />)
      expect(wrapper.find(ExpiredBillingModal).length).toEqual(1)
    })
    
    test('should render a DuplicateOrderModal component', () => {
      const wrapper = shallow(<Header />)
      expect(wrapper.find(DuplicateOrderModal).length).toEqual(1)
    })
    
    test('should render a SubscriptionPause component', () => {
      const wrapper = shallow(<Header />)
      expect(wrapper.find('SubscriptionPause').length).toEqual(1)
    })
    
    test('should not render the phone number if the noContactBar prop is set', () => {
    
      const wrapper = shallow(<Header noContactBar />)
      expect(wrapper.find('Free delivery').length).toEqual(0)
    })
  })

  //TODO: fix this
  describe.skip('using mount', () => {
    test('should include the phone number', () => {
      const props = {
        config,
        logoutUser: jest.fn(),
        loginVisibilityChange: jest.fn(),
        closeBoxModalVisibilityChange: jest.fn(),
        noContactBar: true,
        serverError: false,
        isAuthenticated: true,
        loginOpen: false,
        routing: {},
        simple:false,
        path: '',
        fromJoin: false,
        promoCodeUrl: '',
        features: Immutable.fromJS({})
      }

      const wrapper2 = mount(<Header {...props} />)
      expect(wrapper2.debug()).toContain('MOCK-123456677889')
    })
  })

  describe('render MobileMenu with the right paths when authenticated', () => {
    const wrapper = shallow(<Header isAuthenticated config={config} />,)
    test('should render menu items in correct order when logged in', () => {
      const expected = [
        {
          "clientRouted": false,
          "name": 'My Gousto',
          "url": "/my-gousto"
        },
        {
          "clientRouted": false,
          "name": 'Deliveries',
          "url": "/my-deliveries"
        },
        {
          "clientRouted": false,
          "name": 'Subscription',
          "url": "/my-subscription"
        },
        {
          "clientRouted": false,
          "name": 'Details',
          "url": "/my-details"
        },
        {
          "clientRouted": false,
          "name": "Free Food",
          "url": "/my-referrals"
        },
        {
          "clientRouted": false,
          "name": "Rate My Recipes",
          "url": "/rate-my-recipes"
        }, 
        {
          "clientRouted": true,
          "disabled": true,
          "name": "Home",
          "url": "/"
        },
        {
          "name": "Choose Recipes",
          "url": "/menu"
        }, 
        {
          "clientRouted": false, 
          "name": "Help", 
          "url": "/help"
        }
      ]
      expect(wrapper.find('MobileMenu').prop('menuItems')).toEqual(expected)  
    })
  })

  describe('render MobileMenu with the right paths when not authenticated', () => {
    const isAuthenticated = false 
    const wrapper = shallow(<Header isAuthenticated={isAuthenticated} config={config} />,)
    test('should render menu items in correct order when logged out', () => {
      const expected = [
        {
          "clientRouted": true,
          "disabled": true,
          "name": "Home",
          "url": "/"
        },
        {
          "clientRouted": true,
          "name": "Box Prices",
          "url": "/box-prices"
        },
        { 
          "name": "Choose Recipes",
          "url": "/menu"
        }, 
        {
          "clientRouted": false, 
          "name": "Help", 
          "url": "/help"
        }
      ]
      expect(wrapper.find('MobileMenu').prop('menuItems')).toEqual(expected)  
    })
  })
})

