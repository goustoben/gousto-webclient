import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable'

import config from 'config/routes'
import { PaymentMethod } from 'config/signup'
import { Div } from 'Page/Elements'
import { ProgressBar } from 'routes/Checkout/Components/ProgressBar'
import { Summary } from 'routes/Checkout/Components/Summary'
import { loadCheckoutScript } from 'routes/Checkout/loadCheckoutScript'
import { loadPayPalScripts } from 'routes/Checkout/loadPayPalScripts'
import { BoxDetailsContainer } from 'routes/Checkout/Components/BoxDetails'
import { CheckoutPayment } from 'routes/Checkout/Components/CheckoutPayment'
/* eslint-disable import/named */
import {
  menuLoadDays,
  checkoutCreatePreviewOrder,
  basketStepsOrderReceive,
  basketProceedToCheckout,
  menuLoadBoxPrices,
  pricingRequest,
  redirect,
  replace,
} from 'actions'
/* eslint-enable import/named */
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { Checkout } from 'routes/Checkout/Checkout'
import logger from 'utils/logger'
import Overlay from 'Overlay'
import ModalPanel from 'Modal/ModalPanel'
import { Login } from 'Login'

import { loadMenuServiceDataIfDeepLinked } from '../../Menu/fetchData/menuService'

jest.mock('actions', () => ({
  replace: jest.fn().mockReturnValue(Promise.resolve()),
  redirect: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadDays: jest.fn().mockReturnValue(Promise.resolve()),
  pricingRequest: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadBoxPrices: jest.fn().mockReturnValue(Promise.resolve()),
  checkoutFetchIntervals: jest.fn().mockReturnValue(Promise.resolve()),
  basketStepsOrderReceive: jest.fn().mockReturnValue(Promise.resolve()),
  basketProceedToCheckout: jest.fn().mockReturnValue(Promise.resolve()),
  checkoutCreatePreviewOrder: jest.fn().mockReturnValue(Promise.resolve()),
}))

jest.mock('actions/boxSummary', () => ({
  boxSummaryDeliveryDaysLoad: jest.fn().mockReturnValue(Promise.resolve()),
}))

jest.mock('routes/Checkout/loadCheckoutScript', () => ({
  loadCheckoutScript: jest.fn(),
}))

jest.mock('routes/Checkout/loadPayPalScripts', () => ({
  loadPayPalScripts: jest.fn((callback) => {
    callback()
  }),
}))

jest.mock('../../Menu/fetchData/menuService')

jest.mock('utils/logger', () => ({
  error: jest.fn(),
  warning: jest.fn(),
}))

describe('Checkout', () => {
  let wrapper
  let store
  let context
  let dispatch
  let getState
  let subscribe
  let onCheckoutSpy
  let fetchData
  let fetchPayPalClientToken

  beforeEach(() => {
    store = {
      basket: Immutable.Map({
        stepsOrder: Immutable.List(),
        previewOrderId: 152,
        surcharges: Immutable.List(),
      }),
      menuBoxPrices: Immutable.Map({}),
      routing: {
        locationBeforeTransitions: {
          pathname: config.client['check-out'],
        },
      },
      auth: Immutable.Map({
        isAuthenticated: false,
      }),
      checkout: Immutable.fromJS({
        validations: {
          summary: true,
          aboutyou: true,
          payment: true,
          delivery: true,
        },
      }),
      pricing: Immutable.fromJS({
        prices: {},
      }),
      params: { stepName: 'aboutyou' },
      pending: Immutable.Map({}),
      payment: Immutable.Map({
        currentPaymentMethod: PaymentMethod.Card,
      }),
      stepsOrder: Immutable.List(['boxdetails', 'summary', 'aboutyou', 'payment', 'delivery']),
      recipes: Immutable.Map({}),
      request: Immutable.Map({
        browser: 'mobile',
      }),
      error: Immutable.Map({}),
      form: {},
    }

    getState = jest.fn().mockReturnValue(store)
    subscribe = jest.fn().mockReturnValue(Promise.resolve())
    dispatch = jest.fn().mockReturnValue(Promise.resolve())
    fetchPayPalClientToken = jest.fn()

    context = {
      store: {
        getState,
        subscribe,
        dispatch,
      },
    }

    onCheckoutSpy = jest.fn()

    wrapper = shallow(
      <Checkout
        params={{ stepName: 'aboutyou' }}
        checkoutLanding={onCheckoutSpy}
        trackSignupStep={jest.fn()}
      />,
      { context }
    )
  })

  afterEach(() => {
    replace.mockClear()
    redirect.mockClear()
    loadCheckoutScript.mockClear()
    menuLoadDays.mockClear()
    menuLoadDays.mockReset()
    pricingRequest.mockClear()
    menuLoadBoxPrices.mockClear()
    basketStepsOrderReceive.mockClear()
    basketProceedToCheckout.mockClear()
    boxSummaryDeliveryDaysLoad.mockClear()
    checkoutCreatePreviewOrder.mockClear()
    loadMenuServiceDataIfDeepLinked.mockClear()
    loadPayPalScripts.mockClear()
    fetchPayPalClientToken.mockClear()
  })

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<Checkout trackSignupStep={jest.fn()} />, { context })
    })

    test('should render a <Div> with no props', () => {
      expect(wrapper.type()).toEqual(Div)
    })

    test('should render 1 <ProgressBar> component(s)', () => {
      const mobileWrapper = shallow(
        <Checkout
          browser="mobile"
          params={{ stepName: 'boxdetails' }}
          trackSignupStep={jest.fn()}
        />,
        { context }
      )
      expect(mobileWrapper.find(ProgressBar)).toHaveLength(1)

      const desktopWrapper = shallow(
        <Checkout
          browser="desktop"
          params={{ stepName: 'boxdetails' }}
          trackSignupStep={jest.fn()}
        />,
        { context }
      )
      expect(desktopWrapper.find(ProgressBar)).toHaveLength(1)
    })

    test('should render 1 <Summary> component(s)', () => {
      expect(wrapper.find(Summary)).toHaveLength(1)
    })

    test('should render 1 <Div> component(s)', () => {
      expect(wrapper.children(Div)).toHaveLength(1)
    })

    test('should render 1 <BoxDetailsContainer> component(s)', () => {
      expect(wrapper.find(BoxDetailsContainer)).toHaveLength(1)
    })

    test('should render 1 Overlay', () => {
      expect(wrapper.find(Overlay).length).toEqual(1)
    })

    test('should render 1 ModalPanel', () => {
      expect(wrapper.find(ModalPanel).length).toEqual(1)
    })

    test('should render 1 Login', () => {
      expect(wrapper.find(Login).length).toEqual(1)
    })
  })

  describe('fetchData', () => {
    test('should redirect to the first checkout step', async () => {
      await Checkout.fetchData({
        store: context.store,
        query: {},
        params: {},
      })
      expect(dispatch).toHaveBeenCalled()
      expect(replace).toHaveBeenCalledWith('/check-out/aboutyou')
    })

    test('should dispatch menuLoadDays, boxSummaryDeliveryDaysLoad, checkoutCreatePreviewOrder, basketStepsOrderReceive, pricingRequest', async () => {
      await Checkout.fetchData({
        store: context.store,
        query: { steps: 'boxdetails,aboutyou,payment,delivery' },
        params: { stepName: '' },
      })
      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalled()
      expect(menuLoadDays).toHaveBeenCalledTimes(4)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(2)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(2)
      expect(pricingRequest).toHaveBeenCalledTimes(2)
    })

    test('should dispatch menuLoadDays, boxSummaryDeliveryDaysLoad, checkoutCreatePreviewOrder, basketStepsOrderReceive', async () => {
      store = {
        basket: Immutable.Map({
          stepsOrder: Immutable.List(),
          previewOrderId: '',
        }),
        checkout: Immutable.fromJS({
          intervals: [],
        }),
        menuBoxPrices: Immutable.Map({ 2: {} }),
        menuCutoffUntil: '2019-02-22T11:59:59+00:00',
        error: Immutable.Map({}),
      }
      getState = jest.fn().mockReturnValue(store)
      await Checkout.fetchData({
        store: {
          dispatch,
          getState,
        },
        query: { steps: 'boxdetails,aboutyou,payment,delivery' },
        params: { stepName: '' },
      })

      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalled()
      expect(menuLoadDays).toHaveBeenCalledTimes(3)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(2)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(2)
      expect(menuLoadBoxPrices).not.toHaveBeenCalled()
    })

    test('should dispatch menuLoadDays, boxSummaryDeliveryDaysLoad, checkoutCreatePreviewOrder, redirect to menu with error=no-stock', async () => {
      store = {
        basket: Immutable.Map({
          stepsOrder: Immutable.List(),
          previewOrderId: '',
        }),
        checkout: Immutable.fromJS({
          intervals: [],
        }),
        menuBoxPrices: Immutable.Map({ 2: {} }),
        menuCutoffUntil: '2019-02-22T11:59:59+00:00',
        error: Immutable.Map({
          BASKET_PREVIEW_ORDER_CHANGE: {
            code: 'out-of-stock',
            message: 'Item(s) out of stock: {"3":"Umbrian Wild Boar Salami Ragu with Ling"}',
            errors: {},
          },
        }),
      }
      getState = jest.fn().mockReturnValue(store)
      await Checkout.fetchData({
        store: {
          dispatch,
          getState,
        },
        query: { steps: 'boxdetails,aboutyou,payment,delivery' },
        params: { stepName: '' },
      })

      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
      expect(dispatch.mock.calls.length).toBeGreaterThan(4)
      expect(menuLoadDays).toHaveBeenCalledTimes(3)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(2)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(2)
      expect(redirect).toHaveBeenCalledWith('/menu?from=newcheckout&error=no-stock', true)
    })

    test('should dispatch menuLoadDays, boxSummaryDeliveryDaysLoad, checkoutCreatePreviewOrder, redirect to menu with error=basket-expired', async () => {
      store = {
        basket: Immutable.Map({
          stepsOrder: Immutable.List(),
          previewOrderId: '',
        }),
        checkout: Immutable.fromJS({
          intervals: [],
        }),
        menuBoxPrices: Immutable.Map({ 2: {} }),
        menuCutoffUntil: '2019-02-22T11:59:59+00:00',
        error: Immutable.Map({
          BASKET_PREVIEW_ORDER_CHANGE: {
            code: 'basket-expired',
            message: 'Missing data, persistent basket might be expired',
            errors: {},
          },
        }),
      }
      getState = jest.fn().mockReturnValue(store)
      await Checkout.fetchData({
        store: {
          dispatch,
          getState,
        },
        query: { steps: 'boxdetails,aboutyou,payment,delivery' },
        params: { stepName: '' },
      })

      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
      expect(dispatch.mock.calls.length).toBeGreaterThan(4)
      expect(menuLoadDays).toHaveBeenCalledTimes(3)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(2)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(2)
      expect(redirect).toHaveBeenCalledWith('/menu?from=newcheckout&error=basket-expired', true)
      expect(logger.warning).toHaveBeenCalledWith(
        'Preview order id failed to create, persistent basket might be expired, error: basket-expired'
      )
    })

    test('should dispatch menuLoadDays, boxSummaryDeliveryDaysLoad, checkoutCreatePreviewOrder, redirect to menu with error=undefined-error', async () => {
      store = {
        basket: Immutable.Map({
          stepsOrder: Immutable.List(),
          previewOrderId: '',
        }),
        checkout: Immutable.fromJS({
          intervals: [],
        }),
        menuBoxPrices: Immutable.Map({ 2: {} }),
        menuCutoffUntil: '2019-02-22T11:59:59+00:00',
        error: Immutable.Map({
          BASKET_PREVIEW_ORDER_CHANGE: true,
        }),
      }
      getState = jest.fn().mockReturnValue(store)
      await Checkout.fetchData({
        store: {
          dispatch,
          getState,
        },
        query: { steps: 'boxdetails,aboutyou,payment,delivery' },
        params: { stepName: '' },
      })

      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
      expect(dispatch.mock.calls.length).toBeGreaterThan(4)
      expect(menuLoadDays).toHaveBeenCalledTimes(3)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(2)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(2)
      expect(redirect).toHaveBeenCalledWith('/menu?from=newcheckout&error=undefined-error', true)
    })
  })

  describe('componentDidMount', () => {
    const setStateSpy = jest.spyOn(Checkout.prototype, 'setState')
    const changeRecaptcha = jest.fn()

    beforeEach(() => {
      fetchData = jest.fn().mockReturnValue(Promise.resolve())
      Checkout.fetchData = fetchData
      wrapper = mount(
        <Checkout
          query={{ query: true }}
          params={{ params: true }}
          trackSignupStep={jest.fn()}
          fetchPayPalClientToken={fetchPayPalClientToken}
          changeRecaptcha={changeRecaptcha}
        />,
        { context }
      )
    })

    test('should call fetchData', () => {
      wrapper.instance().componentDidMount()

      expect(fetchData).toHaveBeenCalled()
      expect(fetchData).toHaveBeenCalledWith({
        browser: 'desktop',
        store: context.store,
        query: { query: true },
        params: { params: true },
        isCheckoutOverhaulEnabled: false,
      })
    })

    test('should load PayPal and checkout data', () => {
      wrapper.instance().componentDidMount()

      expect(loadPayPalScripts).toHaveBeenCalled()
      expect(loadCheckoutScript).toHaveBeenCalled()
      expect(fetchPayPalClientToken).toHaveBeenCalled()
    })

    test('should call setState and update states', () => {
      wrapper.instance().componentDidMount()

      expect(setStateSpy).toHaveBeenCalled()
      expect(wrapper.state().paypalScriptsReady).toBe(true)
      expect(wrapper.state().isCreatingPreviewOrder).toBe(false)
    })

    test('should call changeRecaptcha', () => {
      expect(changeRecaptcha).toHaveBeenCalled()
    })
  })

  describe('componentWillReceiveProps', () => {
    let loadPrices
    beforeEach(() => {
      loadPrices = jest.fn()
      wrapper = shallow(
        <Checkout
          query={{ query: true }}
          params={{ params: true }}
          loadPrices={loadPrices}
          trackSignupStep={jest.fn()}
        />,
        { context }
      )
    })

    test('should call loadPrices if tariffId has changed', async () => {
      await wrapper.instance().UNSAFE_componentWillReceiveProps({ tariffId: 2 })
      expect(loadPrices).toHaveBeenCalledTimes(1)
    })
  })

  describe('when component unmounted', () => {
    let clearPayPalClientToken

    beforeEach(() => {
      clearPayPalClientToken = jest.fn()
      wrapper.setProps({
        clearPayPalClientToken,
      })
    })

    test('should clear PayPal token', async () => {
      await wrapper.unmount()

      expect(clearPayPalClientToken).toHaveBeenCalled()
    })
  })

  describe('payment component', () => {
    describe('when the checkoutPaymentFeature flag is set', () => {
      const setStateSpy = jest.spyOn(Checkout.prototype, 'setState')

      beforeEach(() => {
        wrapper = shallow(
          <Checkout params={{ stepName: 'payment' }} browser="mobile" checkoutPaymentFeature />
        )
      })

      test('should render a CheckoutPayment component', () => {
        expect(wrapper.find(CheckoutPayment)).toHaveLength(1)
      })

      describe('CheckoutPayment props', () => {
        describe('when stepName is "payment"', () => {
          test('then should return prerender = false', () => {
            expect(wrapper.find(CheckoutPayment).props().prerender).toBeFalsy()
          })

          test('then should return isLastStep = true and nextStepName is empty', () => {
            expect(wrapper.find(CheckoutPayment).props().isLastStep).toBeTruthy()
            expect(wrapper.find(CheckoutPayment).props().nextStepName).toEqual('')
          })
        })

        describe('when stepName is not "payment"', () => {
          beforeEach(() => {
            wrapper.setProps({ params: { stepName: 'aboutyou' } })
          })

          test('then should return prerender = true', () => {
            expect(wrapper.find(CheckoutPayment).props().prerender).toBeTruthy()
          })

          test('then should return isLastStep = false and nextStepName is not empty', () => {
            expect(wrapper.find(CheckoutPayment).props().isLastStep).toBeFalsy()
            expect(wrapper.find(CheckoutPayment).props().nextStepName).not.toEqual('')
          })
        })
      })

      test('should call loadCheckoutScript', () => {
        loadCheckoutScript.mockImplementationOnce((callback) => {
          callback()
        })
        wrapper.instance().componentDidMount()
        expect(loadCheckoutScript).toHaveBeenCalled()
        expect(setStateSpy).toHaveBeenCalled()
        expect(wrapper.state('checkoutScriptReady')).toBeTruthy()
      })
    })
  })

  describe('trackClick', () => {
    const trackCheckoutButtonPressed = jest.fn()

    test('should call trackCheckoutButtonPressed with proper params', () => {
      const instance = wrapper.instance()
      wrapper.setProps({ trackCheckoutButtonPressed })
      instance.trackClick('steps', 'currentStep')
      expect(trackCheckoutButtonPressed).toHaveBeenCalledWith('steps', 'currentStep')
    })
  })

  describe('isLastStep', () => {
    const steps = ['boxdetails', 'yourdetails', 'payment']

    test('should return true if current step is "payment"', () => {
      const instance = wrapper.instance()
      const currentStep = 'payment'
      expect(instance.isLastStep(steps, currentStep)).toBeTruthy()
    })

    test('should return false if current step is "boxdetails"', () => {
      const instance = wrapper.instance()
      const currentStep = 'boxdetails'
      expect(instance.isLastStep(steps, currentStep)).toBeFalsy()
    })
  })

  describe('getNextStep', () => {
    let instance
    let currentStep
    const steps = ['boxdetails', 'yourdetails', 'payment']

    beforeEach(() => {
      instance = wrapper.instance()
      wrapper.setProps({
        browser: 'mobile',
      })
    })

    describe('when current step is not the last one', () => {
      test('then should return next step', () => {
        currentStep = 'yourdetails'
        expect(instance.getNextStep(steps, currentStep)).toEqual('payment')
        currentStep = 'boxdetails'
        expect(instance.getNextStep(steps, currentStep)).toEqual('yourdetails')
      })
    })

    describe('when current step is the last one', () => {
      test('then should undefined', () => {
        currentStep = 'payment'
        expect(instance.getNextStep(steps, currentStep)).toBeUndefined()
      })
    })
  })

  describe('when onStepChange is called', () => {
    let trackSignupStep
    let redirectAction

    beforeEach(() => {
      trackSignupStep = jest.fn()
      redirectAction = jest.fn()

      wrapper = shallow(
        <Checkout
          params={{ stepName: 'boxdetails' }}
          browser="mobile"
          checkoutPaymentFeature
          redirect={redirectAction}
          trackSignupStep={trackSignupStep}
        />
      )

      wrapper.find('BoxDetails').props().onStepChange()
    })

    test('trackSignupStep is called with the next step', () => {
      expect(trackSignupStep).toHaveBeenCalledWith('yourdetails')
    })

    test('redirect is called with the next step', () => {
      expect(redirectAction).toHaveBeenCalledWith('/check-out/yourdetails')
    })
  })

  describe('when reloadCheckoutScript is called', () => {
    let instance

    beforeEach(() => {
      wrapper = shallow(<Checkout />)
      instance = wrapper.instance()
      loadCheckoutScript.mockImplementationOnce((callback) => {
        callback()
      })

      instance.reloadCheckoutScript()
    })

    test('then loadCheckoutScript should be called', () => {
      expect(loadCheckoutScript).toBeCalled()
      expect(wrapper.state('checkoutScriptReady')).toBeTruthy()
    })
  })

  describe('when isCheckoutOverhaulEnabled is enabled', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true,
      })
    })

    test('then should render Breadcrumbs component', () => {
      expect(wrapper.find('Breadcrumbs').exists()).toBeTruthy()
      expect(wrapper.find('ProgressBar').exists()).toBeFalsy()
    })

    test('then should add redesign classes to desktop component wrappers', () => {
      expect(wrapper.find('.checkoutContent').hasClass('checkoutContentRedesign')).toBeTruthy()
      expect(wrapper.find('.rowCheckout').hasClass('rowCheckoutRedesign')).toBeTruthy()
      expect(wrapper.find('.section').hasClass('sectionRedesign')).toBeTruthy()
      expect(wrapper.find('.aside').hasClass('asideRedesign')).toBeTruthy()
    })
  })

  describe('when toggling isLoginOpen', () => {
    describe('when isLoginOpen is true', () => {
      beforeEach(() => {
        wrapper.setProps({ isLoginOpen: true })
      })

      test('then the Overlay should be open', () => {
        expect(wrapper.find(Overlay).prop('open')).toBeTruthy()
      })
    })

    describe('when isLoginOpen is false', () => {
      beforeEach(() => {
        wrapper.setProps({ isLoginOpen: false })
      })

      test('then the Overlay should not be "open"', () => {
        expect(wrapper.find(Overlay).prop('open')).toBeFalsy()
      })
    })
  })

  describe('when handleLoginClick is called from a child component', () => {
    const trackCheckoutButtonPressed = jest.fn()
    const loginVisibilityChange = jest.fn()
    let instance
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    }

    beforeEach(() => {
      instance = wrapper.instance()
    })

    describe('and isMobile false', () => {
      beforeEach(() => {
        wrapper.setProps({
          isMobile: false,
          isAuthenticated: true,
          trackCheckoutButtonPressed,
        })
      })

      test('then should not call trackCheckoutButtonPressed', () => {
        expect(trackCheckoutButtonPressed).not.toBeCalled()
        instance.handleLoginClick(event)
        expect(trackCheckoutButtonPressed).not.toBeCalled()
      })
    })

    describe('and isMobile true', () => {
      beforeEach(() => {
        wrapper.setProps({
          isMobile: true,
          isAuthenticated: true,
          trackCheckoutButtonPressed,
        })
      })

      test('then should dispatch trackCheckoutButtonPressed with proper parameter', () => {
        expect(trackCheckoutButtonPressed).not.toBeCalled()
        instance.handleLoginClick(event)
        expect(trackCheckoutButtonPressed).toHaveBeenCalledWith('LogInCTA Clicked')
      })
    })

    describe('and isAuthenticated is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          isAuthenticated: true,
          loginVisibilityChange,
        })
      })

      test('then should not call loginVisibilityChange', () => {
        expect(loginVisibilityChange).not.toBeCalled()
        instance.handleLoginClick(event)
        expect(loginVisibilityChange).not.toBeCalled()
      })
    })

    describe('and isAuthenticated is false', () => {
      beforeEach(() => {
        wrapper.setProps({
          isAuthenticated: false,
          loginVisibilityChange,
        })
      })

      test('then should call loginVisibilityChange', () => {
        expect(loginVisibilityChange).not.toBeCalled()
        instance.handleLoginClick(event)
        expect(loginVisibilityChange).toHaveBeenCalledWith(true)
      })
    })
  })

  describe('when handleLoginClose is called from the modal', () => {
    const loginVisibilityChange = jest.fn()
    let instance
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    }

    beforeEach(() => {
      wrapper.setProps({
        loginVisibilityChange,
      })
      instance = wrapper.instance()
    })

    test('then should call loginVisibilityChange', () => {
      expect(loginVisibilityChange).not.toBeCalled()
      instance.handleLoginClose(event)
      expect(loginVisibilityChange).toHaveBeenCalledWith(false)
    })
  })
})
