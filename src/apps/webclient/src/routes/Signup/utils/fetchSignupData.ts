import actions from 'actions'
import Immutable from 'immutable'
import { Store } from 'redux'

import { menuLoadBoxPrices } from 'actions/menu'
import { promoGet } from 'actions/promos'
import { signupConfig } from 'config/signup'
import { getCurrentPromoCodeData } from 'routes/Signup/signupSelectors'
import { getPromoCode } from 'selectors/basket'

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
   * Flags to consider.
   */
  options?: {
    isGoustoOnDemandEnabled?: boolean
  }
}

/**
 * Component.loadData implementation for <Signup /> component.
 * Should only fetch data and have no logic around page redirects.
 * @param store - application redux store
 * @param params - step info that would be used if some of params.options flags would be true
 * @param query - URL query info
 */
export const fetchSignupData = async ({
  store,
  params = {},
  options = {},
}: FetchSignupDataParams): Promise<void> => {
  await loadMenuDays(store)
  if (options.isGoustoOnDemandEnabled && params.stepName !== signupConfig.checkAccountPageSlug) {
    await loadBoxPricesAndPromoCode(store)
  }
}
