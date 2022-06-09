import React from 'react'

import { shallow } from 'enzyme'
import { useDispatch, useSelector } from 'react-redux'

import { PaymentMethod } from 'config/signup'
import { SubmitButton } from 'routes/Checkout/Components/SubmitButton'

import { ErrorMessage } from '../../ErrorMessage'
import { Checkout3DSModal } from '../Checkout3DSModal'
import { CheckoutCardDetails } from '../CheckoutCardDetails'
import { CheckoutPayPalDetailsContainer } from '../CheckoutPayPalDetails'
import { CheckoutPayment } from '../CheckoutPayment'
import { PaymentMethodSelector } from '../PaymentMethodSelector'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

describe('CheckoutPayment', () => {
  let wrapper

  const trackingOrderPlaceAttempt = jest.fn()
  const trackingOrderPlaceAttemptFailed = jest.fn()
  const trackingOrderPlaceAttemptSucceeded = jest.fn()
  const touch = jest.fn()
  const submit = jest.fn()
  const submitOrder = jest.fn()
  const setCurrentPaymentMethod = jest.fn()

  beforeEach(() => {
    useSelector.mockReturnValue(true)
    useDispatch.mockReturnValue(() => {})
    wrapper = shallow(
      <CheckoutPayment
        trackingOrderPlaceAttempt={trackingOrderPlaceAttempt}
        trackingOrderPlaceAttemptFailed={trackingOrderPlaceAttemptFailed}
        trackingOrderPlaceAttemptSucceeded={trackingOrderPlaceAttemptSucceeded}
        touch={touch}
        submit={submit}
        currentPaymentMethod={PaymentMethod.Card}
        setCurrentPaymentMethod={setCurrentPaymentMethod}
        submitOrder={submitOrder}
      />,
    )
  })

  afterEach(() => {
    trackingOrderPlaceAttempt.mockClear()
    trackingOrderPlaceAttemptFailed.mockClear()
    trackingOrderPlaceAttemptSucceeded.mockClear()
    touch.mockClear()
    submit.mockClear()
    submitOrder.mockClear()
  })

  describe('prerendering', () => {
    beforeEach(() => {
      wrapper.setProps({ prerender: true })
    })

    test('should render CheckoutCardDetails', () => {
      expect(wrapper.find(CheckoutCardDetails)).toHaveLength(1)
    })

    test('should render the component as hidden', () => {
      expect(wrapper.find('div').first().hasClass('hide')).toBe(true)
    })
  })

  describe('rendering', () => {
    test('should render a CheckoutPayPalDetailsContainer', () => {
      expect(wrapper.find(CheckoutPayPalDetailsContainer)).toHaveLength(1)
      expect(wrapper.find(CheckoutPayPalDetailsContainer).prop('hide')).toBeTruthy()
    })

    test('should render CheckoutCardDetails', () => {
      expect(wrapper.find(CheckoutCardDetails)).toHaveLength(1)
    })

    test('should render an <ErrorMessage>', () => {
      expect(wrapper.find(ErrorMessage).exists()).toBeTruthy()
    })

    test('should render a SubmitButton', () => {
      expect(wrapper.find(SubmitButton)).toHaveLength(1)
    })
  })

  describe('user clicks on submit button', () => {
    test('should call trackingOrderPlaceAttempt prop', () => {
      wrapper.find(SubmitButton).simulate('click')

      expect(trackingOrderPlaceAttempt).toHaveBeenCalled()
    })

    describe('when form is valid', () => {
      beforeEach(() => {
        wrapper.setProps({ formErrors: {} })
      })

      test('should set isSubmitCardEnabled prop to true', () => {
        expect(wrapper.find(CheckoutCardDetails).prop('isSubmitCardEnabled')).toBe(false)

        wrapper.find(SubmitButton).simulate('click')

        expect(wrapper.find(CheckoutCardDetails).prop('isSubmitCardEnabled')).toBe(true)
      })

      test('should call trackingOrderPlaceAttemptSucceeded prop', () => {
        wrapper.find(SubmitButton).simulate('click')

        expect(trackingOrderPlaceAttemptSucceeded).toHaveBeenCalled()
      })
    })

    describe('when form errors do have error', () => {
      const formErrors = {
        payment: {
          cardName: 'Card name is required',
          town: 'Town is required',
        },
      }
      const sectionName = 'payment'
      const formName = 'payment'

      beforeEach(() => {
        wrapper.setProps({ formErrors, sectionName, formName })
      })

      test('should call touch for correct fields', () => {
        wrapper.find(SubmitButton).simulate('click')

        expect(touch.mock.calls.length).toBe(2)
        expect(touch.mock.calls[0][0]).toBe(formName)
        expect(touch.mock.calls[0][1]).toBe('payment[cardName]')
        expect(touch.mock.calls[1][0]).toBe(formName)
        expect(touch.mock.calls[1][1]).toBe('payment[town]')
      })

      test('should call trackingOrderPlaceAttemptFailed prop', () => {
        wrapper.find(SubmitButton).simulate('click')

        expect(trackingOrderPlaceAttemptFailed).toHaveBeenCalledWith()
      })
    })

    describe('when PayPal payment method selected', () => {
      beforeEach(() => {
        wrapper.setProps({
          currentPaymentMethod: PaymentMethod.PayPal,
          isPayPalReady: true,
        })
        wrapper.find(SubmitButton).simulate('click')
      })
      test('should call trackingOrderPlaceAttemptSucceeded prop', () => {
        expect(trackingOrderPlaceAttemptSucceeded).toHaveBeenCalled()
      })

      test('should call submitOrder prop', () => {
        expect(submitOrder).toHaveBeenCalled()
      })
    })
  })

  describe('cardTokenReady', () => {
    test('should call props.submit', () => {
      const cardTokenReady = wrapper.find(CheckoutCardDetails).prop('cardTokenReady')

      cardTokenReady()

      expect(submit).toHaveBeenCalled()
    })
  })

  describe('when Card method is selected', () => {
    beforeEach(() => {
      wrapper.setProps({ currentPaymentMethod: PaymentMethod.Card })
    })

    test('then it should show the Card details and hide PayPal details', () => {
      expect(wrapper.find(CheckoutCardDetails).prop('hide')).toBeFalsy()
      expect(wrapper.find(CheckoutPayPalDetailsContainer).prop('hide')).toBeTruthy()
    })

    test('should render 3DS modal', () => {
      expect(wrapper.find(Checkout3DSModal).exists()).toBe(true)
    })
  })

  describe('when PayPal method is selected', () => {
    beforeEach(() => {
      wrapper.setProps({ currentPaymentMethod: PaymentMethod.PayPal })
    })

    test('then it should hide the Card details and show PayPal details', () => {
      expect(wrapper.find(CheckoutCardDetails).prop('hide')).toBeTruthy()
      expect(wrapper.find(CheckoutPayPalDetailsContainer).prop('hide')).toBeFalsy()
    })
  })

  describe('and when PaymentMethodSelector reports a new selected method', () => {
    test('to Card: then it should be set as current', () => {
      wrapper.find(PaymentMethodSelector).prop('setCurrentPaymentMethod')(PaymentMethod.Card)
      expect(setCurrentPaymentMethod).toHaveBeenCalledWith(PaymentMethod.Card)
    })

    test('to PayPal: then it should be set as current', () => {
      wrapper.find(PaymentMethodSelector).prop('setCurrentPaymentMethod')(PaymentMethod.PayPal)
      expect(setCurrentPaymentMethod).toHaveBeenCalledWith(PaymentMethod.PayPal)
    })
  })

  describe('when isGoustoOnDemandEnabled is enabled', () => {
    beforeEach(() => {
      wrapper.setProps({
        isGoustoOnDemandEnabled: true,
      })
    })

    test('then SubscriptionTransparency should not be rendered', () => {
      expect(wrapper.find('SubscriptionTransparency').exists()).toBeFalsy()
    })
  })
})
