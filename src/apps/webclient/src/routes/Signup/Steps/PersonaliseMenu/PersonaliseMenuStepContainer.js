import { connect } from 'react-redux'

import { trackSignupWizardAction } from 'routes/Signup/signupActions'

import { PersonaliseMenuStep } from './PersonaliseMenuStep'

function mapStateToProps() {
  return {}
}

const PersonaliseMenuStepContainer = connect(mapStateToProps, {
  trackSignupWizardAction,
})(PersonaliseMenuStep)

export { PersonaliseMenuStepContainer }
