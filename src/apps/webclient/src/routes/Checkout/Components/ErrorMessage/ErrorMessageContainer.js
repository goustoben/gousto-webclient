import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { translateCheckoutErrorToMessageCode } from 'utils/checkout'

import { isSubmitting } from '../../utils/state'
import { ErrorMessage } from './ErrorMessage'

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
  const isGoustoOnDemandEnabled = getIsGoustoOnDemandEnabled(state)

  return translateCheckoutErrorToMessageCode(errorName, errorValue, isGoustoOnDemandEnabled)
}

function mapStateToProps(state, ownProps) {
  return {
    errorType: getErrorType(state, ownProps),
  }
}

export const ErrorMessageContainer = withRouter(connect(mapStateToProps)(ErrorMessage))
