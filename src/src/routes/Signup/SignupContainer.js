import { connect } from 'react-redux'
import {
  getIsGoustoOnDemandEnabled,
  getIsPaymentBeforeChoosingEnabled,
  getIsPaymentBeforeChoosingV2Enabled,
  getIsTastePreferencesEnabled,
} from 'selectors/features'
import { getPromoBannerState } from 'utils/home'
import { getIsWizardWithoutImagesEnabled } from 'routes/Signup/signupSelectors'
import { Signup } from './Signup'
import { signupStepsReceive } from "actions/signup/signupStepsReceive"
import { signupSetStep } from "actions/signup/signupSetStep"
import { signupNextStep } from "actions/signup/signupNextStep"
import { signupDismissDiscountAppliedBar } from "actions/signup/signupDismissDiscountAppliedBar"
import { trackDiscountVisibilityBannerAppearance } from "actions/tracking/trackDiscountVisibilityBannerAppearance"

const mapStateToProps = (state, ownProps) => ({
  stepName: ownProps.params.stepName,
  steps: state.signup.getIn(['wizard', 'steps']),
  isTastePreferencesEnabled: getIsTastePreferencesEnabled(state),
  orderDiscount: state.promoStore.getIn([
    state.promoCurrent,
    'details',
    'discount-whole-order-percent',
  ]),
  promoModalVisible: state.promoModalVisible,
  promoBannerState: getPromoBannerState(state),
  lowestPricePerPortion: state.boxPrices.toJS().lowestPricePerPortion,
  isPaymentBeforeChoosingEnabled: getIsPaymentBeforeChoosingEnabled(state),
  isPaymentBeforeChoosingV2Enabled: getIsPaymentBeforeChoosingV2Enabled(state),
  isDiscountAppliedBarDismissed: state.signup.get('isDiscountAppliedBarDismissed'),
  isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
  isWizardWithoutImagesEnabled: getIsWizardWithoutImagesEnabled(state),
})

const SignupContainer = connect(mapStateToProps, {
  goToStep: signupNextStep,
  signupStepsReceive: signupStepsReceive,
  trackDiscountVisibility: trackDiscountVisibilityBannerAppearance,
  signupDismissDiscountAppliedBar,
  signupSetStep,
})(Signup)

export { SignupContainer }
