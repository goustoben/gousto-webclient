import Immutable from 'immutable'
import { Store } from 'redux'
import actions from 'actions'
import {
  canLandOnStepWithoutRedirecting,
  findStepBySlug,
  getPromocodeQueryParam,
  stepByName,
} from 'utils/signup'
import { invokeHotjarEvent } from 'utils/hotjarUtils'
import { getSignupSteps } from 'routes/Signup/utils/getSignupSteps'
import { hotjarSkipWizard } from 'actions/trackingKeys'
import routes from 'config/routes'

/**
 * DO NOT import anywhere, type is exported for tests.
 * Part of redux store used by openProperStep.
 */
export type OpenStepStore = {
  features: unknown
  signup: unknown
  menuCutoffUntil: unknown
  menuBoxPrices: Immutable.Set<unknown>
  promoStore: unknown
}

/**
 * Part of app store that is used by openProperStep.
 */
type ApplicationStore = Store<OpenStepStore, any>

const redirectToMenu = (store: ApplicationStore): void => {
  invokeHotjarEvent(hotjarSkipWizard)
  store.dispatch(actions.redirect(routes.client.menu))
}

const redirectToFirstStep = (
  store: ApplicationStore,
  firstStepUrl: string,
  promoCode?: string,
): void => {
  store.dispatch(
    actions.redirect(
      `${routes.client.signup}/${firstStepUrl}${getPromocodeQueryParam(promoCode, '?')}`,
    ),
  )
}

/**
 * Opens proper step in Signup wizard.
 */
export const openProperStep = async (
  store: ApplicationStore,
  query: {
    /**
     * Optional promo code provided.
     */
    promo_code?: string
  } = {},
  params: {
    /**
     * Current step name.
     */
    stepName?: string
  } = {},
  options: {
    isGoustoOnDemandEnabled?: boolean
    shouldSkipWizardByFeature?: boolean
  } = {},
): Promise<void> => {
  if (options.shouldSkipWizardByFeature && !options.isGoustoOnDemandEnabled) {
    redirectToMenu(store)
  }

  const steps = await getSignupSteps(store)
  store.dispatch(actions.signupStepsReceive(steps))
  const firstStep = stepByName(steps.first())
  const firstStepUrl = firstStep.get('slug')
  const currentStep = params.stepName // step user just landed on

  if (!currentStep) {
    redirectToFirstStep(store, firstStepUrl, query.promo_code)

    return
  }

  if (!canLandOnStepWithoutRedirecting(currentStep)) {
    redirectToFirstStep(store, firstStepUrl, query.promo_code)

    return
  }

  const actualStep = findStepBySlug(currentStep) || firstStep
  store.dispatch(actions.signupSetStep(actualStep))
}
