import { connect } from 'react-redux'
import { getFormValues, isInvalid, submit } from 'redux-form'
import { getDeliveryFormName } from 'selectors/checkout'
import { getBrowserType } from 'selectors/browser'
import SubmitButton from './SubmitButton'

function mapStateToProps(state, ownProps) {
  const form = getDeliveryFormName(state)

  return {
    checkoutInvalid: isInvalid('delivery')(state),
    checkoutMobileInvalid: isInvalid('yourdetails')(state),
    formValues: getFormValues(form)(state),
    browser: getBrowserType(state),
    nextStepName: ownProps.nextStepName,
    onStepChange: ownProps.onStepChange,
  }
}

export default connect(mapStateToProps, {
  manualSubmit: submit,
})(SubmitButton)
