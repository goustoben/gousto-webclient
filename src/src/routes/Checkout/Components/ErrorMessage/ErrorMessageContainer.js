import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { translateCheckoutErrorToMessageCode } from 'utils/checkout'
import { getIsPromoCodeValidationEnabled } from 'selectors/features'
import { ErrorMessage } from './ErrorMessage'
import { isSubmitting } from '../../utils/state'

const getErrorFromCollection = (errorsMap) => errorsMap.findEntry((value) => !!value)

const getErrorType = (state, ownProps) => {
  if (isSubmitting(state)) {
    return null
  }

  let entry

  if (ownProps.showPayPalErrors) {
    entry =
      getErrorFromCollection(state.checkout.get('paypalErrors')) ||
      getErrorFromCollection(state.checkout.get('errors'))
  } else {
    entry = getErrorFromCollection(state.checkout.get('errors'))
  }

  if (!entry) {
    return null
  }

  const [errorName, errorValue] = entry
  const isPromoCodeValidationEnabled = getIsPromoCodeValidationEnabled(state)

  return translateCheckoutErrorToMessageCode(errorName, errorValue, isPromoCodeValidationEnabled)
}

function mapStateToProps(state, ownProps) {
  return {
    errorType: getErrorType(state, ownProps),
  }
}

export const ErrorMessageContainer = withRouter(connect(mapStateToProps)(ErrorMessage))
