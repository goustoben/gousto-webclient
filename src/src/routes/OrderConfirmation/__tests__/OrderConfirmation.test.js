import React from 'react'
import { shallow } from 'enzyme'
import OrderConfirmation from '../OrderConfirmation'

describe('OrderConfirmation', () => {
  const testProps = {
    headerDetails: {
      deliveryDate: 'Tuesday 26th March',
      deliveryStart: '8 am',
      deliveryEnd: '7 pm',
      whenCutoffTime: '12 pm',
      whenCutoffDate: 'Wednesday 20th March',
    },
    showHeader: false,
    products: {},
    isLoading: false,
  }

  describe('Order Confirmation loading spinner', () => {
    test('should show loading spinner while page is loading', () => {
      const wrapper = shallow(<OrderConfirmation {...testProps} isLoading />)
      expect(wrapper.find('Loading').length).toEqual(1)
    })
  })

  describe('Order Confirmation not rendering header', () => {
    test('should not show Order Confirmation Header', () => {
      const wrapper = shallow(<OrderConfirmation {...testProps} />)
      expect(wrapper.find('OrderConfirmationHeader').length).toBe(0)
    })
  })

  describe('Order Confirmation rendering header', () => {
    const testPropsTrue = { ...testProps, showHeader: true }
    const wrapper = shallow(<OrderConfirmation {...testPropsTrue} />)

    test('should show Order Confirmation Header', () => {
      expect(wrapper.find('OrderConfirmationHeader').length).toBe(1)
    })

    test('should send the right props to Order Confirmation Header', () => {
      const headerTestProps = {
        deliveryDate: 'Tuesday 26th March',
        deliveryStart: '8 am',
        deliveryEnd: '7 pm',
        whenCutoffTime: '12 pm',
        whenCutoffDate: 'Wednesday 20th March',
      }
      expect(wrapper.find('OrderConfirmationHeader').prop('deliveryDate')).toBe(headerTestProps.deliveryDate)
      expect(wrapper.find('OrderConfirmationHeader').prop('deliveryStart')).toBe(headerTestProps.deliveryStart)
      expect(wrapper.find('OrderConfirmationHeader').prop('deliveryEnd')).toBe(headerTestProps.deliveryEnd)
      expect(wrapper.find('OrderConfirmationHeader').prop('whenCutoffTime')).toBe(headerTestProps.whenCutoffTime)
      expect(wrapper.find('OrderConfirmationHeader').prop('whenCutoffDate')).toBe(headerTestProps.whenCutoffDate)
    })
  })

  describe('Order Confirmation MarketPlace', () => {
    const wrapper = shallow(<OrderConfirmation {...testProps} />)
    test('should render marketPlace title', () => {
      expect(wrapper.find('.marketPlaceTitle').length).toEqual(1)
    })

    test('should render market place content section', () => {
      expect(wrapper.find('.marketPlaceContent').length).toEqual(1)
    })

    test('should render product list', () => {
      expect(wrapper.find('ProductList').length).toEqual(1)
    })

    test('should render the navbar', () => {
      expect(wrapper.find('Navbar').length).toEqual(1)
    })

    test('should render the dropdown', () => {
      expect(wrapper.find('Dropdown').length).toEqual(1)
    })
  })

  describe('get categories', () => {

    test('should return a unique list of categories', () => {
      const products = {
        1234: {
          categories: [{ hidden: false, id: 'category-1', title: 'Category 1' }, { hidden: false, id: 'category-2', title: 'Category 2' }]
        },
        5678: {
          categories: [{ hidden: false, id: 'category-1', title: 'Category 1' }, { hidden: false, id: 'category-2', title: 'Category 2' }]
        }
      }
      const expectedResult = [{ id: 'all-products', label: 'All Products' }, { id: 'category-1', label: 'Category 1' }, { id: 'category-2', label: 'Category 2' }]
      const wrapper = shallow(<OrderConfirmation {...testProps} products={products} />)
      expect(wrapper.instance().getCategories()).toEqual(expectedResult)
    })

    test('should return "All Products" if products is undefined', () => {
      const expectedResult = [{ id: 'all-products', label: 'All Products' }]
      const wrapper = shallow(<OrderConfirmation {...testProps} products={undefined} />)
      expect(wrapper.instance().getCategories()).toEqual(expectedResult)
    })

    test('should return "All Products" if product categories is undefined', () => {
      const products = {
        1234: {},
        5678: {}
      }
      const expectedResult = [{ id: 'all-products', label: 'All Products' }]
      const wrapper = shallow(<OrderConfirmation {...testProps} products={products} />)
      expect(wrapper.instance().getCategories()).toEqual(expectedResult)
    })

    test('should not return hidden categories', () => {
      const products = {
        1234: {
          categories: [{ hidden: true, id: 'category-1', title: 'Category 1' }, { hidden: false, id: 'category-2', title: 'Category 2' }]
        }
      }
      const expectedResult = [{ id: 'all-products', label: 'All Products' }, { id: 'category-2', label: 'Category 2' }]
      const wrapper = shallow(<OrderConfirmation {...testProps} products={products} />)
      expect(wrapper.instance().getCategories()).toEqual(expectedResult)
    })
  })

  describe('get filtered products', () => {
    let products
    let filterProductCategoryMock
    let wrapper

    beforeEach(() => {
      products = {
        1234: {
          id: '1234', categories: [{ id: 'category-1', title: 'Category 1' }]
        },
        5678: {
          id: '5678', categories: [{ id: 'category-2', title: 'Category 2' }]
        }
      }

      filterProductCategoryMock = jest.fn()
      wrapper = shallow(<OrderConfirmation products={products} filterProductCategory={filterProductCategoryMock} />)

    })

    test('should set correct filtered products to state', () => {
      const expectedResult = {
        1234: {
          id: '1234', categories: [{ id: 'category-1', title: 'Category 1' }]
        }
      }

      wrapper.instance().getFilteredProducts('category-1')

      expect(wrapper.state('filteredProducts')).toEqual(expectedResult)
    })

    test('should return full list of products if chosen category is All Products', () => {
      const expectedResult = {
        1234: {
          id: '1234', categories: [{ id: 'category-1', title: 'Category 1' }]
        },
        5678: {
          id: '5678', categories: [{ id: 'category-2', title: 'Category 2' }]
        }
      }

      wrapper.instance().getFilteredProducts('all-products')

      expect(wrapper.state('filteredProducts')).toEqual(expectedResult)
    })

    test('should call filterProductCategory with the right parameter', () => {
      wrapper.instance().getFilteredProducts('all-products')

      expect(filterProductCategoryMock).toHaveBeenCalledWith('all-products')
    })

    test('should not update state if products is undefined', () => {
      wrapper = shallow(<OrderConfirmation filterProductCategory={filterProductCategoryMock} />)
      wrapper.instance().getFilteredProducts('category-1')

      expect(wrapper.state('filteredProducts')).toEqual(null)
    })

    test('should not update state if product categories are undefined', () => {
      products = {
        1234: {
          id: '1234'
        },
        5678: {
          id: '5678'
        }
      }

      wrapper = shallow(<OrderConfirmation filterProductCategory={filterProductCategoryMock} products={products} />)
      wrapper.instance().getFilteredProducts('Category 1')

      expect(wrapper.state('filteredProducts')).toEqual(null)
    })
  })

  describe('Age verification', () => {
    const userVerifyAgeSpy = jest.fn()

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('rendering popup for AgeVerification', () => {
      test('should render the age verification pop up in an OPEN overlay when "showAgeVerification" is true', () => {
        const wrapper = shallow(<OrderConfirmation />)
        wrapper.setState({ 'showAgeVerification': true })

        expect(wrapper.find('Overlay').at(0).prop('open')).toEqual(true)
        expect(wrapper.find('AgeVerificationPopUp').length).toEqual(1)
      })
      test('should render the age verification pop up in a CLOSED overlay when "showAgeVerification" is false', () => {
        const wrapper = shallow(<OrderConfirmation />)

        expect(wrapper.find('Overlay').at(0).prop('open')).toEqual(false)
        expect(wrapper.find('AgeVerificationPopUp').length).toEqual(1)
      })
    })

    describe('on age confirmation', () => {

      test('should set "hasConfirmedAge" state to true', () => {
        const isUser18 = false
        const wrapper = shallow(<OrderConfirmation userVerifyAge={userVerifyAgeSpy} />)

        expect(wrapper.state('hasConfirmedAge')).toEqual(false)
        wrapper.instance().onAgeConfirmation(isUser18)
        expect(wrapper.state('hasConfirmedAge')).toEqual(true)
      })

      test('should call "userVerifyAge" with correct parameter', () => {
        const isUser18 = true
        const wrapper = shallow(<OrderConfirmation userVerifyAge={userVerifyAgeSpy} />)
        wrapper.instance().onAgeConfirmation(isUser18)

        expect(userVerifyAgeSpy).toHaveBeenCalledWith(isUser18, true)
      })
    })
  })

  describe('rendering popup for OrderSummary', () => {
    test('should toggle order summary popup', () => {
      const wrapper = shallow(<OrderConfirmation />)
      wrapper.setState({ 'isOrderSummaryOpen': true })

      expect(wrapper.find('Overlay').at(1).prop('open')).toEqual(true)
      expect(wrapper.find('Connect(OrderSummary)').length).toEqual(1)
    })
  })

  describe('Refer a Friend', () => {
    let userFetchReferralOfferMock
    let wrapper

    beforeEach(() => {
      userFetchReferralOfferMock = jest.fn()
      wrapper = shallow(<OrderConfirmation showOrderConfirmationReceipt userFetchReferralOffer={userFetchReferralOfferMock} />)
    })

    test('should fetch referal offer details in componentDidMount', () => {
      wrapper.instance().componentDidMount()
      expect(userFetchReferralOfferMock).toHaveBeenCalled()
    })

    test('should render ReferAFriend component', () => {
      expect(wrapper.find('Connect(ReferAFriend)').length).toEqual(2)
    })
  })

})
