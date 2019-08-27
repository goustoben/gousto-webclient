import React from 'react'
import { shallow } from 'enzyme'
import { Map } from 'immutable'
import { MarketPresentation } from '../Market.presentation'

describe('<MarketPresentation />', () => {
  const DEFAULT_PROPS = {
    basket: Map(),
    categories: [],
    getFilteredProducts: jest.fn(),
    onOrderSave: jest.fn(),
    products: {},
    productsCategories: Map(),
    productsLoadError: null,
    selectedCategory: '',
    showOrderConfirmationReceipt: false,
    toggleAgeVerificationPopUp: jest.fn(),
    toggleOrderSummary: jest.fn(),
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<MarketPresentation {...DEFAULT_PROPS} />)
  })

  describe('when products load successfully', () => {
    test('does not render the alert component', () => {
      expect(wrapper.exists('Alert')).toBe(false)
    })

    test('renders the market place content section', () => {
      expect(wrapper.find('.marketPlaceContent').exists()).toBe(true)
    })

    test('renders the product list', () => {
      expect(wrapper.find('ProductList').exists()).toBe(true)
    })

    test('renders the navbar', () => {
      expect(wrapper.find('Navbar').exists()).toBe(true)
    })

    test('renders the dropdown', () => {
      expect(wrapper.find('Dropdown').exists()).toBe(true)
    })

    describe('when showOrderConfirmationReceipt is true', () => {
      beforeEach(() => {
        wrapper.setProps({ showOrderConfirmationReceipt: true })
      })

      test('renders OrderSummary component', () => {
        expect(wrapper.find('.orderDetails Connect(OrderSummary)').exists()).toBe(true)
      })

      test('renders ReferAFriend component', () => {
        expect(wrapper.find('.orderDetails Connect(ReferAFriend)').exists()).toBe(true)
      })
    })

    describe('when showOrderConfirmationReceipt is false', () => {
      beforeEach(() => {
        wrapper.setProps({ showOrderConfirmationReceipt: false })
      })

      test('does not render OrderSummary component', () => {
        expect(wrapper.find('.orderDetails Connect(OrderSummary)').exists()).toBe(false)
      })

      test('does not render ReferAFriend component', () => {
        expect(wrapper.find('.orderDetails Connect(ReferAFriend)').exists()).toBe(false)
      })
    })
  })

  describe('when products fail to load', () => {
    beforeEach(() => {
      wrapper.setProps({ productsLoadError: 'Failed to fetch products' })
    })

    test('renders an alert component', () => {
      expect(wrapper.find('Alert')).toHaveLength(1)
    })

    test('does not render the products list component', () => {
      expect(wrapper.exists('ProductsList')).toBe(false)
    })

    test('does not render the products nav bar', () => {
      expect(wrapper.exists('.navbar')).toBe(false)
    })

    test('does not render the products nav bar', () => {
      expect(wrapper.exists('.dropdown')).toBe(false)
    })
  })
})
