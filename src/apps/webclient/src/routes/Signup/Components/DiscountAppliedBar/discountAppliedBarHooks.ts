import { useSelector, useDispatch } from 'react-redux'

import { signupDismissDiscountAppliedBar } from 'actions/signup'

import { trackDiscountVisibilityBannerAppearance } from './discountAppliedBarActions'
import { getDiscountAppliedBarData } from './discountAppliedBarSelectors'

export const useGetDiscountAppliedBarData = (wizardStep: string) => {
  const { isDiscountAppliedBarDismissed, promoModalVisible, isPromoBarHidden, promocode, UTM } =
    useSelector(getDiscountAppliedBarData)
  const dispatch = useDispatch()
  const dispatchDismissSignupDiscountAppliedBar = () => dispatch(signupDismissDiscountAppliedBar())
  const dispatchTrackDiscountVisibilityBannerAppearance = () =>
    dispatch(trackDiscountVisibilityBannerAppearance(wizardStep, promocode, UTM))

  return {
    isDiscountAppliedBarDismissed,
    promoModalVisible,
    isPromoBarHidden,
    dispatchDismissSignupDiscountAppliedBar,
    dispatchTrackDiscountVisibilityBannerAppearance,
  }
}
