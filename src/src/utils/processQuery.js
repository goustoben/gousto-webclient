import logger from 'utils/logger'
import basketActions from 'actions/basket'
import promosActions from 'actions/promos'
import trackingActions from 'actions/tracking'
import { getIsAuthenticated } from 'selectors/auth'

async function processQuery(query, store, { hashTag = '', }) {
  if (!query || !store) {
    return
  }

  if (query.promo_code) {
    const promoCode = `${query.promo_code}`.toUpperCase()
    let error

    try {
      await store.dispatch(promosActions.promoChange(promoCode))
    } catch (err) {
      error = err
      logger.warning(`error fetching promo code ${promoCode} - ${err.message}`, err)
    }
    if (!error) {
      if (query.noPromoModal === 'true') {
        store.dispatch(promosActions.promoApply())
      } else {
        const isOfNoLoginHashTag = hashTag.indexOf('login') === -1
        const isAuthenticated = getIsAuthenticated(store.getState())
        if (isOfNoLoginHashTag || isAuthenticated) {
          store.dispatch(promosActions.promoToggleModalVisibility(true))
        } else {
          store.dispatch(basketActions.basketPromoCodeChange(promoCode))
        }
      }
    }
  }

  if (query.asource) {
    store.dispatch(trackingActions.setAffiliateSource(query.asource))
  }
}

export default processQuery
