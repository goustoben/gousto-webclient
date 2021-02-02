import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { menuLoadDays, redirect, menuLoadBoxPrices, changeStep } from 'actions'
import { StepIndicator } from 'goustouicomponents'

import { Signup } from 'routes/Signup/Signup'
import { DiscountAppliedBar } from '../Components/DiscountAppliedBar/DiscountAppliedBar'
import { loadMenuServiceDataIfDeepLinked } from '../../Menu/fetchData/menuService'
import css from '../Signup.css'

jest.mock('actions', () => ({
  signupStepsReceive: jest.fn().mockReturnValue(Promise.resolve()),
  signupSetStep: jest.fn().mockReturnValue(Promise.resolve()),
  redirect: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadDays: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadBoxPrices: jest.fn().mockReturnValue(Promise.resolve()),
  changeStep: jest.fn().mockReturnValue(Promise.resolve()),
}))

jest.mock('../../Menu/fetchData/menuService')

describe('Signup', () => {
  let store
  let context
  let dispatch
  let getState
  let subscribe
  const props = {
    changeStep,
    menuLoadBoxPrices,
    promoModalVisible: false,
    promoBannerState: {
      hide: false
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
  })

  afterEach(() => {
    redirect.mockClear()
    menuLoadDays.mockClear()
    menuLoadDays.mockReset()
    loadMenuServiceDataIfDeepLinked.mockClear()
    menuLoadBoxPrices.mockClear()
  })

  describe('fetchData', () => {
    const fetchDataProps = {
      query: { },
      params: { },
      menuLoadBoxPrices,
    }

    test('loadMenuServiceDataIfDeepLinked', async () => {
      await Signup.fetchData({
        ...fetchDataProps,
        store: context.store,
      })

      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalled()
      expect(menuLoadDays).toHaveBeenCalledTimes(1)
      expect(menuLoadBoxPrices).not.toBeCalled()
    })

    describe('when isPricingClarityEnabled is true', () => {
      describe('and promo code is not applied', () => {
        test('then should call menuLoadBoxPrices', async () => {
          await Signup.fetchData({
            ...fetchDataProps,
            store: context.store,
            orderDiscount: '',
            isPricingClarityEnabled: true
          })

          expect(menuLoadBoxPrices).toHaveBeenCalled()
        })
      })

      describe('and promo code is applied', () => {
        test('then menuLoadBoxPrices should not be called', async () => {
          await Signup.fetchData({
            ...fetchDataProps,
            store: context.store,
            orderDiscount: '50',
            isPricingClarityEnabled: true
          })

          expect(menuLoadBoxPrices).not.toBeCalled()
        })
      })
    })
  })

  describe('Step size on Signup', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Signup {...props} />, { context })
    })

    describe('when isTastePreferencesEnabled is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          isTastePreferencesEnabled: true
        })
      })

      test('should display step size 5', () => {
        expect(wrapper.find(StepIndicator).prop('size')).toEqual(5)
      })
    })

    describe('when isTastePreferencesEnabled is false', () => {
      beforeEach(() => {
        wrapper.setProps({
          isTastePreferencesEnabled: false
        })
      })

      test('should display step size 3', () => {
        expect(wrapper.find(StepIndicator).prop('size')).toEqual(3)
      })
    })
  })

  describe('given <DiscountAppliedBar>', () => {
    let wrapper

    describe('when state is hidden', () => {
      beforeEach(() => {
        wrapper = shallow(<Signup promoModalVisible={false} promoBannerState={{ hide: true }} />, { context })
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
        wrapper = shallow(<Signup promoModalVisible promoBannerState={{ hide: false }} />, { context })
      })

      test('should show DiscountAppliedBar element', () => {
        expect(wrapper.find(DiscountAppliedBar).prop('promoModalVisible')).toBe(true)
        expect(wrapper.find(DiscountAppliedBar).prop('isPromoBarHidden')).toBe(false)
      })

      test('should add discountApplied css class', () => {
        expect(wrapper.hasClass(css.discountApplied)).toBe(false)
      })
    })
  })
})
