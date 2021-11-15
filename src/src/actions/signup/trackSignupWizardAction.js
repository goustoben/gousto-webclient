import { getUTMAndPromoCode } from "selectors/tracking"

export const trackSignupWizardAction = (type, additionalData = {}) => (dispatch, getState) => {
  const {promoCode, UTM} = getUTMAndPromoCode(getState())

  dispatch({
    type,
    trackingData: {
      actionType: type,
      ...UTM,
      promoCode,
      ...additionalData,
    },
  })
}
