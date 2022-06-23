import * as trackingKeys from 'actions/trackingKeys'

export const trackDiscountVisibilityBannerAppearance = (
  wizardStep: string,
  UTM: any,
  promoCode: string,
) => ({
  type: trackingKeys.discountVisibilityBannerDisplayed,
  trackingData: {
    actionType: trackingKeys.discountVisibilityBannerDisplayed,
    ...UTM,
    promoCode,
    step: wizardStep,
  },
})
