import { redirect } from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import { hotjarSkipWizard } from 'actions/trackingKeys'
import { promoChange, promoToggleModalVisibility } from 'actions/promos'
import { getPromoBannerState } from 'utils/home'
import logger from 'utils/logger'
import { invokeHotjarEvent } from 'utils/hotjarUtils'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts'
import { getIsSkipWizardEnabled } from 'routes/Signup/signupSelectors'
import { getIsAuthenticated } from 'selectors/auth'
import routesConfig from 'config/routes'

const getIsTestAllocationFactoryEnabled = isOptimizelyFeatureEnabledFactory('beetroots_test_allocation_factory_web')

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

export const homeGetStarted = (ctaUri, sectionForTracking) => async (dispatch, getState) => {
  if (sectionForTracking) {
    dispatch(trackGetStarted(sectionForTracking))
  }

  await dispatch(applyPromoCodeAndShowModal())

  const state = getState()
  const isSkipWizardEnabled = getIsSkipWizardEnabled(state)
  const isAuthenticated = getIsAuthenticated(state)
  const shouldSkipWizardByFeature = !isAuthenticated && isSkipWizardEnabled

  if (shouldSkipWizardByFeature) {
    const { menu } = routesConfig.client
    const targetUri = menu
    invokeHotjarEvent(hotjarSkipWizard)
    dispatch(redirect(targetUri))
  } else {
    dispatch(redirect(ctaUri))
  }

  const isTestAllocationFactoryEnabled = await getIsTestAllocationFactoryEnabled(dispatch, getState)
  logger.info(`beetroots_test_allocation_factory_web=${isTestAllocationFactoryEnabled}`)
}

export const homeActions = {
  homeGetStarted,
  applyPromoCodeAndShowModal,
}
