import { connect } from 'react-redux'
import { getFormValues, isInvalid, submit } from 'redux-form'
import SubmitButton from './SubmitButton'

function mapStateToProps(state, ownProps) {
  const browser = state.request.get('browser')
  const form = (browser === 'mobile') ? 'yourDetails' : 'delivery'

  return {
    checkoutInvalid: isInvalid('delivery')(state),
    checkoutMobileInvalid: isInvalid('yourDetails')(state),
    formValues: getFormValues(form)(state),
    browser,
    nextStepName: ownProps.nextStepName,
    onStepChange: ownProps.onStepChange,
  }
}

export default connect(mapStateToProps, {
  manualSubmit: submit,
})(SubmitButton)
