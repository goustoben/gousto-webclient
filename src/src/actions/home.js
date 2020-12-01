import { redirect } from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import promoActions from 'actions/promos'
import { getPromoBannerState } from 'utils/home'
import logger from 'utils/logger'

export const applyPromoCodeAndRedirect = async (dispatch, state, ctaUri) => {
  const { hide, promoCode, canApplyPromo } = getPromoBannerState(state)

  if (hide || !canApplyPromo) {
    return false
  }

  const { promoChange, promoToggleModalVisibility } = promoActions

  try {
    await dispatch(promoChange(promoCode))
  } catch (err) {
    logger.warning(`error fetching promo code ${promoCode} - ${err.message}`, err)

    return false
  }

  dispatch(redirect(ctaUri))
  dispatch(promoToggleModalVisibility(true))

  return true
}

export const homeGetStarted = (ctaUri, sectionForTracking) => (
  async (dispatch, getState) => {
    const state = getState()
    const success = await applyPromoCodeAndRedirect(dispatch, state, ctaUri)

    if (!success) {
      dispatch(redirect(ctaUri))
    }

    if (sectionForTracking) {
      dispatch(trackGetStarted(sectionForTracking))
    }
  }
)

export const homeActions = {
  homeGetStarted,
  applyPromoCodeAndRedirect,
}
