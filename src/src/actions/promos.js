import actionTypes from './actionTypes'
import { fetchPromo, fetchPromocodeFromCampaignUrl } from 'apis/promos'
import statusActions from './status'
import userActions from './user'
import basketActions from './basket'
import productActions from './products'
import menuActions from './menu'
import { legacyVerifyAge } from 'apis/legacy'

const { pending, error } = statusActions

const promoRecieve = promo => ({
	type: actionTypes.PROMO_RECIEVE,
	promo,
})

const promoGet = code => (
	async (dispatch, getState) => {
		dispatch(pending(actionTypes.PROMO_GET, true))
		dispatch(error(actionTypes.PROMO_GET, null))
		const accessToken = getState().auth.get('accessToken')
		let promo
		let errored

		try {
			const { data } = await fetchPromo(accessToken, code)
			promo = data
		} catch (e) {
			errored = true
			dispatch(error(actionTypes.PROMO_GET, e.message))
		}

		try {
			if (Boolean(promo.codeData.campaign.enabled) === false) {
				dispatch(error(actionTypes.PROMO_GET, 'not-exist'))
				errored = true
			}
		} catch (e) {
			errored = true
		}

		promo.hasAgeRestricted = false
		promo.justApplied = false

		const isAuthenticated = getState().auth.get('isAuthenticated')

		if (promo && promo.addGiftOrderRules) {
			const productIds = promo.addGiftOrderRules
				.filter(rule => rule.type === 'Product')
				.map(rule => rule.id)
			await dispatch(productActions.productsLoadProductsById(productIds))

			const state = getState()
			const ageRestricted = productIds
				.map(id => state.products.get(id))
				.filter(product => product.get('ageRestricted'))

			const needsUserData = ageRestricted
				.length > 0 && !state.user.get('id', false) && isAuthenticated

			promo.hasAgeRestricted = Boolean(ageRestricted.length)

			if (needsUserData) {
				await dispatch(userActions.userLoadData())
			}
		}

		if (isAuthenticated) {
			if (promo.hasAgeRestricted) {
				if (getState().user.get('ageVerified', false)) {
					try {
						await dispatch(userActions.userPromoApplyCode(code))
						promo.justApplied = true
					} catch (error) {
						throw new Error('Promo cannot be applied')
					}
				}
			} else {
				try {
					await dispatch(userActions.userPromoApplyCode(code))
					promo.justApplied = true
				} catch (error) {
					throw new Error('Promo cannot be applied')
				}
			}
		}

		dispatch(pending(actionTypes.PROMO_GET, false))
		if (!errored) {
			dispatch(promoRecieve(promo))
		}
	}
)

const promoCurrentSet = code => ({
	type: actionTypes.PROMO_SET,
	code,
})

const promoChange = code => (
	async (dispatch, getState) => {
		if (!getState().promoStore.get(code, null)) {
			await dispatch(promoGet(code))
		}
		if (!getState().error.get(actionTypes.PROMO_GET)) {
			dispatch(promoCurrentSet(code))
		}
	}
)

const promoGetFromLandingPage = landingUrl => (
	async (dispatch, getState) => {
		let promocode
		let errored

		try {
			const { data: code } = await fetchPromocodeFromCampaignUrl(null, landingUrl)
			promocode = code.promocode
		} catch (e) {
			errored = true
			dispatch(error(actionTypes.PROMO_GET, e.message))
		}

		if (!errored && promocode) {
			await promoChange(promocode.toUpperCase())(dispatch, getState)
		}
	}
)

const promoClear = () => ({
	type: actionTypes.PROMO_SET,
	code: '',
})

const promoToggleModalVisibility = visible => ({
	type: actionTypes.PROMO_MODAL_VISIBILITY_CHANGE,
	visible,
})

const promoCloseModal = () => (
	dispatch => {
		dispatch(promoToggleModalVisibility(false))
		setTimeout(() => {
			dispatch(promoClear())
			dispatch(error(actionTypes.PROMO_APPLY, ''))
			dispatch(error(actionTypes.PROMO_GET, ''))
		}, 750)
	}
)

const promoApply = () => (
	async (dispatch, getState) => {
		if (!getState().pending.get(actionTypes.PROMO_APPLY, false)) {
			const code = getState().promoCurrent
			const hasAgeRestricted = getState().promoStore.getIn([code, 'hasAgeRestricted'], false)
			dispatch(pending(actionTypes.PROMO_APPLY, true))
			const ageVerified = getState().promoAgeVerified

			if (hasAgeRestricted) {
				if (ageVerified) {
					try {
						if (getState().auth.get('isAuthenticated')) {
							await dispatch(userActions.userVerifyAge(ageVerified, true))
							await dispatch(userActions.userPromoApplyCode(code))
						} else {
							dispatch(basketActions.basketPromoCodeChange(code))
							await legacyVerifyAge()
						}
						await dispatch(menuActions.menuLoadBoxPrices())
					} catch (e) {
						dispatch(pending(actionTypes.PROMO_APPLY, false))
						dispatch(error(actionTypes.PROMO_APPLY, e.message))
						throw e
					}
				}
			} else {
				if (getState().auth.get('isAuthenticated')) {
					try {
						await dispatch(userActions.userPromoApplyCode(code))
						await dispatch(menuActions.menuLoadBoxPrices())
					} catch (e) {
						dispatch(error(actionTypes.PROMO_APPLY, e))
						dispatch(pending(actionTypes.PROMO_APPLY, false))
						throw e
					}
				} else {
					dispatch(basketActions.basketPromoCodeChange(code))
					await dispatch(menuActions.menuLoadBoxPrices())
				}
			}

			dispatch(pending(actionTypes.PROMO_APPLY, false))

			dispatch(promoCloseModal())
		}
	}
)

const promoAgeVerify = ageVerified => ({
	type: actionTypes.PROMO_AGE_VERIFY,
	ageVerified,
})

export default {
	promoChange,
	promoApply,
	promoCloseModal,
	promoToggleModalVisibility,
	promoAgeVerify,
	promoGetFromLandingPage,
	promoGet,
}
