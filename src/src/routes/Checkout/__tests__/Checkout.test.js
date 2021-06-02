import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable'

import config from 'config/routes'
import { PaymentMethod } from 'config/signup'
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
  checkoutStepIndexReached,
  trackSignupStep,
} from 'actions'
/* eslint-enable import/named */
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { Checkout } from 'routes/Checkout/Checkout'
import logger from 'utils/logger'
import Overlay from 'Overlay'
import { Login } from 'Login'

import { loadMenuServiceDataIfDeepLinked } from '../../Menu/fetchData/menuService'

jest.mock('actions', () => ({
  replace: jest.fn().mockReturnValue(Promise.resolve()),
  redirect: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadDays: jest.fn().mockReturnValue(Promise.resolve()),
  pricingRequest: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadBoxPrices: jest.fn().mockReturnValue(Promise.resolve()),
  basketStepsOrderReceive: jest.fn().mockReturnValue(Promise.resolve()),
  basketProceedToCheckout: jest.fn().mockReturnValue(Promise.resolve()),
  checkoutCreatePreviewOrder: jest.fn().mockReturnValue(Promise.resolve()),
  checkoutStepIndexReached: jest.fn(),
  trackSignupStep: jest.fn(),
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

jest.mock('routes/Menu/fetchData/menuService', () => ({
  loadMenuServiceDataIfDeepLinked: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  error: jest.fn(),
  warning: jest.fn(),
}))

describe('Given Checkout component', () => {
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
          account: true,
          payment: true,
          delivery: true,
        },
        errors: {},
      }),
      pricing: Immutable.fromJS({
        prices: {},
      }),
      params: { stepName: 'account' },
      pending: Immutable.Map({}),
      payment: Immutable.Map({
        currentPaymentMethod: PaymentMethod.Card,
      }),
      stepsOrder: Immutable.List(['account', 'payment', 'delivery']),
      recipes: Immutable.Map({}),
      request: Immutable.Map({
        browser: 'mobile',
      }),
      error: Immutable.Map({}),
      form: {},
      ribbon: Immutable.Map({}),
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
        params={{ stepName: 'account' }}
        checkoutLanding={onCheckoutSpy}
        trackSignupStep={trackSignupStep}
        redirect={redirect}
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

  describe('when component is mounted', () => {
    beforeEach(() => {
      wrapper = shallow(<Checkout trackSignupStep={jest.fn()} />, { context })
    })

    test('then should render Breadcrumbs component', () => {
      expect(wrapper.find('Breadcrumbs').exists()).toBeTruthy()
    })

    describe('when isMobile is set to false', () => {
      test('then should render proper components', () => {
        expect(wrapper.find('ExpandableBoxSummary').exists()).toBeTruthy()
        expect(wrapper.find(Summary).exists()).toBeTruthy()
        expect(wrapper.find(BoxDetailsContainer).exists()).toBeTruthy()
      })
    })

    describe('when isMobile is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({
          isMobile: true,
        })
      })

      test('then should render ExpandableBoxSummary component', () => {
        expect(wrapper.find('ExpandableBoxSummary').exists()).toBeTruthy()
      })

      test('then should render Summary and BoxDetails components', () => {
        expect(wrapper.find(Summary).exists()).toBeTruthy()
        expect(wrapper.find(BoxDetailsContainer).exists()).toBeTruthy()
      })
    })

    test('then should render Login component', () => {
      expect(wrapper.find(Login).exists()).toBeTruthy()
    })
  })

  describe('fetchData', () => {
    afterEach(() => {
      // eslint-disable-next-line no-underscore-dangle
      global.__SERVER__ = false
    })

    test('should redirect to the first checkout step', async () => {
      await Checkout.fetchData({
        store: context.store,
        query: {},
        params: {},
      })
      expect(dispatch).toHaveBeenCalled()
      expect(replace).toHaveBeenCalledWith('/check-out/account')
    })

    test('should dispatch menuLoadDays, boxSummaryDeliveryDaysLoad, checkoutCreatePreviewOrder, basketStepsOrderReceive, pricingRequest', async () => {
      await Checkout.fetchData({
        store: context.store,
        query: { steps: 'account,payment,delivery' },
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
        query: { steps: 'account,payment,delivery' },
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
        query: { steps: 'account,payment,delivery' },
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
        query: { steps: 'account,payment,delivery' },
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
        query: { steps: 'account,payment,delivery' },
        params: { stepName: '' },
      })

      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
      expect(dispatch.mock.calls.length).toBeGreaterThan(4)
      expect(menuLoadDays).toHaveBeenCalledTimes(3)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(2)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(2)
      expect(redirect).toHaveBeenCalledWith('/menu?from=newcheckout&error=undefined-error', true)
    })

    test('should redirect to /menu and log error when dispatch is rejected', async () => {
      // eslint-disable-next-line no-underscore-dangle
      global.__SERVER__ = true
      store = {
        basket: Immutable.Map({
          stepsOrder: Immutable.List(),
          previewOrderId: '1056',
        }),
        menuBoxPrices: Immutable.Map({ 2: {} }),
        menuCutoffUntil: '2019-02-22T11:59:59+00:00',
        error: Immutable.Map({
          BASKET_PREVIEW_ORDER_CHANGE: false,
        }),
        boxSummaryDeliveryDays: {},
      }
      getState = jest.fn().mockReturnValue(store)
      dispatch.mockImplementationOnce(() => Promise.resolve())
      dispatch.mockImplementation(() => Promise.reject(new Error('something went wrong')))

      await Checkout.fetchData({
        store: {
          dispatch,
          getState,
        },
        query: { steps: 'account,payment,delivery' },
        params: { stepName: '' },
      })

      expect(logger.error).toHaveBeenCalled()
      expect(redirect).toHaveBeenCalledWith('/menu', true)
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
        store: context.store,
        query: { query: true },
        params: { params: true },
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
            wrapper.setProps({ params: { stepName: 'account' } })
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
    const steps = ['account', 'delivery', 'payment']

    beforeEach(() => {
      instance = wrapper.instance()
      wrapper.setProps({
        browser: 'mobile',
      })
    })

    describe('when current step is not the last one', () => {
      test('then should return next step', () => {
        currentStep = 'account'
        expect(instance.getNextStep(steps, currentStep)).toEqual('delivery')
        currentStep = 'delivery'
        expect(instance.getNextStep(steps, currentStep)).toEqual('payment')
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
    const currentStep = 'account'
    const steps = ['account', 'delivery', 'payment']

    beforeEach(() => {
      wrapper.setProps({
        checkoutStepIndexReached,
        trackSignupStep,
      })

      wrapper.instance().onStepChange(steps, currentStep)()
    })

    test('then the correct sequence of actions is dispatched', () => {
      expect(trackSignupStep).toHaveBeenCalledWith('delivery')

      expect(checkoutStepIndexReached).toHaveBeenCalledWith(1)

      expect(redirect).toHaveBeenCalledWith('/check-out/delivery')
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

  describe('getStepMapping', () => {
    describe('given isPaymentBeforeChoosingEnabled feature flag', () => {
      describe('when isPaymentBeforeChoosingEnabled is false', () => {
        beforeEach(() => {
          wrapper.setProps({
            isPaymentBeforeChoosingEnabled: false,
          })
        })

        test('then should return default step mapping', () => {
          const expected = {
            account: {
              humanName: 'Account',
              component: expect.any(Function),
            },
            delivery: {
              humanName: 'Delivery',
              component: expect.any(Function),
            },
            payment: {
              humanName: 'Payment',
              component: expect.any(Function),
            },
          }
          expect(wrapper.instance().getStepMapping()).toEqual(expect.objectContaining(expected))
        })
      })

      describe('and when isPaymentBeforeChoosingEnabled is true', () => {
        test('then should add new recipes step to-and-return step mapping', () => {
          const expected = {
            account: {
              humanName: 'Account',
              component: expect.any(Function),
            },
            delivery: {
              humanName: 'Delivery',
              component: expect.any(Function),
            },
            payment: {
              humanName: 'Payment',
              component: expect.any(Function),
            },
            recipes: {
              humanName: 'Recipes',
              component: <div />,
            },
          }
          wrapper.setProps({
            isPaymentBeforeChoosingEnabled: true,
          })
          expect(wrapper.instance().getStepMapping()).toEqual(expect.objectContaining(expected))
        })
      })
    })
  })

  describe('getNextStepName', () => {
    const steps = ['account', 'delivery', 'payment']

    describe('given checkout steps and feature flag', () => {
      describe('when isPaymentBeforeChoosingEnabled is false', () => {
        beforeEach(() => {
          wrapper.setProps({
            isPaymentBeforeChoosingEnabled: false,
          })
        })

        test('then should return default next step name', () => {
          const spy = jest.spyOn(wrapper.instance(), 'getStepMapping')
          wrapper.instance().getNextStep = jest.fn()
          const getNextStepMock = wrapper
            .instance()
            .getNextStep.mockImplementationOnce(() => 'payment')
          expect(wrapper.instance().getNextStepName(steps, 'currentStep')).toBe('Payment')
          expect(getNextStepMock).toHaveBeenCalledWith(steps, 'currentStep')
          expect(spy).toHaveBeenCalled()
        })
      })

      describe('when isPaymentBeforeChoosingEnabled is true', () => {
        beforeEach(() => {
          wrapper.setProps({
            isPaymentBeforeChoosingEnabled: true,
          })
        })

        test('then should return default next step name', () => {
          const spy = jest.spyOn(wrapper.instance(), 'getStepMapping')
          wrapper.instance().getNextStep = jest.fn()
          const getNextStepMock = wrapper
            .instance()
            .getNextStep.mockImplementationOnce(() => 'recipes')
          expect(wrapper.instance().getNextStepName(steps, 'currentStep')).toBe('Recipes')
          expect(getNextStepMock).toHaveBeenCalledWith(steps, 'currentStep')
          expect(spy).toHaveBeenCalled()
        })
      })
    })
  })
})
