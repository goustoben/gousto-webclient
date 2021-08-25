import logger from 'utils/logger'
import { basketPromoCodeChange } from 'actions/basket'
import promosActions, { promoChange, promoToggleModalVisibility } from 'actions/promos'
import { setAffiliateSource } from 'actions/tracking'
import { signupSetGoustoOnDemandEnabled } from 'actions/signup'
import { getIsAuthenticated } from 'selectors/auth'

async function processQuery(query, store, { hashTag = '', }) {
  if (!query || !store) {
    return
  }

  if (query.gousto_on_demand) {
    store.dispatch(signupSetGoustoOnDemandEnabled(true))
  }

  if (query.promo_code) {
    const promoCode = `${query.promo_code}`.toUpperCase()
    let error

    try {
      await store.dispatch(promoChange(promoCode))
    } catch (err) {
      error = err
      if (query.gousto_on_demand) {
        store.dispatch(basketPromoCodeChange(''))
        store.dispatch(signupSetGoustoOnDemandEnabled(false))
      }
      logger.warning(`error fetching promo code ${promoCode} - ${err.message}`, err)
    }
    if (!error) {
      if (query.noPromoModal === 'true') {
        store.dispatch(promosActions.promoApply())
      } else {
        const isOfNoLoginHashTag = hashTag.indexOf('login') === -1
        const isAuthenticated = getIsAuthenticated(store.getState())
        if (isOfNoLoginHashTag || isAuthenticated) {
          store.dispatch(promoToggleModalVisibility(true))
        } else {
          store.dispatch(basketPromoCodeChange(promoCode))
        }
      }
    }
  }

  if (query.asource) {
    store.dispatch(setAffiliateSource(query.asource))
  }
}

export default processQuery
