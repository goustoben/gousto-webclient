import React from 'react'
import { shallow } from 'enzyme'

import SubmitButton from 'routes/Checkout/Components/SubmitButton'
import { PaymentHeader } from 'routes/Checkout/Components/PaymentHeader'
import { CheckoutName } from 'routes/Checkout/Components/CheckoutPayment/CheckoutName'
import { CheckoutFrame } from 'routes/Checkout/Components/CheckoutPayment/CheckoutFrame'
import { CheckoutAddress } from 'routes/Checkout/Components/CheckoutPayment/CheckoutAddress'

import { CheckoutPayment } from 'routes/Checkout/Components/CheckoutPayment/CheckoutPayment'
import BoxDetails from '../../BoxDetails'
import Summary from '../../Summary'

describe('CheckoutPayment', () => {
  let wrapper

  const trackingOrderPlaceAttempt = jest.fn()
  const trackingOrderPlaceAttemptFailed = jest.fn()
  const trackingOrderPlaceAttemptSucceeded = jest.fn()
  const touch = jest.fn()
  const submit = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <CheckoutPayment
        trackingOrderPlaceAttempt={trackingOrderPlaceAttempt}
        trackingOrderPlaceAttemptFailed={trackingOrderPlaceAttemptFailed}
        trackingOrderPlaceAttemptSucceeded={trackingOrderPlaceAttemptSucceeded}
        touch={touch}
        submit={submit}
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
      wrapper.setProps({ 'prerender': true })
    })

    test('should not render Payment Form Sections', () => {
      expect(wrapper.find(CheckoutAddress)).toHaveLength(0)
      expect(wrapper.find(CheckoutName)).toHaveLength(0)
      expect(wrapper.find(SubmitButton)).toHaveLength(0)
    })

    test('should render a CheckoutFrame', () => {
      expect(wrapper.find(CheckoutFrame)).toHaveLength(1)
    })

    test('should render the component as hidden', () => {
      expect(wrapper.find('div').first().hasClass('hide')).toBe(true)
    })
  })

  describe('rendering', () => {
    test('should render a PaymentHeader', () => {
      expect(wrapper.find(PaymentHeader)).toHaveLength(1)
    })

    test('should render a CheckoutFrame', () => {
      expect(wrapper.find(CheckoutFrame)).toHaveLength(1)
    })

    test('should render a CheckoutName', () => {
      expect(wrapper.find(CheckoutName)).toHaveLength(1)
    })

    test('should render a CheckoutAddress', () => {
      expect(wrapper.find(CheckoutAddress)).toHaveLength(1)
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
          browser={'mobile'}
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
          browser={'desktop'}
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
      const cardTokenReady = wrapper.find(CheckoutFrame).prop('cardTokenReady')

      cardTokenReady()

      expect(submit).toHaveBeenCalled()
    })
  })
})
