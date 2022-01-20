import Immutable from 'immutable'
import { PaymentMethod } from 'config/signup'
import {
  getCurrentPaymentMethod,
  getPayPalClientToken,
  getCardToken,
  getChallengeUrl,
  isModalOpen,
  isPayPalReady,
  isCardPayment,
  getPaymentProvider,
  getCanSubmitPaymentDetails,
  getCardPaymentDetails,
  getPayPalPaymentDetails,
  getPaymentAuthData,
  getPaymentData,
} from 'selectors/payment'

import routes from 'config/routes'

describe('payment selectors', () => {
  let state = {}
  const deviceData = JSON.stringify({ correlationId: 'dfksdfghsdfgsdf' })

  beforeEach(() => {
    state = {
      form: {
        payment: {
          values: {
            payment: {
              payment_provider: 'checkout',
              active: 1,
              token: 'test-token'
            }
          }
        }
      },
      payment: Immutable.fromJS({
        challengeUrl: 'https://bank.uk/3dschallenge',
        isModalVisible: false,
        paymentMethod: PaymentMethod.PayPal,
        paypalClientToken: 'test-client-token',
        paypalNonce: 'test-nonce',
        paypalDeviceData: deviceData,
      }),
      basket: Immutable.fromJS({
        previewOrderId: 'fake-order-id'
      }),
      checkout: Immutable.fromJS({
        goustoRef: 'fake-gousto-ref'
      }),
      pricing: Immutable.fromJS({
        prices: Immutable.fromJS({
          total: 24.99
        })
      })
    }
  })

  describe('given getCurrentPaymentMethod method', () => {
    describe('when called', () => {
      test('then should return the state of payment method', () => {
        const result = getCurrentPaymentMethod(state)

        expect(result).toEqual(PaymentMethod.PayPal)
      })
    })
  })

  describe('given getPayPalClientToken method', () => {
    describe('when called', () => {
      test('then should return the paypal client token', () => {
        const result = getPayPalClientToken(state)

        expect(result).toEqual('test-client-token')
      })
    })
  })

  describe('given getCardToken method', () => {
    describe('when called', () => {
      test('then should return the checkout card token', () => {
        const result = getCardToken(state)

        expect(result).toEqual('test-token')
      })
    })
  })

  describe('given getChallengeUrl method', () => {
    describe('when called', () => {
      test('then should return 3DS challenge url from the store', () => {
        const result = getChallengeUrl(state)

        expect(result).toEqual('https://bank.uk/3dschallenge')
      })
    })
  })

  describe('given isModalOpen method', () => {
    describe('when called', () => {
      test('then should return the state of 3DS modal', () => {
        const result = isModalOpen(state)

        expect(result).toBe(false)
      })
    })
  })

  describe('given isPayPalReady method', () => {
    describe('when payment method is PayPal', () => {
      describe('and PayPal nonce is defined', () => {
        test('then should return true', () => {
          const result = isPayPalReady(state)

          expect(result).toBe(true)
        })
      })

      describe('and PayPal nonce is not defined', () => {
        beforeEach(() => {
          state.payment = state.payment.set('paypalNonce', null)
        })

        test('then should return false', () => {
          const result = isPayPalReady(state)

          expect(result).toBe(false)
        })
      })
    })

    describe('when payment method is Card', () => {
      beforeEach(() => {
        state.payment = state.payment.set('paymentMethod', PaymentMethod.Card)
      })

      test('then should return false', () => {
        const result = isPayPalReady(state)

        expect(result).toBe(false)
      })
    })
  })

  describe('given isCardPayment method', () => {
    describe('when payment method is PayPal', () => {
      test('then should return false', () => {
        const result = isCardPayment(state)

        expect(result).toBe(false)
      })
    })
  })

  describe('when payment method is Card', () => {
    beforeEach(() => {
      state.payment = state.payment.set('paymentMethod', PaymentMethod.Card)
    })

    test('then should return true', () => {
      const result = isCardPayment(state)

      expect(result).toBe(true)
    })
  })

  describe('given getPaymentProvider method', () => {
    describe('when payment method is PayPal', () => {
      test('then should return "paypal"', () => {
        const result = getPaymentProvider(state)

        expect(result).toBe('paypal')
      })
    })
  })

  describe('when payment method is Card', () => {
    beforeEach(() => {
      state.payment = state.payment.set('paymentMethod', PaymentMethod.Card)
    })

    test('then should return "checkout"', () => {
      const result = getPaymentProvider(state)

      expect(result).toBe('checkout')
    })
  })

  describe('given getCanSubmitPaymentDetails method', () => {
    describe('when payment method is PayPal', () => {
      describe('and PayPal nonce is defined', () => {
        test('then should return true', () => {
          const result = getCanSubmitPaymentDetails(state)

          expect(result).toBe(true)
        })
      })

      describe('and PayPal nonce is not defined', () => {
        beforeEach(() => {
          state.payment = state.payment.set('paypalNonce', null)
        })

        test('then should return false', () => {
          const result = getCanSubmitPaymentDetails(state)

          expect(result).toBe(false)
        })
      })
    })

    describe('when payment method is Card', () => {
      beforeEach(() => {
        state.payment = state.payment.set('paymentMethod', PaymentMethod.Card)
      })

      test('then should return true', () => {
        const result = getCanSubmitPaymentDetails(state)

        expect(result).toBe(true)
      })
    })
  })

  describe('given getCardPaymentDetails method', () => {
    describe('when called', () => {
      test('then should return payment details for Checkout', () => {
        const expected = {
          payment_provider: 'checkout',
          active: 1,
          card_token: 'test-token',
        }
        const result = getCardPaymentDetails(state)

        expect(result).toEqual(expected)
      })
    })
  })

  describe('given getPayPalPaymentDetails method', () => {
    describe('when called', () => {
      test('then should return payment details for PayPal', () => {
        const expected = {
          payment_provider: 'paypal',
          active: 1,
          token: 'test-nonce',
          device_data: deviceData,
        }

        const result = getPayPalPaymentDetails(state)

        expect(result).toEqual(expected)
      })
    })
  })

  describe('given getPaymentAuthData method', () => {
    describe('when called', () => {
      test('then should payment auth request data', () => {
        const expected = {
          order_id: 'fake-order-id',
          gousto_ref: 'fake-gousto-ref',
          card_token: 'test-token',
          amount: 2499,
          '3ds': true,
          success_url: `http://localhost${routes.client.payment.success}`,
          failure_url: `http://localhost${routes.client.payment.failure}`,
          decoupled: true
        }

        const result = getPaymentAuthData(state)

        expect(result).toEqual(expected)
      })
    })
  })

  describe('given getPaymentData method', () => {
    describe('when payment method is card', () => {
      beforeEach(() => {
        state.payment = state.payment.set('paymentMethod', PaymentMethod.Card)
      })

      test('then should return payment details for 3ds card', () => {
        const expected = {
          order_id: 'fake-order-id',
          gousto_ref: 'fake-gousto-ref',
          card_token: 'test-token',
          '3ds': true,
        }

        const result = getPaymentData(state)

        expect(result).toEqual(expected)
      })
    })

    describe('when PayPal method', () => {
      test('then should return payment details for PayPal', () => {
        const expected = {
          order_id: 'fake-order-id',
          gousto_ref: 'fake-gousto-ref',
          card_token: 'test-nonce',
          device_data: deviceData
        }

        const result = getPaymentData(state)

        expect(result).toEqual(expected)
      })
    })
  })
})
