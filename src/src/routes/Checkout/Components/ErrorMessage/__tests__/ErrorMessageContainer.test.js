import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { isSubmitting } from 'routes/Checkout/utils/state'
import { ErrorMessageContainer } from '../ErrorMessageContainer'

jest.mock('routes/Checkout/utils/state', () => ({
  isSubmitting: jest.fn(),
}))

const expectErrorType = (wrapper, expectedErrorType) => {
  const errorMessageComponent = wrapper.find('ErrorMessage')
  expect(errorMessageComponent.prop('errorType')).toEqual(expectedErrorType)
}

const router = {
  push: jest.fn(),
  replace: jest.fn(),
  go: jest.fn(),
  goBack: jest.fn(),
  goForward: jest.fn(),
  setRouteLeaveHook: jest.fn(),
  isActive: jest.fn(),
}

const makeStore = (checkoutSlice) => {
  const state = {
    checkout: Immutable.fromJS(checkoutSlice),
  }
  const store = {
    getState: () => state,
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  return store
}

const cases = [
  [
    'paypalErrors',
    actionTypes.PAYPAL_TOKEN_FETCH_FAILED,
    true,
    'paypal-token-fetch-failed',
    { showPayPalErrors: true },
  ],
  ['paypalErrors', actionTypes.PAYPAL_ERROR, true, 'paypal-error', { showPayPalErrors: true }],
  ['errors', actionTypes.CHECKOUT_ERROR_DUPLICATE, true, 'postcodeInvalid'],
  ['errors', actionTypes.CHECKOUT_SIGNUP, '422-registration-failed', 'user-exists'],
  ['errors', actionTypes.CHECKOUT_SIGNUP, '401-auth-error', 'user-exists'],
  ['errors', actionTypes.CHECKOUT_SIGNUP, '422-payment-failed', 'payment-failure'],
  ['errors', actionTypes.CHECKOUT_SIGNUP, '409-duplicate-details', 'user-promo-invalid'],
  ['errors', actionTypes.CHECKOUT_SIGNUP, '409-missing-preview-order', 'out-of-stock'],
  [
    'errors',
    actionTypes.CHECKOUT_SIGNUP,
    'validation.phone.customer.phone_number',
    'user-phone-number-invalid',
  ],
  ['errors', actionTypes.CHECKOUT_SIGNUP, '3ds-challenge-failed', '3ds-challenge-failed'],
  ['errors', actionTypes.CHECKOUT_SIGNUP, '*something-unrecognized*', 'generic'],
  ['errors', actionTypes.CARD_TOKENIZATION_FAILED, true, 'card-tokenization-failed'],
  ['errors', actionTypes.NETWORK_FAILURE, true, 'network-failure'],
  ['errors', actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED, true, 'valid-card-details-not-provided'],
  ['errors', '*unrecognized-action-type*', true, 'generic'],
]

describe('ErrorMessageContainer', () => {
  let wrapper

  describe('when ErrorMessageContainer is rendered without an error', () => {
    beforeEach(() => {
      const store = makeStore({ errors: {} })
      wrapper = mount(<ErrorMessageContainer store={store} router={router} />)
    })

    test('then should not set errorType', () => {
      expectErrorType(wrapper, null)
    })
  })

  describe('when the form is submitting', () => {
    beforeEach(() => {
      const store = makeStore({ errors: {} })
      isSubmitting.mockReturnValue(true)
      wrapper = mount(<ErrorMessageContainer store={store} router={router} />)
    })

    test('then should not set the errorType', () => {
      expectErrorType(wrapper, null)
    })
  })

  describe.each(cases)(
    'when %p contains %p: %p',
    (stateKey, errorName, errorValue, expectedErrorType, options = {}) => {
      const { showPayPalErrors } = options
      describe(`and when showPayPalErrors is ${showPayPalErrors}`, () => {
        beforeEach(() => {
          isSubmitting.mockReturnValue(false)
        })

        test(`then should set a proper errorType: ${expectedErrorType}`, () => {
          const store = makeStore({
            [stateKey]: {
              [errorName]: errorValue,
            },
          })
          wrapper = mount(
            <ErrorMessageContainer
              store={store}
              router={router}
              showPayPalErrors={showPayPalErrors}
            />
          )

          expectErrorType(wrapper, expectedErrorType)
        })
      })
    }
  )
})
