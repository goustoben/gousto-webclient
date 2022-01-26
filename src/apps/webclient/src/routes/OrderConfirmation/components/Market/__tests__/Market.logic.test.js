import React from 'react'
import { shallow } from 'enzyme'
import { Map } from 'immutable'
import { Market } from '../Market.logic'

describe('<Market />', () => {
  const DEFAULT_PROPS = {
    basket: Map(),
    categoriesForNavBar: {},
    filterProductCategory: jest.fn(),
    onSave: jest.fn(),
    products: {},
    productsCategories: Map(),
    productsLoadError: null,
    selectedCategory: 'test-category',
    showOrderConfirmationReceipt: false,
    toggleAgeVerificationPopUp: jest.fn(),
  }

  const CATEGORIES = [
    { hidden: false, id: 'category-1', title: 'Category 1' },
    { hidden: false, id: 'category-2', title: 'Category 2' },
  ]

  const PRODUCTS_WITH_CATEGORIES = {
    1234: { id: '1234', categories: CATEGORIES },
    5678: { id: '5678', categories: [CATEGORIES[0]] },
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Market {...DEFAULT_PROPS} />)
  })

  test('renders the Market presentation component with correct props', () => {
    expect(wrapper.find('MarketPresentation').props()).toEqual(
      {
        ageVerified: false,
        basket: DEFAULT_PROPS.basket,
        categoriesForNavBar: DEFAULT_PROPS.categoriesForNavBar,
        filteredProducts: null,
        getFilteredProducts: wrapper.instance().getFilteredProducts,
        isOrderSummaryOpen: false,
        onOrderSave: wrapper.instance().onOrderSave,
        products: DEFAULT_PROPS.products,
        productsCategories: DEFAULT_PROPS.productsCategories,
        productsLoadError: DEFAULT_PROPS.productsLoadError,
        saveError: false,
        saveRequired: false,
        saving: false,
        selectedCategory: DEFAULT_PROPS.selectedCategory,
        showOrderConfirmationReceipt: DEFAULT_PROPS.showOrderConfirmationReceipt,
        toggleAgeVerificationPopUp: DEFAULT_PROPS.toggleAgeVerificationPopUp,
        toggleOrderSummary: wrapper.instance().toggleOrderSummary,
      }
    )
  })

  describe('getFilteredProducts', () => {
    beforeEach(() => {
      wrapper.setProps({ products: PRODUCTS_WITH_CATEGORIES })
    })

    describe('when all products category is selected', () => {
      let filterProductCategoryMock

      beforeEach(() => {
        filterProductCategoryMock = jest.fn()
        wrapper.setProps({ filterProductCategory: filterProductCategoryMock })
        wrapper.instance().getFilteredProducts('all-products')
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      test('returns full list of products', () => {
        expect(wrapper.state('filteredProducts')).toEqual(PRODUCTS_WITH_CATEGORIES)
      })

      test('calls filterProductCategory with the right parameter', () => {
        expect(filterProductCategoryMock).toHaveBeenCalledWith('all-products')
      })
    })

    describe('when a certain category is selected', () => {
      let filterProductCategoryMock

      beforeEach(() => {
        filterProductCategoryMock = jest.fn()
        wrapper.setProps({ filterProductCategory: filterProductCategoryMock })
        wrapper.instance().getFilteredProducts('category-2')
      })

      test('sets the correct filtered products to state', () => {
        expect(wrapper.state('filteredProducts')).toEqual({ 1234: PRODUCTS_WITH_CATEGORIES[1234] })
      })
    })

    describe('when products prop is empty', () => {
      let filterProductCategoryMock

      beforeEach(() => {
        filterProductCategoryMock = jest.fn()
        wrapper.setProps({ products: {}, filterProductCategory: filterProductCategoryMock })
        wrapper.instance().getFilteredProducts('category-1')
      })

      test('does not update state', () => {
        expect(wrapper.state('filteredProducts')).toEqual(null)
      })
    })

    describe('when product categories prop is undefined', () => {
      let filterProductCategoryMock

      beforeEach(() => {
        filterProductCategoryMock = jest.fn()
        wrapper.setProps({ filterProductCategory: filterProductCategoryMock })
        wrapper.instance().getFilteredProducts('category-X')
      })

      test('does not update state', () => {
        expect(wrapper.state('filteredProducts')).toEqual(null)
      })
    })
  })

  describe('rendering popup for OrderSummary', () => {
    test('should toggle order summary popup', () => {
      wrapper.setState({ isOrderSummaryOpen: false })
      wrapper.instance().toggleOrderSummary()
      expect(wrapper.find('MarketPresentation').prop('isOrderSummaryOpen')).toBe(true)
    })
  })
})
