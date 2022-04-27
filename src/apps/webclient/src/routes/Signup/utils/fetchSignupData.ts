import Immutable, { Map } from 'immutable'
import { Store } from 'redux'
import { signupConfig } from 'config/signup'
import {
  canLandOnStepWithoutRedirecting,
  findStepBySlug,
  getPromocodeQueryParam,
  stepByName,
} from 'utils/signup'
import { getCurrentPromoCodeData } from 'routes/Signup/signupSelectors'
import { getPromoCode } from 'selectors/basket'
import actions from 'actions'
import { menuLoadBoxPrices } from 'actions/menu'
import { promoGet } from 'actions/promos'
import { invokeHotjarEvent } from 'utils/hotjarUtils'
import { getSignupSteps } from 'routes/Signup/utils/getSignupSteps'
import { hotjarSkipWizard } from 'actions/trackingKeys'
import routes from 'config/routes'

const postCodePath = '/signup/postcode'

/**
 * DO NOT import anywhere, type is exported for tests.
 */
export type GetSignupDataStore = {
  features: unknown
  signup: unknown
  menuCutoffUntil: unknown
  menuBoxPrices: Immutable.Set<unknown>
  promoStore: unknown
}

/**
 * Part of app store that is used by fetchSignupData
 */
type ApplicationStore = Store<GetSignupDataStore, any>

/**
 * Loads menu days into application store if days are absent.
 */
const loadMenuDays = async (store: ApplicationStore): Promise<void> => {
  if (!store.getState().menuCutoffUntil) {
    await store.dispatch(actions.menuLoadDays())
  }
}

/**
 * If shouldSetStepFromParams, then set either default step or step from params.
 */
const considerSettingStepFromParams = (
  store: ApplicationStore,
  defaultStep: Map<string, string>,
  shouldSetStepFromParams?: boolean,
  paramsStepName?: string,
): void => {
  let stepToSet = defaultStep

  if (shouldSetStepFromParams) {
    const requestedStep = findStepBySlug(paramsStepName)
    if (requestedStep) {
      stepToSet = requestedStep
    }
  }

  store.dispatch(actions.signupSetStep(stepToSet))
}

const loadBoxPricesAndPromoCode = async (store: ApplicationStore): Promise<void> => {
  const state = store.getState()
  if (state.menuBoxPrices.size === 0) {
    store.dispatch(menuLoadBoxPrices())
  }

  const basketPromoCode = getPromoCode(state)
  if (basketPromoCode && !getCurrentPromoCodeData(state)) {
    await store.dispatch(promoGet(basketPromoCode))
  }
}

/**
 * Redirect to menu.
 */
const skipWizard = (store: ApplicationStore): void => {
  invokeHotjarEvent(hotjarSkipWizard)
  store.dispatch(actions.redirect(routes.client.menu))
}

const processStepFromQueryAndParams = (
  store: ApplicationStore,
  query: {
    steps?: string
    promo_code?: string
  } = {},
  params: {
    stepName?: string
    pathname?: string
  } = {},
  firstStep: Map<string, string>,
  shouldSetStepFromParams: boolean | undefined,
): void => {
  const promoCode = query.promo_code
  const querySteps = query.steps?.split(',') || []
  if (!params.stepName && querySteps.length === 0) {
    // No Step specified and no query string specified
    store.dispatch(
      actions.redirect(
        `${routes.client.signup}/${firstStep.get('slug')}${getPromocodeQueryParam(promoCode, '?')}`,
      ),
    )
  } else if (!params.stepName && querySteps.length > 0) {
    // No Step specified but query steps overwrite
    const step = stepByName(querySteps.slice(0, 1).pop())
    const futureSteps = querySteps.join(',')

    store.dispatch(
      actions.redirect(
        `${routes.client.signup}/${step.get('slug')}?steps=${futureSteps}${getPromocodeQueryParam(
          promoCode,
        )}`,
      ),
    )
  } else if (
    // Step landed is not the first step
    params.stepName &&
    firstStep.get('slug') !== params.stepName &&
    !canLandOnStepWithoutRedirecting(params.stepName) &&
    params.pathname !== postCodePath &&
    !shouldSetStepFromParams
  ) {
    store.dispatch(
      actions.redirect(
        `${routes.client.signup}/${firstStep.get('slug')}${getPromocodeQueryParam(promoCode, '?')}`,
      ),
    )
  }
}

interface FetchSignupDataParams {
  /**
   * Application redux store.
   */
  store: ApplicationStore
  /**
   * Additional params what would be used based on FetchSignupDataParams["options"] flags
   */
  params?: {
    stepName?: string
    pathname?: string
  }
  /**
   * URL query params.
   */
  query?: {
    steps?: string
    promo_code?: string
  }
  /**
   * Flags to consider.
   */
  options?: {
    shouldSetStepFromParams?: boolean
    isGoustoOnDemandEnabled?: boolean
    shouldSkipWizardByFeature?: boolean
  }
}

/**
 * Component.loadData implementation for <Signup /> component.
 * @param store - application redux store
 * @param params - step info that would be used if some of params.options flags would be true
 * @param query - URL query info
 * @param options - flags to consider
 */
export const fetchSignupData = async ({
  store,
  params = {},
  query = {},
  options = {},
}: FetchSignupDataParams): Promise<void> => {
  const querySteps = query.steps?.split(',') || []
  const steps = getSignupSteps(store, querySteps)
  await loadMenuDays(store)
  store.dispatch(actions.signupStepsReceive(steps))

  const { isGoustoOnDemandEnabled, shouldSkipWizardByFeature, shouldSetStepFromParams } = options
  const firstStep = stepByName(steps.first())

  // redundant
  processStepFromQueryAndParams(store, query, params, firstStep, shouldSetStepFromParams)
  // redundant
  considerSettingStepFromParams(store, firstStep, shouldSetStepFromParams, params.stepName)

  if (isGoustoOnDemandEnabled && params.stepName !== signupConfig.checkAccountPageSlug) {
    await loadBoxPricesAndPromoCode(store)
  }

  if (!isGoustoOnDemandEnabled && shouldSkipWizardByFeature) {
    skipWizard(store)
  }
}
