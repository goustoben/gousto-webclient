import { connect } from 'react-redux'
import { getPromoBannerState } from 'utils/home'
import { trackDiscountVisibilityBannerAppearance } from 'actions/tracking'
import { signupDismissDiscountAppliedBar } from 'actions/signup'
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
  mapDispatchToProps
)(DiscountAppliedBar)
