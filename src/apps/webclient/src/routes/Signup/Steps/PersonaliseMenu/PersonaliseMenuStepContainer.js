import { connect } from 'react-redux'

import { trackSignupWizardAction } from 'actions/signup'

import { PersonaliseMenuStep } from './PersonaliseMenuStep'

function mapStateToProps() {
  return {}
}

const PersonaliseMenuStepContainer = connect(mapStateToProps, {
  trackSignupWizardAction,
})(PersonaliseMenuStep)

export { PersonaliseMenuStepContainer }
