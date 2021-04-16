import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { actionTypes } from 'actions/actionTypes'
import { ErrorMessage } from './ErrorMessage'
import { isSubmitting } from '../../utils/state'

function mapStateToProps(state, ownProps) {
  let errorType

  if (!isSubmitting(state)) {
    errorType = ownProps.errorType
    if (!errorType) {
      if (ownProps.showPayPalErrors) {
        const paypalErrors = state.checkout.get('paypalErrors')

        if (paypalErrors.get(actionTypes.PAYPAL_TOKEN_FETCH_FAILED)) {
          errorType = 'paypal-token-fetch-failed'
        } else if (paypalErrors.get(actionTypes.PAYPAL_ERROR)) {
          errorType = 'paypal-error'
        }
      }

      if (!errorType) {
        const errors = state.checkout.get('errors')

        if (errors.get(actionTypes.CHECKOUT_ERROR_DUPLICATE)) {
          errorType = 'postcodeInvalid'
        } else if (errors.get(actionTypes.CHECKOUT_SIGNUP)) {
          const code = errors.get(actionTypes.CHECKOUT_SIGNUP)
          switch (code) {
            case '422-registration-failed':
            case '401-auth-error':
              errorType = 'user-exists'
              break
            case '422-payment-failed':
              errorType = 'payment-failure'
              break
            case '409-duplicate-details':
              errorType = 'user-promo-invalid'
              break
            case '409-missing-preview-order':
              errorType = 'out-of-stock'
              break
            case 'validation.phone.customer.phone_number':
              errorType = 'user-phone-number-invalid'
              break
            case '3ds-challenge-failed':
              errorType = '3ds-challenge-failed'
              break
            default:
              errorType = 'generic'
              break
          }
        } else if (errors.get(actionTypes.CARD_TOKENIZATION_FAILED)) {
          errorType = 'card-tokenization-failed'
        } else if (errors.get(actionTypes.NETWORK_FAILURE)) {
          errorType = 'network-failure'
        } else if (errors.get(actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED)) {
          errorType = 'valid-card-details-not-provided'
        } else {
          // find last error that is truthy
          errorType = errors.findLast((error) => !!error)
        }
      }
    }
  }

  return {
    errorType,
    goBack: ownProps.router.goBack,
  }
}

export const ErrorMessageContainer = withRouter(connect(mapStateToProps)(ErrorMessage))
