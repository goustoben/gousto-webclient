import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import OrderConfirmation from '../OrderConfirmation'

describe('OrderConfirmation', () => {
  const DEFAULT_HEADER_DETAILS = {
    deliveryDate: 'Tuesday 26th March',
    deliveryStart: '8 am',
    deliveryEnd: '7 pm',
    whenCutoffTime: '12 pm',
    whenCutoffDate: 'Wednesday 20th March',
  }

  const DEFAULT_PROPS = {
    headerDetails: DEFAULT_HEADER_DETAILS,
    showHeader: false,
    products: {},
    isLoading: false,
    userFetchReferralOffer: jest.fn(),
    filterProductCategory: () => { },
    showOrderConfirmationReceipt: false,
    ageVerified: false,
    selectedCategory: 'all-products',
    basket: Immutable.fromJS({}),
    productsCategories: Immutable.fromJS({}),
  }

  const CATEGORY_ALL_PRODUCTS = {
    id: 'all-products',
    label: 'All Products',
  }

  const CATEGORIES = [
    { hidden: false, id: 'category-1', title: 'Category 1' },
    { hidden: false, id: 'category-2', title: 'Category 2' },
  ]

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
    wrapper = shallow(<OrderConfirmation {...DEFAULT_PROPS} />)
  })

  describe('rendering the right components', () => {
    test('renders the marketPlace title', () => {
      expect(wrapper.find('.marketPlaceTitle').exists()).toBe(true)
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

  })

  describe('when page is loading', () => {
    beforeEach(() => {
      wrapper.setProps({ ...DEFAULT_PROPS, isLoading: true })
    })

    test('shows the loading spinner', () => {
      expect(wrapper.find('Loading').exists()).toBe(true)
    })
  })

  describe('when showHeader is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ ...DEFAULT_PROPS, showHeader: false })
    })

    test('does not show the Order Confirmation Header', () => {
      expect(wrapper.find('OrderConfirmationHeader').exists()).toBe(false)
    })
  })

  describe('when showHeader is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ ...DEFAULT_PROPS, showHeader: true })
    })

    test('shows the Order Confirmation Header', () => {
      expect(wrapper.find('OrderConfirmationHeader').exists()).toBe(true)
    })

    test('should send the right props to Order Confirmation Header', () => {
      Object.keys(DEFAULT_HEADER_DETAILS).forEach(key => {
        expect(wrapper.find('OrderConfirmationHeader').prop(key)).toBe(DEFAULT_HEADER_DETAILS[key])
      })
    })
  })

  describe('getCategories', () => {
    describe('when products is undefined', () => {
      beforeEach(() => {
        wrapper.setProps({ ...DEFAULT_PROPS, products: undefined })
      })

      test('returns "All Products" if products is undefined', () => {
        expect(wrapper.instance().getCategories()).toEqual([CATEGORY_ALL_PRODUCTS])
      })

      test('does not set the count of products for "All Products"', () => {
        expect(wrapper.instance().getCategories()[0].count).toBe(undefined)
      })
    })

    describe('when products is defined', () => {
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

      describe('and product categories is undefined', () => {
        beforeEach(() => {
          wrapper.setProps({ productsCategories: undefined, products: PRODUCTS })
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

  describe('Age verification', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('when "showAgeVerification" is true', () => {
      beforeEach(() => {
        wrapper.setState({ 'showAgeVerification': true })
      })

      test('renders the AgeVerificationPopUp', () => {
        expect(wrapper.find('AgeVerificationPopUp').exists()).toBe(true)
      })

      test('renders the popup overlay as open', () => {
        expect(wrapper.find('Overlay').at(0).prop('open')).toBe(true)
      })
    })

    describe('when "showAgeVerification" is false', () => {
      beforeEach(() => {
        wrapper.setState({ 'showAgeVerification': false })
      })

      test('renders the AgeVerificationPopUp', () => {
        expect(wrapper.find('AgeVerificationPopUp').exists()).toBe(true)
      })

      test('renders the popup overlay as closed', () => {
        expect(wrapper.find('Overlay').at(0).prop('open')).toBe(false)
      })
    })

    describe('on age confirmation', () => {
      test('has "hasConfirmedAge" set to false by default', () => {
        expect(wrapper.state('hasConfirmedAge')).toEqual(false)
      })
    })

    describe('on age confirmation', () => {
      const userVerifyAgeSpy = jest.fn()

      beforeEach(() => {
        wrapper.setProps({ userVerifyAge: userVerifyAgeSpy })
      })

      describe('when user has not confirmed their age', () => {
        test('has "hasConfirmedAge" state set to false', () => {
          expect(wrapper.state('hasConfirmedAge')).toEqual(false)
        })

        test('does not call "userVerifyAge"', () => {
          expect(userVerifyAgeSpy).not.toHaveBeenCalled()
        })
      })

      describe('when user has confirmed their age', () => {
        beforeEach(() => {
          wrapper.instance().onAgeConfirmation(true)
        })

        test('sets "hasConfirmedAge" state to true', () => {
          expect(wrapper.state('hasConfirmedAge')).toEqual(true)
        })

        test('calls "userVerifyAge" with correct parameter', () => {
          expect(userVerifyAgeSpy).toHaveBeenCalledWith(true, true)
        })
      })
    })
  })

  describe('rendering popup for OrderSummary', () => {
    beforeEach(() => {
      wrapper.setState({ isOrderSummaryOpen: true })
    })

    test('toggles order summary popup', () => {
      expect(wrapper.find('Overlay').at(1).prop('open')).toEqual(true)
      expect(wrapper.find('Connect(OrderSummary)').exists()).toBe(true)
    })
  })

  describe('Refer a Friend', () => {
    let userFetchReferralOfferMock

    beforeEach(() => {
      userFetchReferralOfferMock = jest.fn()
      wrapper.setProps({ userFetchReferralOffer: userFetchReferralOfferMock })
      wrapper.instance().componentDidMount()
    })

    test('fetches referral offer details in componentDidMount', () => {
      expect(userFetchReferralOfferMock).toHaveBeenCalled()
    })

    test('renders ReferAFriend component', () => {
      expect(wrapper.find('Connect(ReferAFriend)').exists()).toBe(true)
    })
  })
})
