import { connect } from 'react-redux'

import { trackDiscountVisibilityBannerAppearance } from 'actions/tracking'
import { getPromoBannerState } from 'routes/Home/homeUtils'
import { signupDismissDiscountAppliedBar } from 'routes/Signup/signupActions'

import { DiscountAppliedBar } from './DiscountAppliedBar'

const mapStateToProps = (state) => {
  // Note: we don't use promoCode here, so we don't have to pass
  // isTwoMonthPromoCodeEnabled.
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
  mapDispatchToProps,
)(DiscountAppliedBar)
