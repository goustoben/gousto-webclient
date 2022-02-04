import { connect } from 'react-redux'
import actions from 'actions'
import { getIsTastePreferencesEnabled, getIsGoustoOnDemandEnabled } from 'selectors/features'
import { signupDismissDiscountAppliedBar, signupSetStep } from 'actions/signup'
import { trackDiscountVisibilityBannerAppearance } from 'actions/tracking'
import { getPromoBannerState } from 'utils/home'
import {
  getIsWizardWithoutImagesEnabled,
  getIsSkipWizardEnabled,
} from 'routes/Signup/signupSelectors'
import { getIsAuthenticated } from 'selectors/auth'
import { Signup } from './Signup'

const mapStateToProps = (state, ownProps) => {
  const isSkipWizardEnabled = getIsSkipWizardEnabled(state)
  const isAuthenticated = getIsAuthenticated(state)
  const shouldSkipWizardByFeature = !isAuthenticated && isSkipWizardEnabled

  return {
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
    isDiscountAppliedBarDismissed: state.signup.get('isDiscountAppliedBarDismissed'),
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
    isWizardWithoutImagesEnabled: getIsWizardWithoutImagesEnabled(state),
    shouldSkipWizardByFeature,
  }
}

const SignupContainer = connect(mapStateToProps, {
  goToStep: actions.signupNextStep,
  signupStepsReceive: actions.signupStepsReceive,
  trackDiscountVisibility: trackDiscountVisibilityBannerAppearance,
  signupDismissDiscountAppliedBar,
  signupSetStep,
})(Signup)

export { SignupContainer }
