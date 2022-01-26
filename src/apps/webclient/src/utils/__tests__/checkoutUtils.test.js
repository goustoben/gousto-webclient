import { actionTypes } from 'actions/actionTypes'
import { inferCardType, translateCheckoutErrorToMessageCode } from '../checkout'

describe('utils/checkout', () => {
  describe('inferCardType', () => {
    // http://www.sagepay.co.uk/support/12/36/test-card-details-for-your-test-transactions
    test('should identify VISA', () => {
      expect(inferCardType('4929000000006')).toEqual('VISA')
      expect(inferCardType('4929000005559')).toEqual('VISA')
      expect(inferCardType('4929000000014')).toEqual('VISA')
      expect(inferCardType('4929000000022')).toEqual('VISA')
      expect(inferCardType('4484000000002')).toEqual('VISA')
      expect(inferCardType('4462000000000003')).toEqual('VISA')
    })
    test('should identify MC', () => {
      expect(inferCardType('5404000000000001')).toEqual('MC')
      expect(inferCardType('5404000000000043')).toEqual('MC')
      expect(inferCardType('5404000000000084')).toEqual('MC')
      expect(inferCardType('5404000000000068')).toEqual('MC')
      expect(inferCardType('5573470000000001')).toEqual('MC')
    })
    test('should identify MAESTRO', () => {
      expect(inferCardType('6759000000005')).toEqual('MAESTRO')
      expect(inferCardType('6705000000008')).toEqual('MAESTRO')
      expect(inferCardType('6777000000007')).toEqual('MAESTRO')
      expect(inferCardType('6766000000000')).toEqual('MAESTRO')
    })
    test('should identify UKE', () => {
      expect(inferCardType('4917300000000008')).toEqual('UKE')
    })
    test('should identify AMEX', () => {
      expect(inferCardType('374200000000004')).toEqual('AMEX')
    })
  })

  describe('given translateCheckoutErrorToMessageCode is invoked', () => {
    const cases = [
      [actionTypes.PAYPAL_TOKEN_FETCH_FAILED, true, 'paypal-token-fetch-failed'],
      [actionTypes.PAYPAL_ERROR, true, 'paypal-error'],
      [actionTypes.CHECKOUT_ERROR_DUPLICATE, true, 'postcodeInvalid'],
      [actionTypes.CHECKOUT_SIGNUP, '422-registration-failed', 'user-exists'],
      [actionTypes.CHECKOUT_SIGNUP, '401-auth-error', 'user-exists'],
      [actionTypes.CHECKOUT_SIGNUP, '422-payment-failed', 'payment-failure'],
      [actionTypes.CHECKOUT_SIGNUP, '409-duplicate-details', 'user-promo-invalid'],
      [actionTypes.CHECKOUT_SIGNUP, '409-missing-preview-order', 'out-of-stock'],
      [
        actionTypes.CHECKOUT_SIGNUP,
        'validation.phone.customer.phone_number',
        'user-phone-number-invalid',
      ],
      [actionTypes.CHECKOUT_SIGNUP, '3ds-challenge-failed', '3ds-challenge-failed'],
      [actionTypes.CHECKOUT_SIGNUP, '422-declined-do-not-honour', '422-declined-do-not-honour'],
      [actionTypes.CHECKOUT_SIGNUP, '422-insufficient-funds', '422-insufficient-funds'],
      [actionTypes.CHECKOUT_SIGNUP, '*something-unrecognized*', 'generic'],
      [actionTypes.CARD_TOKENIZATION_FAILED, true, 'card-tokenization-failed'],
      [actionTypes.NETWORK_FAILURE, true, 'network-failure'],
      [actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED, true, 'valid-card-details-not-provided'],
      [actionTypes.CHECKOUT_PAYMENT, '422-payment-failed', 'signup-payments-payment-failure'],
      [
        actionTypes.CHECKOUT_PAYMENT,
        '422-insufficient-funds',
        'signup-payments-insufficient-funds',
      ],
      [
        actionTypes.CHECKOUT_PAYMENT,
        '422-declined-do-not-honour',
        'signup-payments-declined-do-not-honour',
      ],
      [actionTypes.CHECKOUT_PAYMENT, '3ds-challenge-failed', 'signup-payments-challenge-failed'],
      ['*unrecognized-action-type*', true, 'generic'],
    ]

    describe.each(cases)(
      'when errorName is %p and errorValue is %p',
      (errorName, errorValue, expectedMessageCode) => {
        test(`then it should return "${expectedMessageCode}"`, () => {
          const messageCode = translateCheckoutErrorToMessageCode(errorName, errorValue)
          expect(messageCode).toBe(expectedMessageCode)
        })
      }
    )
  })
})
