import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { menuLoadDays, redirect, menuLoadBoxPrices, changeStep } from 'actions'
import { StepIndicator } from 'goustouicomponents'

import { Signup } from 'routes/Signup/Signup'
import { loadMenuServiceDataIfDeepLinked } from '../../Menu/fetchData/menuService'

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
})
