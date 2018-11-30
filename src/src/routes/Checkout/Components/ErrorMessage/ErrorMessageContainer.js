import { connect } from 'react-redux'
import ErrorMessage from './ErrorMessage'
import * as stateUtils from 'routes/Checkout/utils/state'
import actionTypes from 'actions/actionTypes'

function mapStateToProps(state, ownProps) {
  let errorType

  if (!stateUtils.isSubmitting(state)) {
    errorType = ownProps.errorType
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
        default:
          errorType = 'generic'
          break
        }
      } else if (errors.get(actionTypes.CARD_TOKENISATION_FAILED)) {
        errorType = 'card-tokenisation-failed'
      } else if (errors.get(actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED)) {
        errorType = 'valid-card-details-not-provided'
      } else {
        // find last error that is truthy
        errorType = errors.findLast(error => !!error)
      }
    }
  }

  return { errorType }
}

export default connect(mapStateToProps)(ErrorMessage)
