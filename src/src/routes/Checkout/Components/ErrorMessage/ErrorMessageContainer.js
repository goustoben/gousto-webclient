import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { translateCheckoutErrorToMessageCode } from 'utils/checkout'
import { ErrorMessage } from './ErrorMessage'
import { isSubmitting } from '../../utils/state'

const getErrorType = (state, ownProps) => {
  if (isSubmitting(state)) {
    return null
  }

  const errors = ownProps.showPayPalErrors
    ? state.checkout.get('paypalErrors')
    : state.checkout.get('errors')

  const entry = errors.findEntry((value) => !!value)
  if (!entry) {
    return null
  }

  const [errorName, errorValue] = entry

  return translateCheckoutErrorToMessageCode(errorName, errorValue)
}

function mapStateToProps(state, ownProps) {
  return {
    errorType: getErrorType(state, ownProps),
    goBack: ownProps.router.goBack,
  }
}

export const ErrorMessageContainer = withRouter(connect(mapStateToProps)(ErrorMessage))
