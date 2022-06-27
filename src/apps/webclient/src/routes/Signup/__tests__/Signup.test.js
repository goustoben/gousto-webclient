import React from 'react'

import actions from 'actions'
import { shallow } from 'enzyme'
import { StepIndicator } from 'goustouicomponents'
import Immutable from 'immutable'

import { Signup } from 'routes/Signup/Signup'

import { DiscountAppliedBar } from '../Components/DiscountAppliedBar/DiscountAppliedBar'

import css from '../Signup.css'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
}))

jest.spyOn(actions, 'signupStepsReceive').mockResolvedValue()

const redirect = jest.spyOn(actions, 'redirect').mockResolvedValue()
const menuLoadDays = jest.spyOn(actions, 'menuLoadDays').mockResolvedValue()
const signupSetStep = jest.spyOn(actions, 'signupSetStep').mockResolvedValue()

jest.mock('../../Menu/fetchData/menuService')

const signupFetchData = Signup.fetchData

describe('Signup', () => {
  let store
  let context
  let dispatch
  let getState
  let subscribe
  const props = {
    changeStep: signupSetStep,
    promoModalVisible: false,
    promoBannerState: {
      canApplyPromo: true,
    },
  }

  beforeEach(() => {
    store = {
      features: Immutable.List(),
      signup: Immutable.List(),
    }

    getState = jest.fn().mockReturnValue(store)
    dispatch = jest.fn().mockReturnValue(Promise.resolve())

    context = {
      store: {
        getState,
        subscribe,
        dispatch,
      },
    }
    Signup.fetchData = jest.fn()
  })

  afterEach(() => {
    redirect.mockClear()
    menuLoadDays.mockClear()
    menuLoadDays.mockReset()
    Signup.fetchData = signupFetchData
  })

  describe('Step size on Signup', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Signup {...props} />, { context })
    })

    test('should display step size 3', () => {
      expect(wrapper.find(StepIndicator).prop('size')).toEqual(3)
    })
  })

  describe('given <DiscountAppliedBar>', () => {
    let wrapper

    describe('when state is hidden', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Signup {...props} promoModalVisible={false} promoBannerState={{ basketPromo: '' }} />,
          {
            context,
          },
        )
      })

      test('should hide DiscountAppliedBar element', () => {
        expect(wrapper.find(DiscountAppliedBar).prop('promoModalVisible')).toBe(false)
        expect(wrapper.find(DiscountAppliedBar).prop('isPromoBarHidden')).toBe(true)
      })

      test('should add discountApplied css class', () => {
        expect(wrapper.hasClass(css.discountApplied)).toBe(true)
      })
    })

    describe('when state is visible', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Signup {...props} promoModalVisible promoBannerState={{ basketPromo: 'DTI-promo' }} />,
          {
            context,
          },
        )
      })

      test('should not show DiscountAppliedBar element', () => {
        expect(wrapper.find(DiscountAppliedBar).prop('promoModalVisible')).toBe(true)
        expect(wrapper.find(DiscountAppliedBar).prop('isPromoBarHidden')).toBe(true)
      })

      test('should add discountApplied css class', () => {
        expect(wrapper.hasClass(css.discountApplied)).toBe(false)
      })
    })
  })

  describe('when the slug is "about" for Sell the Proposition page', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Signup {...props} secondarySlug="about" />, { context })
    })

    test('then it should render the separate Sell the proposition page', () => {
      expect(wrapper.find('Connect(SellThePropositionPage)').exists()).toBe(true)
    })
  })
})
