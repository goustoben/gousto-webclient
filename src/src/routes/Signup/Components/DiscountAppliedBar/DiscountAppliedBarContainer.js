import { connect } from 'react-redux'
import { getPromoBannerState } from 'utils/home'
import { DiscountAppliedBar } from './DiscountAppliedBar'
import { signupDismissDiscountAppliedBar } from "actions/signup/signupDismissDiscountAppliedBar"
import { trackDiscountVisibilityBannerAppearance } from "actions/tracking/trackDiscountVisibilityBannerAppearance"

const mapStateToProps = (state) => {
  const promoBannerState = getPromoBannerState(state)

  return {
    promoModalVisible: state.promoModalVisible,
    isPromoBarHidden: !promoBannerState.canApplyPromo,
    isDiscountAppliedBarDismissed: state.signup.get('isDiscountAppliedBarDismissed'),
  }
}

const mapDispatchToProps = {
  trackDiscountVisibility: trackDiscountVisibilityBannerAppearance,
  signupDismissDiscountAppliedBar,
}

export const DiscountAppliedBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscountAppliedBar)
