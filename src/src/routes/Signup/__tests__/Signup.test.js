import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import actions from 'actions'
import { StepIndicator } from 'goustouicomponents'
import { Signup } from 'routes/Signup/Signup'
import { DiscountAppliedBar } from '../Components/DiscountAppliedBar/DiscountAppliedBar'
import { loadMenuServiceDataIfDeepLinked } from '../../Menu/fetchData/menuService'
import css from '../Signup.css'

jest.spyOn(actions, 'signupStepsReceive').mockResolvedValue()

const redirect = jest.spyOn(actions, 'redirect').mockResolvedValue()
const menuLoadDays = jest.spyOn(actions, 'menuLoadDays').mockResolvedValue()
const menuLoadBoxPrices = jest.spyOn(actions, 'menuLoadBoxPrices').mockResolvedValue()
const signupSetStep = jest.spyOn(actions, 'signupSetStep').mockResolvedValue()
const updatePricePerServing = jest.spyOn(actions, 'updatePricePerServing').mockResolvedValue()

jest.mock('../../Menu/fetchData/menuService')

describe('Signup', () => {
  let store
  let context
  let dispatch
  let getState
  let subscribe
  const props = {
    changeStep: signupSetStep,
    menuLoadBoxPrices,
    promoModalVisible: false,
    promoBannerState: {
      hide: false,
    },
    updatePricePerServing,
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
    updatePricePerServing.mockClear()
  })

  describe('fetchData', () => {
    const fetchDataProps = {
      query: {},
      params: {},
      options: {
        menuLoadBoxPrices,
      },
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
      expect(updatePricePerServing).not.toBeCalled()
    })

    describe('when requested step is not the first one', () => {
      beforeEach(async () => {
        await Signup.fetchData({
          ...fetchDataProps,
          params: {
            stepName: 'delivery-options',
          },
          store: context.store,
        })
      })

      test('then should redirect to the first step', async () => {
        expect(redirect).toHaveBeenCalledWith('/signup/box-size')
        expect(dispatch).toHaveBeenCalled()
      })
    })

    describe('when isPricingClarityEnabled is true', () => {
      describe('and promo code is not applied', () => {
        test('then should call menuLoadBoxPrices', async () => {
          fetchDataProps.options = {
            ...fetchDataProps.options,
            orderDiscount: '',
            isPricingClarityEnabled: true,
          }
          await Signup.fetchData({
            ...fetchDataProps,
            store: context.store,
          })

          expect(menuLoadBoxPrices).toHaveBeenCalled()
        })
      })

      describe('and promo code is applied', () => {
        test('then menuLoadBoxPrices should not be called', async () => {
          fetchDataProps.options = {
            ...fetchDataProps.options,
            orderDiscount: '50',
            isPricingClarityEnabled: true,
          }
          await Signup.fetchData({
            ...fetchDataProps,
            store: context.store,
          })

          expect(menuLoadBoxPrices).not.toBeCalled()
        })
      })
    })

    describe('when wizard price per serving is enabled', () => {
      describe('and is not on box size step', () => {
        test('then should not call updatePricePerServing', async () => {
          fetchDataProps.options = {
            ...fetchDataProps.options,
            isWizardPricePerServingEnabled: true,
            lowestPricePerPortion: {},
          }
          await Signup.fetchData({
            ...fetchDataProps,
            store: context.store,
          })

          expect(updatePricePerServing).not.toHaveBeenCalled()
        })
      })
    })

    describe('when isPaymentBeforeChoosingEnabled is enabled', () => {
      test('then it should initialize the four steps', async () => {
        fetchDataProps.options = {
          ...fetchDataProps.options,
          isPaymentBeforeChoosingEnabled: true,
        }

        await Signup.fetchData({
          ...fetchDataProps,
          store: context.store,
        })

        expect(actions.signupStepsReceive).toHaveBeenCalledWith(
          Immutable.List(['boxSize', 'recipesPerBox', 'postcode', 'delivery'])
        )
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
          isTastePreferencesEnabled: true,
        })
      })

      test('should display step size 5', () => {
        expect(wrapper.find(StepIndicator).prop('size')).toEqual(5)
      })
    })

    describe('when isTastePreferencesEnabled is false', () => {
      beforeEach(() => {
        wrapper.setProps({
          isTastePreferencesEnabled: false,
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
        wrapper = shallow(
          <Signup {...props} promoModalVisible={false} promoBannerState={{ hide: true }} />,
          {
            context,
          }
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
          <Signup {...props} promoModalVisible promoBannerState={{ hide: false }} />,
          {
            context,
          }
        )
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

  describe('when the step is "about" for Sell the Proposition page', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Signup {...props} stepName="about" />, { context })
    })

    test('then it should render the separate Sell the proposition page', () => {
      expect(wrapper.find('Connect(SellThePropositionPage)').exists()).toBe(true)
    })
  })
})
