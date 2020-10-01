import React from 'react'
import { shallow } from 'enzyme'

import { PaymentMethod } from 'config/signup'
import SubmitButton from 'routes/Checkout/Components/SubmitButton'
import { PaymentHeader } from 'routes/Checkout/Components/PaymentHeader'
import { Checkout3DSModal } from '../Checkout3DSModal'
import { CheckoutPayment } from '../CheckoutPayment'
import { CheckoutCardDetails } from '../CheckoutCardDetails'
import { CheckoutPaypalDetails } from '../CheckoutPaypalDetails'
import { PaymentMethodSelector } from '../PaymentMethodSelector'
import BoxDetails from '../../BoxDetails'
import Summary from '../../Summary'

describe('CheckoutPayment', () => {
  let wrapper

  const trackingOrderPlaceAttempt = jest.fn()
  const trackingOrderPlaceAttemptFailed = jest.fn()
  const trackingOrderPlaceAttemptSucceeded = jest.fn()
  const touch = jest.fn()
  const submit = jest.fn()
  const setCurrentPaymentMethod = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <CheckoutPayment
        trackingOrderPlaceAttempt={trackingOrderPlaceAttempt}
        trackingOrderPlaceAttemptFailed={trackingOrderPlaceAttemptFailed}
        trackingOrderPlaceAttemptSucceeded={trackingOrderPlaceAttemptSucceeded}
        touch={touch}
        submit={submit}
        currentPaymentMethod={PaymentMethod.Unchosen}
        setCurrentPaymentMethod={setCurrentPaymentMethod}
      />
    )
  })

  afterEach(() => {
    trackingOrderPlaceAttempt.mockClear()
    trackingOrderPlaceAttemptFailed.mockClear()
    trackingOrderPlaceAttemptSucceeded.mockClear()
    touch.mockClear()
    submit.mockClear()
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
    test('should render a PaymentHeader', () => {
      expect(wrapper.find(PaymentHeader)).toHaveLength(1)
    })

    test('should render CheckoutCardDetails', () => {
      expect(wrapper.find(CheckoutCardDetails)).toHaveLength(1)
      expect(wrapper.find(CheckoutCardDetails).prop('prerender')).toBe(false)
    })

    test('should render a SubmitButton', () => {
      expect(wrapper.find(SubmitButton)).toHaveLength(1)
    })

    test('should render BoxDetails and Summary if view is mobile', () => {
      wrapper = shallow(
        <CheckoutPayment
          trackingOrderPlaceAttempt={trackingOrderPlaceAttempt}
          trackingOrderPlaceAttemptFailed={trackingOrderPlaceAttemptFailed}
          trackingOrderPlaceAttemptSucceeded={trackingOrderPlaceAttemptSucceeded}
          touch={touch}
          submit={submit}
          browser="mobile"
        />
      )
      expect(wrapper.find(BoxDetails)).toHaveLength(1)
      expect(wrapper.find(Summary)).toHaveLength(1)
    })

    test('should NOT render BoxDetails and Summary if view is desktop', () => {
      wrapper = shallow(
        <CheckoutPayment
          trackingOrderPlaceAttempt={trackingOrderPlaceAttempt}
          trackingOrderPlaceAttemptFailed={trackingOrderPlaceAttemptFailed}
          trackingOrderPlaceAttemptSucceeded={trackingOrderPlaceAttemptSucceeded}
          touch={touch}
          submit={submit}
          browser="desktop"
        />
      )
      expect(wrapper.find(BoxDetails)).toHaveLength(0)
      expect(wrapper.find(Summary)).toHaveLength(0)
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
        }
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

  describe('when 3DS is enabled', () => {
    beforeEach(() => {
      wrapper = shallow(
        <CheckoutPayment
          is3DSEnabled
          submit={submit}
        />
      )
    })

    test('should render 3DS modal', () => {
      expect(wrapper.find(Checkout3DSModal).exists()).toBe(true)
    })
  })

  describe('when 3DS is disabled', () => {
    beforeEach(() => {
      wrapper = shallow(
        <CheckoutPayment
          is3DSEnabled={false}
          submit={submit}
        />
      )
    })

    test('should not render 3DS modal', () => {
      expect(wrapper.find(Checkout3DSModal).exists()).toBe(false)
    })
  })

  describe('when isPayWithPaypalEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isPayWithPaypalEnabled: true })
    })

    test('then it should render selector instead of the usual header, and details for both payment methods', () => {
      expect(wrapper.find(PaymentHeader)).toHaveLength(0)

      expect(wrapper.find(PaymentMethodSelector)).toHaveLength(1)

      expect(wrapper.find(CheckoutCardDetails)).toHaveLength(1)
      expect(wrapper.find(CheckoutCardDetails).prop('hide')).toBeTruthy()

      expect(wrapper.find(CheckoutPaypalDetails)).toHaveLength(1)
      expect(wrapper.find(CheckoutPaypalDetails).prop('hide')).toBeTruthy()
    })

    describe('and when Card method is selected', () => {
      beforeEach(() => {
        wrapper.setProps({ currentPaymentMethod: PaymentMethod.Card })
      })

      test('then it should show the Card details and hide Paypal details', () => {
        expect(wrapper.find(CheckoutCardDetails).prop('hide')).toBeFalsy()
        expect(wrapper.find(CheckoutPaypalDetails).prop('hide')).toBeTruthy()
      })
    })

    describe('and when Paypal method is selected', () => {
      beforeEach(() => {
        wrapper.setProps({ currentPaymentMethod: PaymentMethod.Paypal })
      })

      test('then it should hide the Card details and show Paypal details', () => {
        expect(wrapper.find(CheckoutCardDetails).prop('hide')).toBeTruthy()
        expect(wrapper.find(CheckoutPaypalDetails).prop('hide')).toBeFalsy()
      })
    })

    describe('and when PaymentMethodSelector reports a new selected method', () => {
      test('to Card: then it should be set as current', () => {
        wrapper.find(PaymentMethodSelector).prop('onPaymentMethodChanged')(PaymentMethod.Card)
        expect(setCurrentPaymentMethod).toHaveBeenCalledWith(PaymentMethod.Card)
      })

      test('to PayPal: then it should be set as current', () => {
        wrapper.find(PaymentMethodSelector).prop('onPaymentMethodChanged')(PaymentMethod.Paypal)
        expect(setCurrentPaymentMethod).toHaveBeenCalledWith(PaymentMethod.Paypal)
      })
    })
  })
})
