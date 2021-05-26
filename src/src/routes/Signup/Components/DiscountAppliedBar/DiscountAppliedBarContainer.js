import { connect } from 'react-redux'
import { getPromoBannerState } from 'utils/home'
import { trackDiscountVisibilityBannerAppearance } from 'actions/tracking'
import { signupDismissDiscountAppliedBar } from 'actions/signup'
import { DiscountAppliedBar } from './DiscountAppliedBar'

const mapStateToProps = (state) => {
  const promoBannerState = getPromoBannerState(state)

  return {
    promoModalVisible: state.promoModalVisible,
    promoBannerState,
    isPromoBarHidden: promoBannerState.hide,
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
