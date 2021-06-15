import { connect } from 'react-redux'
import actions from 'actions'
import {
  getIsTastePreferencesEnabled,
  getPricingClarityRedesign,
  getIsWizardPricePerServingEnabled,
  getIsWizardBoxSizeEnabled,
  getIsPaymentBeforeChoosingEnabled,
  getIsPaymentBeforeChoosingV2Enabled,
} from 'selectors/features'
import { signupDismissDiscountAppliedBar } from 'actions/signup'
import { trackDiscountVisibilityBannerAppearance } from 'actions/tracking'
import { getPromoBannerState } from 'utils/home'
import { Signup } from './Signup'

const mapStateToProps = (state, ownProps) => ({
  stepName: ownProps.params.stepName,
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
  isPaymentBeforeChoosingEnabled: getIsPaymentBeforeChoosingEnabled(state),
  isPaymentBeforeChoosingV2Enabled: getIsPaymentBeforeChoosingV2Enabled(state),
  isDiscountAppliedBarDismissed: state.signup.get('isDiscountAppliedBarDismissed'),
})

const SignupContainer = connect(mapStateToProps, {
  goToStep: actions.signupNextStep,
  signupStepsReceive: actions.signupStepsReceive,
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  trackDiscountVisibility: trackDiscountVisibilityBannerAppearance,
  signupDismissDiscountAppliedBar,
})(Signup)

export { SignupContainer }
