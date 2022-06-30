import { promoChange, promoToggleModalVisibility } from 'actions/promos'
import { redirect } from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts'
import { getPromoBannerState } from 'utils/home'
import logger from 'utils/logger'

const getIsTestAllocationFactoryEnabled = isOptimizelyFeatureEnabledFactory(
  'beetroots_test_allocation_factory_web',
)

const getIsTwoMonthPromoCodeEnabled = isOptimizelyFeatureEnabledFactory(
  'beetroots_two_month_promo_code_web_enabled',
)

export const applyPromoCodeAndShowModal = () => async (dispatch, getState) => {
  const state = getState()
  const isTwoMonthPromoCodeEnabled = await getIsTwoMonthPromoCodeEnabled(dispatch, getState)

  const { promoCode, canApplyPromo } = getPromoBannerState(state, isTwoMonthPromoCodeEnabled)

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

export const homeGetStarted = (ctaUri, sectionForTracking) => async (dispatch, getState) => {
  if (sectionForTracking) {
    dispatch(trackGetStarted(sectionForTracking))
  }

  await dispatch(applyPromoCodeAndShowModal())

  dispatch(redirect(ctaUri))

  const isTestAllocationFactoryEnabled = await getIsTestAllocationFactoryEnabled(dispatch, getState)
  logger.info(`beetroots_test_allocation_factory_web=${isTestAllocationFactoryEnabled}`)
}

export const homeActions = {
  homeGetStarted,
  applyPromoCodeAndShowModal,
}
