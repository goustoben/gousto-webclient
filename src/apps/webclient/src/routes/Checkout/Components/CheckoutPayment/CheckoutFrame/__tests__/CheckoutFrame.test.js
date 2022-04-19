import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { actionTypes } from 'actions/actionTypes'
import { CheckoutFrame } from '../CheckoutFrame'
import { CheckoutFrameContainer } from '../CheckoutFrameContainer'

jest.mock('utils/isomorphicEnvironment', () => ({
  ...jest.requireActual('utils/isomorphicEnvironment'),
  getEnvironment: () => 'local',
  getCheckoutComPublicKey: () => 'checkout-com-public-key',
}))

describe('CheckoutFrame', () => {
  let wrapper
  let Frames
  const change = jest.fn()
  const cardTokenReady = jest.fn()
  const fireCheckoutError = jest.fn()
  const fireCheckoutPendingEvent = jest.fn()
  const trackingCardTokenizationSuccessfully = jest.fn()
  const trackingCardTokenizationFailed = jest.fn()
  const disableCardSubmission = jest.fn()
  const cardholderGetter = jest.fn()
  const cardholderSetter = jest.fn()
  const trackFailedCheckoutFlow = jest.fn()

  beforeEach(() => {
    Frames = {
      init: jest.fn(),
      submitCard: jest.fn(() => Promise.resolve({})),
      addCardToken: jest.fn(),
      enableSubmitForm: jest.fn(),
    }

    Object.defineProperty(Frames, 'cardholder', {
      get: cardholderGetter,
      set: cardholderSetter,
    })

    global.Frames = Frames
  })

  afterEach(() => {
    change.mockClear()
    cardTokenReady.mockClear()
    fireCheckoutError.mockClear()
    fireCheckoutPendingEvent.mockClear()
    trackingCardTokenizationSuccessfully.mockClear()
    trackingCardTokenizationFailed.mockClear()
    disableCardSubmission.mockClear()
    cardholderGetter.mockClear()
    cardholderSetter.mockClear()
    trackFailedCheckoutFlow.mockClear()

    delete global.Frames
  })

  describe('checkout.com script is not ready', () => {
    describe('when component mounted', () => {
      beforeEach(() => {
        wrapper = shallow(<CheckoutFrame />)
      })

      test('then Frames should not be initialized', () => {
        expect(Frames.init).not.toHaveBeenCalled()
      })
    })
  })

  describe('checkout.com script loaded', () => {
    describe('when component mounted', () => {
      beforeEach(() => {
        wrapper = shallow(<CheckoutFrame checkoutScriptReady />)
      })

      describe('then checkout.com Frames should be initialized', () => {
        test('with the correct public key', () => {
          const expected = {
            publicKey: 'checkout-com-public-key',
          }

          expect(Frames.init).toHaveBeenCalledWith(expect.objectContaining(expected))
        })

        test('with the correct frames selectors', () => {
          const expected = {
            cardNumber: {
              frameSelector: '[data-frames="cardNumber"]',
            },
            expiryDate: {
              frameSelector: '[data-frames="expiryDate"]',
            },
            cvv: {
              frameSelector: '[data-frames="cvv"]',
            },
          }

          expect(Frames.init).toHaveBeenCalledWith(expect.objectContaining(expected))
        })

        test('with the correct cardholder details', () => {
          const expected = {
            cardholder: {
              name: expect.any(String),
              billingAddress: {
                addressLine1: expect.any(String),
                addressLine2: expect.any(String),
                city: expect.any(String),
                zip: expect.any(String),
              },
            },
          }

          expect(Frames.init).toHaveBeenCalledWith(expect.objectContaining(expected))
        })

        test('with the correct callbacks', () => {
          const instance = wrapper.instance()
          const expected = {
            frameValidationChanged: instance.frameValidationChanged,
            cardSubmitted: instance.cardSubmitted,
            cardTokenized: instance.cardTokenized,
            cardTokenizationFailed: instance.cardTokenizationFailed,
          }

          expect(Frames.init).toHaveBeenCalledWith(expect.objectContaining(expected))
        })
      })
    })
  })

  describe('cardName prop is updated', () => {
    const testName = 'test name'

    describe('when changed', () => {
      test('then cardholder data should be updated', () => {
        const expected = {
          name: testName,
          billingAddress: {
            addressLine1: expect.any(String),
            addressLine2: expect.any(String),
            city: expect.any(String),
            zip: expect.any(String),
          },
        }

        wrapper = shallow(<CheckoutFrame checkoutScriptReady />)
        wrapper.setProps({ cardName: testName })

        expect(cardholderSetter).toHaveBeenCalledWith(expected)
      })
    })

    describe('when not changed', () => {
      test('cardholder data should not be updated', () => {
        wrapper = shallow(<CheckoutFrame checkoutScriptReady cardName={testName} />)
        wrapper.setProps({ cardName: testName })

        expect(cardholderSetter).not.toHaveBeenCalled()
      })
    })
  })

  describe('billingAddress prop is updated', () => {
    const testAddress = {
      addressLine1: '1',
      addressLine2: 'Test street',
      city: 'London',
      postcode: 'L0N D0N',
    }

    describe('when changed', () => {
      test('cardholder data should be updated', () => {
        const expected = {
          name: expect.any(String),
          billingAddress: {
            addressLine1: testAddress.addressLine1,
            addressLine2: testAddress.addressLine2,
            city: testAddress.city,
            zip: testAddress.postcode,
          },
        }

        wrapper = shallow(<CheckoutFrame checkoutScriptReady />)
        wrapper.setProps({ billingAddress: testAddress })

        expect(cardholderSetter).toHaveBeenCalledWith(expected)
      })
    })

    describe('when not changed', () => {
      test('cardholder data should not be updated', () => {
        wrapper = shallow(<CheckoutFrame checkoutScriptReady billingAddress={testAddress} />)
        wrapper.setProps({ billingAddress: testAddress })

        expect(cardholderSetter).not.toHaveBeenCalled()
      })
    })
  })

  describe('hasCheckoutError prop is updated', () => {
    const hasCheckoutError = true

    describe('when value is true', () => {
      test('should call Frames.enableSubmitForm()', () => {
        wrapper = shallow(<CheckoutFrame checkoutScriptReady />)
        wrapper.setProps({ hasCheckoutError })

        expect(Frames.enableSubmitForm).toHaveBeenCalled()
      })
    })

    describe('when value is false', () => {
      test('should not call Frames.enableSubmitForm()', () => {
        wrapper = shallow(<CheckoutFrame checkoutScriptReady />)
        wrapper.setProps({ hasCheckoutError: false })

        expect(Frames.enableSubmitForm).not.toHaveBeenCalled()
      })
    })

    describe('when value is true and not changed', () => {
      test('should not call Frames.enableSubmitForm()', () => {
        wrapper = shallow(<CheckoutFrame checkoutScriptReady hasCheckoutError={hasCheckoutError} />)
        wrapper.setProps({ hasCheckoutError })

        expect(Frames.enableSubmitForm).not.toHaveBeenCalled()
      })
    })
  })

  describe('isSubmitCardEnabled prop is updated', () => {
    describe('when changed', () => {
      test('should submit card details', () => {
        const submitCard = jest.fn()
        wrapper = shallow(<CheckoutFrame checkoutScriptReady />)
        wrapper.instance().submitCard = submitCard

        wrapper.setProps({ isSubmitCardEnabled: true })

        expect(submitCard).toHaveBeenCalled()
      })
    })

    describe('when not changed', () => {
      test('should not submit card details', () => {
        const submitCard = jest.fn()
        wrapper = shallow(<CheckoutFrame checkoutScriptReady isSubmitCardEnabled />)
        wrapper.instance().submitCard = submitCard

        wrapper.setProps({ isSubmitCardEnabled: true })

        expect(submitCard).not.toHaveBeenCalled()
      })
    })
  })

  describe('Frames defined', () => {
    describe('when component unmounted', () => {
      const reloadCheckoutScript = jest.fn()

      beforeEach(() => {
        wrapper = shallow(<CheckoutFrame reloadCheckoutScript={reloadCheckoutScript} />)
        wrapper.unmount()
      })

      test('should remove the global Frames reference', () => {
        expect(global.Frames).not.toBeDefined()
      })

      test('should call reloadCheckoutScript', () => {
        expect(reloadCheckoutScript).toHaveBeenCalled()
      })
    })
  })

  describe('card number frame validation changed', () => {
    describe('when card number is not valid', () => {
      test('should show card number error', () => {
        const event = {
          element: 'card-number',
          isValid: false,
        }
        wrapper = shallow(<CheckoutFrame checkoutScriptReady />)
        wrapper.instance().frameValidationChanged(event)

        expect(wrapper.instance().state.showCardNumberError).toBe(true)
      })
    })

    describe('when card number is valid', () => {
      test('should hide card number error', () => {
        const event = {
          element: 'card-number',
          isValid: true,
        }
        wrapper = shallow(<CheckoutFrame checkoutScriptReady />)
        wrapper.setState({ showCardNumberError: true })

        wrapper.instance().frameValidationChanged(event)

        expect(wrapper.instance().state.showCardNumberError).toBe(false)
      })
    })
  })

  describe('card expiry date frame validation changed', () => {
    describe('when card expiry date is not valid', () => {
      test('should show card expiry date error', () => {
        const event = {
          element: 'expiry-date',
          isValid: false,
        }

        wrapper.instance().frameValidationChanged(event)

        expect(wrapper.instance().state.showExpiryDateError).toBe(true)
      })
    })

    describe('when card expiry date is not valid', () => {
      test('should hide card expiry date error', () => {
        const event = {
          element: 'expiry-date',
          isValid: true,
        }
        wrapper.setState({ showExpiryDateError: true })

        wrapper.instance().frameValidationChanged(event)

        expect(wrapper.instance().state.showExpiryDateError).toBe(false)
      })
    })
  })

  describe('cvv frame validation changed', () => {
    describe('when cvv is not valid', () => {
      test('should show cvv error', () => {
        const event = {
          element: 'cvv',
          isValid: false,
        }

        wrapper.instance().frameValidationChanged(event)

        expect(wrapper.instance().state.showCVVError).toBe(true)
      })
    })

    describe('when cvv is not valid', () => {
      test('should hide cvv error', () => {
        const event = {
          element: 'cvv',
          isValid: true,
        }
        wrapper.setState({ showCVVError: true })

        wrapper.instance().frameValidationChanged(event)

        expect(wrapper.instance().state.showCVVError).toBe(false)
      })
    })
  })

  describe('card submitted', () => {
    describe('when any checkout errors are shown', () => {
      const checkoutClearErrors = jest.fn()

      beforeEach(() => {
        wrapper = shallow(<CheckoutFrame checkoutClearErrors={checkoutClearErrors} />)
      })

      test('should clear checkout.com errors', () => {
        wrapper.instance().cardSubmitted()

        expect(checkoutClearErrors).toHaveBeenCalled()
      })
    })
  })

  describe('card tokenized', () => {
    describe('when card token is ready', () => {
      beforeEach(() => {
        wrapper = shallow(
          <CheckoutFrame
            change={change}
            formName="payment"
            sectionName="payment"
            cardTokenReady={cardTokenReady}
            trackingCardTokenizationSuccessfully={trackingCardTokenizationSuccessfully}
            fireCheckoutPendingEvent={fireCheckoutPendingEvent}
          />
        )

        const mockEvent = {
          token: 'test-token',
        }
        wrapper.instance().cardTokenized(mockEvent)
      })

      test('should call Frames.addCardToken', () => {
        expect(Frames.addCardToken).toHaveBeenCalledWith(
          wrapper.instance().paymentForm,
          'test-token'
        )
      })

      test('should call fireCheckoutPendingEvent', () => {
        expect(fireCheckoutPendingEvent).toHaveBeenCalledWith(
          actionTypes.CHECKOUT_CARD_SUBMIT,
          false
        )
      })

      test('should call change with the correct parameters', () => {
        expect(change).toHaveBeenCalledWith('payment', 'payment.token', 'test-token')
      })

      test('should call cardTokenReady', () => {
        expect(cardTokenReady).toHaveBeenCalled()
      })

      test('should call trackingCardTokenizationSuccessfully', () => {
        expect(trackingCardTokenizationSuccessfully).toHaveBeenCalled()
      })
    })
  })

  describe('cardTokenizationFailed', () => {
    beforeEach(() => {
      wrapper = shallow(
        <CheckoutFrame
          fireCheckoutError={fireCheckoutError}
          trackingCardTokenizationFailed={trackingCardTokenizationFailed}
          trackFailedCheckoutFlow={trackFailedCheckoutFlow}
          fireCheckoutPendingEvent={fireCheckoutPendingEvent}
        />
      )
    })

    describe('when no error code in the event', () => {
      const event = {
        data: {
          errorCode: '',
          message: '',
        },
      }

      beforeEach(() => {
        wrapper.instance().cardTokenizationFailed(event)
      })

      test('should call fireCheckoutError with correct action type', () => {
        expect(fireCheckoutError).toHaveBeenCalledWith(actionTypes.NETWORK_FAILURE)
      })

      test('should call fireCheckoutPendingEvent', () => {
        expect(fireCheckoutPendingEvent).toHaveBeenCalledWith(
          actionTypes.CHECKOUT_CARD_SUBMIT,
          false
        )
      })

      test('should call trackingCardTokenizationFailed with correct error message', () => {
        expect(trackingCardTokenizationFailed).toHaveBeenCalledWith(event.data.message)
      })
    })

    describe('when error code in the event', () => {
      const event = {
        data: {
          errorCode: '82031',
          message: 'card tokenization failure',
        },
      }

      beforeEach(() => {
        wrapper.instance().cardTokenizationFailed(event)
      })

      test('should call the fireCheckoutError prop with correct action type', () => {
        expect(fireCheckoutError).toHaveBeenCalledWith(actionTypes.CARD_TOKENIZATION_FAILED)
      })

      test('should call fireCheckoutPendingEvent', () => {
        expect(fireCheckoutPendingEvent).toHaveBeenCalledWith(
          actionTypes.CHECKOUT_CARD_SUBMIT,
          false
        )
      })

      test('should call trackingCardTokenizationFailed with correct error message', () => {
        expect(trackingCardTokenizationFailed).toHaveBeenCalledWith(event.data.message)
      })

      test('should log event', () => {
        expect(trackFailedCheckoutFlow).toHaveBeenCalled()
      })
    })
  })

  describe('submit card', () => {
    beforeEach(() => {
      wrapper = shallow(
        <CheckoutFrame
          disableCardSubmission={disableCardSubmission}
          fireCheckoutError={fireCheckoutError}
          fireCheckoutPendingEvent={fireCheckoutPendingEvent}
        />
      )
    })

    describe('when submission is successful', () => {
      beforeEach(async () => {
        await wrapper.instance().submitCard()
      })

      test('should call Frames.submitCard', () => {
        expect(Frames.submitCard).toHaveBeenCalled()
      })

      test('should not call fireCheckoutError', () => {
        expect(fireCheckoutError).not.toHaveBeenCalled()
      })

      test('should call fireCheckoutPendingEvent once', () => {
        expect(fireCheckoutPendingEvent).toHaveBeenCalledWith(
          actionTypes.CHECKOUT_CARD_SUBMIT,
          true
        )
      })

      test('should call disableCardSubmission', () => {
        expect(disableCardSubmission).toHaveBeenCalled()
      })
    })

    describe('when submission is failed', () => {
      beforeEach(async () => {
        Frames.submitCard.mockClear()
        Frames.submitCard.mockRejectedValue({})

        await wrapper.instance().submitCard()
      })

      test('should call Frames.submitCard', () => {
        expect(Frames.submitCard).toHaveBeenCalled()
      })

      test('should call fireCheckoutError', () => {
        expect(fireCheckoutError).toHaveBeenCalledWith(actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED)
      })

      test('should call fireCheckoutPendingEvent twice', () => {
        expect(fireCheckoutPendingEvent).toHaveBeenCalledWith(
          actionTypes.CHECKOUT_CARD_SUBMIT,
          true
        )
        expect(fireCheckoutPendingEvent).toHaveBeenCalledWith(
          actionTypes.CHECKOUT_CARD_SUBMIT,
          false
        )
      })

      test('should call disableCardSubmission', () => {
        expect(disableCardSubmission).toHaveBeenCalled()
      })
    })
  })

  describe('when handleSubmit is called', () => {
    const onSubmitFromCardDetails = jest.fn()
    const event = { preventDefault: () => {} }

    beforeEach(() => {
      wrapper = shallow(<CheckoutFrame onSubmitFromCardDetails={onSubmitFromCardDetails} />)
      wrapper.instance().handleSubmit(event)
    })

    test('then should render correctly', () => {
      expect(onSubmitFromCardDetails).toHaveBeenCalled()
    })
  })

  describe('when handleCardValidationChanged is called', () => {
    const onFramesValidationChanged = jest.fn()
    const event = { isValid: true }

    beforeEach(() => {
      wrapper = shallow(<CheckoutFrame onFramesValidationChanged={onFramesValidationChanged} />)
      wrapper.instance().handleCardValidationChanged(event)
    })

    test('then should render correctly', () => {
      expect(onFramesValidationChanged).toHaveBeenCalled()
    })
  })

  describe('when checkoutScriptReady is changed', () => {
    const initFrames = jest.fn()

    beforeEach(() => {
      wrapper = shallow(<CheckoutFrame checkoutScriptReady={false} />)
      wrapper.instance().initFrames = initFrames
      wrapper.setProps({
        checkoutScriptReady: true,
      })
    })

    test('then initFrames should be called', () => {
      expect(initFrames).toHaveBeenCalled()
    })
  })

  describe('when isStartSubscriptionSubmitted is true', () => {
    beforeEach(() => {
      wrapper = shallow(<CheckoutFrame isStartSubscriptionSubmitted />)
    })

    test('then wrapper state should be updated properly', () => {
      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          showCardNumberError: true,
          showExpiryDateError: true,
          showCVVError: true,
          isStartSubscriptionSubmitted: true,
        })
      )
    })
  })
})

describe('CheckoutFrameContainer', () => {
  let wrapper
  const mockStore = configureMockStore()

  const store = mockStore({
    checkout: Immutable.fromJS({
      errors: [],
    }),
    form: Immutable.fromJS({
      payment: {
        values: {
          payment: {
            isBillingAddressDifferent: false,
          },
        },
      },
      delivery: {
        values: {
          delivery: {},
        },
      },
    }),
  })

  beforeEach(() => {
    wrapper = shallow(<CheckoutFrameContainer store={store} next={jest.fn()} />)
  })

  test('should be rendered properly', () => {
    const expected = {
      sectionName: 'payment',
      cardName: '',
      hasCheckoutError: false,
      billingAddress: {},
    }
    expect(wrapper.find('CheckoutFrame').props()).toEqual(expect.objectContaining(expected))
  })
})
