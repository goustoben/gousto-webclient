import { RootStateOrAny } from 'react-redux'
import { createSelector } from 'reselect'

import { getPromoBannerState, PromoBannerState } from 'utils/home'

interface PartialState {
  isDiscountAppliedBarDismissed: boolean
  promoModalVisible: boolean
  promoBannerState: PromoBannerState
  UTM: any
}

const getPartialState = (state: RootStateOrAny): PartialState => {
  return {
    isDiscountAppliedBarDismissed: state.signup.get('isDiscountAppliedBarDismissed'),
    promoModalVisible: state.promoModalVisible,
    // FYI: Note: we don't use promoCode here, so we don't have to pass
    // isTwoMonthPromoCodeEnabled.
    promoBannerState: getPromoBannerState(state),
    UTM: state.tracking.get('utmSource'),
  }
}

export const getDiscountAppliedBarData = createSelector(getPartialState, ({
  isDiscountAppliedBarDismissed,
  promoModalVisible,
  promoBannerState,
  UTM,
}) => ({
  isDiscountAppliedBarDismissed,
  promoModalVisible,
  isPromoBarHidden: !promoBannerState.canApplyPromo,
  promocode: promoBannerState.promoCode,
  UTM,
}))
