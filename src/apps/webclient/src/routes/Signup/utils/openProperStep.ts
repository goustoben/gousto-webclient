import actions from 'actions'
import Immutable from 'immutable'
import { Store } from 'redux'

import routes from 'config/routes'
import {
  canLandOnStepWithoutRedirecting,
  findStepBySlug,
  getPromocodeQueryParam,
  stepByName,
} from 'utils/signup'

import { SignupSteps } from '../constants/SignupSteps'

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
  stepNames: Immutable.List<SignupSteps>,
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
    secondarySlug?: string
  } = {},
): Promise<void> => {
  const firstStep = stepByName(stepNames.first())
  const firstStepUrl = firstStep.get('slug')
  const currentStep = params.secondarySlug // step user just landed on

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
