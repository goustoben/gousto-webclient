import Immutable from 'immutable'
import { PaymentMethod } from 'config/signup'
import {
  getCurrentPaymentMethod,
  getPayPalClientToken,
  getCardToken,
  getChallengeUrl,
  isModalOpen,
  isPayPalReady,
  getCanSubmitPaymentDetails,
  getPaymentDetails,
  getPayPalPaymentDetails,
} from 'selectors/payment'

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

  describe('given getPaymentDetails method', () => {
    describe('when called', () => {
      test('then should return payment details for Checkout', () => {
        const expected = {
          payment_provider: 'checkout',
          active: 1,
          card_token: 'test-token',
        }
        const result = getPaymentDetails(state)

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
})
