import { connect } from 'react-redux'
import actions from 'actions'
import {
  getIsTastePreferencesEnabled,
  getIsPaymentBeforeChoosingEnabled,
  getIsPaymentBeforeChoosingV2Enabled,
} from 'selectors/features'
import { signupDismissDiscountAppliedBar, signupSetStep } from 'actions/signup'
import { trackDiscountVisibilityBannerAppearance } from 'actions/tracking'
import { getPromoBannerState } from 'utils/home'
import { getIsSocialBelongingEnabled } from 'routes/Signup/signupSelectors'
import { Signup } from './Signup'

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
  isSocialBelongingEnabled: getIsSocialBelongingEnabled(state),
})

const SignupContainer = connect(mapStateToProps, {
  goToStep: actions.signupNextStep,
  signupStepsReceive: actions.signupStepsReceive,
  trackDiscountVisibility: trackDiscountVisibilityBannerAppearance,
  signupDismissDiscountAppliedBar,
  signupSetStep,
})(Signup)

export { SignupContainer }
