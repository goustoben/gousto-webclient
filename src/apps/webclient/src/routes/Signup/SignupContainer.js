import { connect } from 'react-redux'

import {
  signupNextStep,
  signupStepsReceive,
  signupDismissDiscountAppliedBar,
  signupSetStep,
} from 'actions/signup'
import { trackDiscountVisibilityBannerAppearance } from 'actions/tracking'
import { getIsWizardWithoutImagesEnabled } from 'routes/Signup/signupSelectors'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { getPromoBannerState } from 'utils/home'

import { Signup } from './Signup'

const mapStateToProps = (state, ownProps) => ({
  secondarySlug: ownProps.params.secondarySlug,
  stepNames: state.signup.getIn(['wizard', 'stepNames']),
  orderDiscount: state.promoStore.getIn([
    state.promoCurrent,
    'details',
    'discount-whole-order-percent',
  ]),
  promoModalVisible: state.promoModalVisible,
  // Note: Signup.js doesn't use promoCode, therefore we don't pass
  // isTwoMonthPromoCodeEnabled.
  promoBannerState: getPromoBannerState(state),
  isDiscountAppliedBarDismissed: state.signup.get('isDiscountAppliedBarDismissed'),
  isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
  isWizardWithoutImagesEnabled: getIsWizardWithoutImagesEnabled(state),
})

const SignupContainer = connect(mapStateToProps, {
  goToStep: signupNextStep,
  signupStepsReceive,
  trackDiscountVisibility: trackDiscountVisibilityBannerAppearance,
  signupDismissDiscountAppliedBar,
  signupSetStep,
})(Signup)

export { SignupContainer }
