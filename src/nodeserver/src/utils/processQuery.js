import logger from 'utils/logger'
import promosActions from 'actions/promos'
import trackingActions from 'actions/tracking'

async function processQuery(query, store) {
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
				store.dispatch(promosActions.promoToggleModalVisibility(true))
			}
		}
	}

	if (query.asource) {
		store.dispatch(trackingActions.setAffiliateSource(query.asource))
	}
}

export default processQuery
