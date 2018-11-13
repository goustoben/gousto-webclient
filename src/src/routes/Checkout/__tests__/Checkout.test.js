import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import config from 'config/routes'
import Checkout from 'routes/Checkout/Checkout'
import Summary from 'routes/Checkout/Components/Summary'
import { Div } from 'Page/Elements'
import BoxDetails from 'routes/Checkout/Components/BoxDetails'
import ProgressBar from 'ProgressBar'

import { menuLoadDays, boxSummaryDeliveryDaysLoad, checkoutCreatePreviewOrder, basketStepsOrderReceive, basketProceedToCheckout, menuLoadBoxPrices, pricingRequest, redirect, replace } from 'actions'

jest.mock('actions', () => ({
  replace: jest.fn().mockReturnValue(Promise.resolve()),
  redirect: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadDays: jest.fn().mockReturnValue(Promise.resolve()),
  pricingRequest: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadBoxPrices: jest.fn().mockReturnValue(Promise.resolve()),
  checkoutFetchIntervals: jest.fn().mockReturnValue(Promise.resolve()),
  basketStepsOrderReceive: jest.fn().mockReturnValue(Promise.resolve()),
  basketProceedToCheckout: jest.fn().mockReturnValue(Promise.resolve()),
  boxSummaryDeliveryDaysLoad: jest.fn().mockReturnValue(Promise.resolve()),
  checkoutCreatePreviewOrder: jest.fn().mockReturnValue(Promise.resolve()),
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
      stepsOrder: Immutable.List(['boxdetails', 'summary', 'aboutyou', 'payment', 'delivery']),
      recipes: Immutable.Map({}),
      request: Immutable.Map({
        browser: 'mobile',
      }),
      error: Immutable.Map({}),
    }

    getState = jest.fn().mockReturnValue(store)
    subscribe = jest.fn().mockReturnValue(Promise.resolve())
    dispatch = jest.fn().mockReturnValue(Promise.resolve())

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
    menuLoadDays.mockClear()
    pricingRequest.mockClear()
    menuLoadBoxPrices.mockClear()
    basketStepsOrderReceive.mockClear()
    basketProceedToCheckout.mockClear()
    boxSummaryDeliveryDaysLoad.mockClear()
    checkoutCreatePreviewOrder.mockClear()
  })

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<Checkout trackSignupStep={jest.fn()}/>,
        { context })
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

    test('should render 1 <BoxDetails> component(s)', () => {
      expect(wrapper.find(BoxDetails)).toHaveLength(1)
    })
  })

  describe('fetchData', () => {
    test('should dispatch menuLoadDays, boxSummaryDeliveryDaysLoad, checkoutCreatePreviewOrder, basketStepsOrderReceive, pricingRequest', async () => {
      await Checkout.fetchData({
        store: context.store,
        query: { steps: 'boxdetails,aboutyou,payment,delivery' },
        params: { stepName: '' },
      })
      expect(dispatch).toHaveBeenCalled()
      expect(menuLoadDays).toHaveBeenCalledTimes(2)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(1)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(1)
      expect(pricingRequest).toHaveBeenCalledTimes(1)
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

      expect(dispatch).toHaveBeenCalled()
      expect(menuLoadDays).toHaveBeenCalledTimes(1)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(1)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(1)
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
            message:
							'Item(s) out of stock: {"3":"Umbrian Wild Boar Salami Ragu with Ling"}',
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

      expect(dispatch.mock.calls.length).toBeGreaterThan(4)
      expect(menuLoadDays).toHaveBeenCalledTimes(1)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(1)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(1)
      expect(redirect).toHaveBeenCalledWith(
        '/menu?from=newcheckout&error=no-stock',
        true,
      )
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

      expect(dispatch.mock.calls.length).toBeGreaterThan(4)
      expect(menuLoadDays).toHaveBeenCalledTimes(1)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(1)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(1)
      expect(redirect).toHaveBeenCalledWith(
        '/menu?from=newcheckout&error=basket-expired',
        true,
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

      expect(dispatch.mock.calls.length).toBeGreaterThan(4)
      expect(menuLoadDays).toHaveBeenCalledTimes(1)
      expect(boxSummaryDeliveryDaysLoad).toHaveBeenCalledTimes(1)
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledTimes(1)
      expect(redirect).toHaveBeenCalledWith(
        '/menu?from=newcheckout&error=undefined-error',
        true,
      )
    })
  })

  describe('componentDidMount', () => {
    beforeEach(() => {
      fetchData = Checkout.fetchData = jest.fn().mockReturnValue(Promise.resolve())
      wrapper = mount(
				<Checkout query={{ query: true }} params={{ params: true }} trackSignupStep={jest.fn()} />,
				{ context },
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
      await wrapper.instance().componentWillReceiveProps({ tariffId: 2 })
      expect(loadPrices).toHaveBeenCalledTimes(1)
    })
  })

  describe('should render checkoutPayment component', () => {
    test('should render checkoutPayment component', () => {
      wrapper = shallow(
        <Checkout
          params={{ stepName: 'payment' }}
          checkoutPayment
          checkoutLanding={onCheckoutSpy}
          trackSignupStep={jest.fn()}
        />,
        { context }
      )
      const paymentComponent = wrapper.instance().desktopStepMapping.payment.component()
      expect(paymentComponent.props.children).toBe('CheckoutPayment')
    })
  })
})
