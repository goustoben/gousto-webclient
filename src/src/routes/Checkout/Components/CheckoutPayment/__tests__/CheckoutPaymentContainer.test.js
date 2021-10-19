import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { CheckoutPaymentContainer, mapStateToProps } from '../CheckoutPaymentContainer'

describe('CheckoutPaymentContainer', () => {
  let wrapper

  const initialState = {
    auth: Immutable.fromJS({
      isRecaptchaEnabled: true,
      recaptcha: {
        signupToken: 'token',
      },
    }),
    pricing: Immutable.fromJS({
      prices: {
        total: '5.56',
      },
    }),
    pending: Immutable.fromJS({}),
    basket: Immutable.fromJS({}),
    features: Immutable.fromJS({
      isPaymentBeforeChoosingEnabled: {
        value: false,
      },
      isGoustoOnDemandEnabled: {
        value: false,
      },
    }),
    form: {
      payment: {},
    },
    payment: Immutable.fromJS({
      paymentMethod: 'Card',
    }),
  }

  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<CheckoutPaymentContainer store={store} />, {
      context: store,
    })
  })

  test('should be rendered properly', () => {
    const expected = {
      initialValues: { payment: { cardName: '', isBillingAddressDifferent: false } },
      sectionName: 'payment',
    }
    expect(wrapper.props()).toEqual(expect.objectContaining(expected))
  })

  describe('when mapStateToProps is invoked', () => {
    let output

    beforeEach(() => {
      output = mapStateToProps(store.getState())
    })

    test('then proper parameters should be returned', () => {
      const expected = {
        isGoustoOnDemandEnabled: false,
        isFreeBox: false,
        isRecaptchaEnabled: true,
        recaptchaValue: 'token',
        hotjarTriggerName: 'psd2_modal',
        ribbonTriggerName: 'control_payment',
        sectionName: 'payment',
        isPayPalReady: false,
        formErrors: {},
        currentPaymentMethod: 'Card',
      }
      expect(output).toEqual(expect.objectContaining(expected))
    })
  })
})
