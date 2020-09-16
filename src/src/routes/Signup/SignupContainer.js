import { connect } from 'react-redux'
import actions from 'actions'
import { getIsTastePreferencesEnabled, getPricingClarityRedesign } from 'selectors/features'
import { Signup } from './Signup'

const mapStateToProps = (state, ownProps) => ({
  stepName: ownProps.params.stepName,
  currentStepName: state.signup.getIn(['wizard', 'currentStepName']),
  steps: state.signup.getIn(['wizard', 'steps']),
  isTastePreferencesEnabled: getIsTastePreferencesEnabled(state),
  isPricingClarityEnabled: getPricingClarityRedesign(state),
  orderDiscount: state.promoStore.getIn([state.promoCurrent, 'details', 'discount-whole-order-percent'])
})

const SignupContainer = connect(mapStateToProps, {
  goToStep: actions.signupNextStep,
  changeStep: actions.signupSetStep,
  signupStepsReceive: actions.signupStepsReceive,
  menuLoadBoxPrices: actions.menuLoadBoxPrices
})(Signup)

export { SignupContainer }
