import { actionTypes } from 'actions/actionTypes'
import { translateCheckoutErrorToMessageCode } from '../checkout'

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
  ['*unrecognized-action-type*', true, 'generic'],
]

describe('given translateCheckoutErrorToMessageCode is invoked', () => {
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
