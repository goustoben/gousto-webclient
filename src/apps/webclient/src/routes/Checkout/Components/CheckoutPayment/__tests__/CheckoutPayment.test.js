import React from 'react'
import { shallow } from 'enzyme'

import { PaymentMethod } from 'config/signup'
import { SubmitButton } from 'routes/Checkout/Components/SubmitButton'
import { Checkout3DSModal } from '../Checkout3DSModal'
import { CheckoutPayment } from '../CheckoutPayment'
import { CheckoutCardDetails } from '../CheckoutCardDetails'
import { CheckoutPayPalDetailsWrapper } from '../CheckoutPayPalDetails'
import { PaymentMethodSelector } from '../PaymentMethodSelector'
import { ErrorMessage } from '../../ErrorMessage'

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
      />
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
      expect(wrapper.find(CheckoutCardDetails).prop('prerender')).toBe(true)
    })

    test('should render the component as hidden', () => {
      expect(wrapper.find('div').first().hasClass('hide')).toBe(true)
    })
  })

  describe('rendering', () => {
    test('should render a CheckoutPayPalDetailsWrapper', () => {
      expect(wrapper.find(CheckoutPayPalDetailsWrapper)).toHaveLength(1)
      expect(wrapper.find(CheckoutPayPalDetailsWrapper).prop('hide')).toBeTruthy()
    })

    test('should render CheckoutCardDetails', () => {
      expect(wrapper.find(CheckoutCardDetails)).toHaveLength(1)
      expect(wrapper.find(CheckoutCardDetails).prop('prerender')).toBe(false)
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
        expect(wrapper.state().isSubmitCardEnabled).toBe(false)

        wrapper.find(SubmitButton).simulate('click')

        expect(wrapper.state().isSubmitCardEnabled).toBe(true)
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
        })
        wrapper.instance().handleClick()
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

  describe('when CheckoutCardDetails asks to disable card submission', () => {
    test('then it should disable submission', () => {
      wrapper.find(CheckoutCardDetails).prop('disableCardSubmission')()

      expect(wrapper.state('isSubmitCardEnabled')).toBe(false)
    })
  })

  describe('when Card method is selected', () => {
    beforeEach(() => {
      wrapper.setProps({ currentPaymentMethod: PaymentMethod.Card })
    })

    test('then it should show the Card details and hide PayPal details', () => {
      expect(wrapper.find(CheckoutCardDetails).prop('hide')).toBeFalsy()
      expect(wrapper.find(CheckoutPayPalDetailsWrapper).prop('hide')).toBeTruthy()
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
      expect(wrapper.find(CheckoutPayPalDetailsWrapper).prop('hide')).toBeFalsy()
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

  describe('when handleFramesValidationChanged is called', () => {
    beforeEach(() => {
      wrapper.instance().handleFramesValidationChanged(true)
    })

    test('then framesFieldsAreValid should be changed', () => {
      expect(wrapper.state().framesFieldsAreValid).toBeTruthy()
    })
  })

  describe('when handleRecaptchaChange is called', () => {
    const processSignup = jest.fn()
    const storeSignupRecaptchaToken = jest.fn()

    describe('and value is null', () => {
      beforeEach(() => {
        wrapper.setProps({ storeSignupRecaptchaToken })
        wrapper.instance().processSignup = processSignup
        wrapper.instance().handleRecaptchaChange(null)
      })

      test('then processSignup should not be called', () => {
        expect(storeSignupRecaptchaToken).toHaveBeenCalled()
        expect(wrapper.instance().processSignup).not.toHaveBeenCalled()
      })
    })

    describe('and value is defined', () => {
      beforeEach(() => {
        wrapper.setProps({ storeSignupRecaptchaToken })
        wrapper.instance().processSignup = processSignup
        wrapper.instance().handleRecaptchaChange('value')
      })

      test('then storeSignupRecaptchaToken and processSignup are called', () => {
        expect(storeSignupRecaptchaToken).toHaveBeenCalled()
        expect(processSignup).toHaveBeenCalled()
      })
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
