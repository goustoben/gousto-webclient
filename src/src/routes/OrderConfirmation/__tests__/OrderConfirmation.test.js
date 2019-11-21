import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import { OrderConfirmation } from '../OrderConfirmation'

describe('OrderConfirmation', () => {
  const DEFAULT_HEADER_DETAILS = {
    deliveryDate: 'Tuesday 26th March',
    deliveryStart: '8 am',
    deliveryEnd: '7 pm',
    whenCutoffTime: '12 pm',
    whenCutoffDate: 'Wednesday 20th March',
  }

  const rafOffer = Immutable.Map({
    creditFormatted: '£15',
    firstBoxDiscountFormatted: '60%',
    firstMonthDiscountFormatted: '30%',
  })

  const DEFAULT_PROPS = {
    headerDetails: DEFAULT_HEADER_DETAILS,
    showHeader: false,
    products: {},
    isLoading: false,
    filterProductCategory: () => { },
    showOrderConfirmationReceipt: false,
    ageVerified: false,
    selectedCategory: 'all-products',
    basket: Immutable.fromJS({}),
    productsCategories: Immutable.fromJS({}),
    rafOffer,
    userFetchReferralOffer: jest.fn(),
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<OrderConfirmation {...DEFAULT_PROPS} />)
  })

  describe('rendering the right components', () => {
    test('renders the marketPlace title', () => {
      expect(wrapper.find('.marketPlaceTitle').exists()).toBe(true)
    })

    test('renders a AgeVerificationPopUp', () => {
      expect(wrapper.find('AgeVerificationPopUp').exists()).toBe(true)
    })

    test('renders the Market', () => {
      expect(wrapper.find('Connect(Market)').exists()).toBe(true)
    })

    test('renders an AwinPixel', () => {
      expect(wrapper.find('Connect(AwinPixel)').exists()).toBe(true)
    })
  })

  describe('when page is loading', () => {
    beforeEach(() => {
      wrapper.setProps({ isLoading: true })
    })

    test('shows the loading spinner', () => {
      expect(wrapper.find('Loading').exists()).toBe(true)
    })
  })

  describe('when showHeader is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ showHeader: false })
    })

    test('does not show the Order Confirmation Header', () => {
      expect(wrapper.find('OrderConfirmationHeader').exists()).toBe(false)
    })

    test('renders the RAF component', () => {
      expect(wrapper.find('Connect(ReferAFriend)').exists()).toBe(true)
    })

    test('renders the market place title', () => {
      expect(wrapper.find('.marketPlaceTitle').exists()).toBe(true)
    })

    test('renders the Market component', () => {
      expect(wrapper.find('Connect(Market)').exists()).toBe(true)
    })
  })

  describe('when showHeader is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ showHeader: true })
    })

    test('sends the right props to Order Confirmation Header', () => {
      Object.keys(DEFAULT_HEADER_DETAILS).forEach(key => {
        expect(wrapper.find('OrderConfirmationHeader').prop(key)).toBe(DEFAULT_HEADER_DETAILS[key])
      })
    })

    test('renders two VerticalStagesItem components', () => {
      expect(wrapper.find('VerticalStagesItem')).toHaveLength(2)
    })

    test('renders the OrderConfirmationHeader in the first VerticalStageItem', () => {
      expect(wrapper.find('VerticalStagesItem').first().find('OrderConfirmationHeader').exists()).toBe(true)
    })

    test('renders the Market component in the second VerticalStageItem', () => {
      expect(wrapper.find('VerticalStagesItem').at(1).find('Connect(Market)').exists()).toBe(true)
    })

    test('renders the ReferAFriend in the first VerticalStageItem', () => {
      expect(wrapper.find('VerticalStagesItem').first().find('Connect(ReferAFriend)')).toHaveLength(1)
    })

    test('the hasFullWidth prop passed to VerticalStages as true', () => {
      expect(wrapper.find('VerticalStages').prop('hasFullWidth')).toBe(true)
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
