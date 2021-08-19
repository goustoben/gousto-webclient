import { redirect } from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import { promoChange, promoToggleModalVisibility } from 'actions/promos'
import { getPromoBannerState } from 'utils/home'
import logger from 'utils/logger'

export const applyPromoCodeAndShowModal = () => async (dispatch, getState) => {
  const state = getState()
  const { promoCode, canApplyPromo } = getPromoBannerState(state)

  if (!canApplyPromo) {
    return
  }

  try {
    await dispatch(promoChange(promoCode))
  } catch (err) {
    logger.warning(`error fetching promo code ${promoCode} - ${err.message}`, err)

    return
  }

  dispatch(promoToggleModalVisibility(true))
}

export const homeGetStarted = (ctaUri, sectionForTracking) => async (dispatch) => {
  if (sectionForTracking) {
    dispatch(trackGetStarted(sectionForTracking))
  }

  await dispatch(applyPromoCodeAndShowModal())

  dispatch(redirect(ctaUri))
}

export const homeActions = {
  homeGetStarted,
  applyPromoCodeAndShowModal,
}
