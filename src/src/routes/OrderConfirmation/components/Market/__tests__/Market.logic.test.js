import React from 'react'
import { shallow } from 'enzyme'
import { Map } from 'immutable'
import { Market } from '../Market.logic'

describe('<Market />', () => {
  const DEFAULT_PROPS = {
    basket: Map(),
    filterProductCategory: jest.fn(),
    onSave: jest.fn(),
    products: {},
    productsCategories: Map(),
    selectedCategory: 'test-category',
    showOrderConfirmationReceipt: false,
    toggleAgeVerificationPopUp: jest.fn(),
  }

  const CATEGORIES = [
    { hidden: false, id: 'category-1', title: 'Category 1' },
    { hidden: false, id: 'category-2', title: 'Category 2' },
  ]

  const CATEGORY_ALL_PRODUCTS = {
    id: 'all-products',
    label: 'All Products',
  }

  const PRODUCTS = {
    1234: { id: '1234' },
    5678: { id: '5678' },
  }

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
        categories: wrapper.instance().getCategories(),
        filteredProducts: null,
        getFilteredProducts: wrapper.instance().getFilteredProducts,
        isOrderSummaryOpen: false,
        onOrderSave: wrapper.instance().onOrderSave,
        products: DEFAULT_PROPS.products,
        productsCategories: DEFAULT_PROPS.productsCategories,
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

  describe('getCategories', () => {
    const CATEGORIES_HIDDEN = [
      { hidden: true, id: 'category-3', title: 'Category 3' },
    ]

    const PRODUCTS_WITH_HIDDEN_CATEGORIES = {
      8123: { categories: [...CATEGORIES_HIDDEN, ...CATEGORIES] },
      9123: { categories: [...CATEGORIES_HIDDEN, ...CATEGORIES] },
    }

    const CATEGORY_ALL_PRODUCTS_WITH_COUNT = { ...CATEGORY_ALL_PRODUCTS, count: 2 }

    const EXPECTED_CATEGORIES = CATEGORIES.map(category => {
      return {
        id: category.id,
        label: category.title,
      }
    })
    const EXPECTED_RESULT = [CATEGORY_ALL_PRODUCTS_WITH_COUNT, ...EXPECTED_CATEGORIES]

    beforeEach(() => {
      wrapper.setProps({ ...DEFAULT_PROPS, products: PRODUCTS_WITH_CATEGORIES })
    })

    test('returns a unique list of categories', () => {
      expect(wrapper.instance().getCategories()).toEqual(EXPECTED_RESULT)
    })

    test('returns the count of products for all categories', () => {
      expect(wrapper.instance().getCategories()[0].count).toEqual(CATEGORY_ALL_PRODUCTS_WITH_COUNT.count)
    })

    describe('and there are no product categories', () => {
      beforeEach(() => {
        wrapper.setProps({ productsCategories: Map(), products: PRODUCTS })
      })

      test('returns "All Products"', () => {
        expect(wrapper.instance().getCategories()).toEqual([CATEGORY_ALL_PRODUCTS_WITH_COUNT])
      })
    })

    describe('and products contain hidden categories', () => {
      beforeEach(() => {
        wrapper.setProps({ products: PRODUCTS_WITH_HIDDEN_CATEGORIES })
      })

      test('does not return hidden categories', () => {
        expect(wrapper.instance().getCategories()).toEqual(EXPECTED_RESULT)
      })
    })
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

    describe('when products prop is undefined', () => {
      let filterProductCategoryMock

      beforeEach(() => {
        filterProductCategoryMock = jest.fn()
        wrapper.setProps({ products: undefined, filterProductCategory: filterProductCategoryMock })
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
