import { redirect } from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import promoActions from 'actions/promos'
import { getIsPromoCodeOnGetStartedEnabled } from 'selectors/features'
import { getPromoBannerState } from 'utils/home'
import logger from 'utils/logger'

const getStartedBaseline = (dispatch, ctaUri, sectionForTracking) => {
  dispatch(redirect(ctaUri))
  if (sectionForTracking) {
    dispatch(trackGetStarted(sectionForTracking))
  }
}

const attemptToGetStartedWithPromoCode = async (dispatch, state, ctaUri, sectionForTracking) => {
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
  if (sectionForTracking) {
    dispatch(trackGetStarted(sectionForTracking))
  }
  dispatch(promoToggleModalVisibility(true))

  return true
}

export const homeGetStarted = (ctaUri, sectionForTracking) => (
  async (dispatch, getState) => {
    const state = getState()

    if (getIsPromoCodeOnGetStartedEnabled(state)) {
      const success = await attemptToGetStartedWithPromoCode(dispatch, state, ctaUri, sectionForTracking)

      if (!success) {
        getStartedBaseline(dispatch, ctaUri, sectionForTracking)
      }
    } else {
      getStartedBaseline(dispatch, ctaUri, sectionForTracking)
    }
  }
)

export const homeActions = {
  homeGetStarted
}
