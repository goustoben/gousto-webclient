import { connect } from 'react-redux'
import actions from 'actions'
import {
  getIsTastePreferencesEnabled,
  getPricingClarityRedesign,
  getIsWizardPricePerServingEnabled,
  getIsWizardBoxSizeEnabled,
} from 'selectors/features'
import { trackDiscountVisibilityBannerAppearance } from 'actions/tracking'
import { getPromoBannerState } from 'utils/home'
import { Signup } from './Signup'

const mapStateToProps = (state, ownProps) => ({
  stepName: ownProps.params.stepName,
  currentStepName: state.signup.getIn(['wizard', 'currentStepName']),
  steps: state.signup.getIn(['wizard', 'steps']),
  isTastePreferencesEnabled: getIsTastePreferencesEnabled(state),
  isPricingClarityEnabled: getPricingClarityRedesign(state),
  orderDiscount: state.promoStore.getIn([
    state.promoCurrent,
    'details',
    'discount-whole-order-percent',
  ]),
  promoModalVisible: state.promoModalVisible,
  promoBannerState: getPromoBannerState(state),
  isWizardPricePerServingEnabled: getIsWizardPricePerServingEnabled(state),
  lowestPricePerPortion: state.boxPrices.toJS().lowestPricePerPortion,
  isWizardBoxSizeEnabled: getIsWizardBoxSizeEnabled(state),
})

const SignupContainer = connect(mapStateToProps, {
  goToStep: actions.signupNextStep,
  changeStep: actions.signupSetStep,
  signupStepsReceive: actions.signupStepsReceive,
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  trackDiscountVisibility: trackDiscountVisibilityBannerAppearance,
})(Signup)

export { SignupContainer }
