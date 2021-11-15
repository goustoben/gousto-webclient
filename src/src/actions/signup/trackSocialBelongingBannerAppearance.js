import { getUTMAndPromoCode } from "selectors/tracking"
import { signupSocialBelongingBanner } from "actions/trackingKeys"

export const trackSocialBelongingBannerAppearance = () => (dispatch, getState) => {
  const state = getState()
  const {promoCode, UTM} = getUTMAndPromoCode(state)
  const district = state.signup.getIn(['wizard', 'district'])
  const amountOfCustomers = state.signup.getIn(['wizard', 'amountOfCustomers'])

  dispatch({
    type: signupSocialBelongingBanner,
    trackingData: {
      actionType: signupSocialBelongingBanner,
      ...UTM,
      promo_code: promoCode,
      district,
      number_of_customers: amountOfCustomers,
    },
  })
}
