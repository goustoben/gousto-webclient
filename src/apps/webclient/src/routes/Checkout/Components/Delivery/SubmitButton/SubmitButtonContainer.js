import { connect } from 'react-redux'
import { getFormValues, isInvalid, submit } from 'redux-form'
import { deliveryFormName } from 'selectors/checkout'
import { getBrowserType } from 'selectors/browser'
import { SubmitButton } from './SubmitButton'

function mapStateToProps(state, ownProps) {
  return {
    checkoutInvalid: isInvalid('delivery')(state),
    checkoutMobileInvalid: isInvalid('yourdetails')(state),
    formValues: getFormValues(deliveryFormName)(state),
    browser: getBrowserType(state),
    nextStepName: ownProps.nextStepName,
    onStepChange: ownProps.onStepChange,
  }
}

export const SubmitButtonContainer = connect(mapStateToProps, {
  manualSubmit: submit,
})(SubmitButton)
