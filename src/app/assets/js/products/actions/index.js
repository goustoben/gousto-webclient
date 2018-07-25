import Gousto from '@fe/gousto-generic'
import actionUtils from './actionUtils'
import CONFIG from '@fe/gousto-config'
const CONSTANTS = CONFIG.PRODUCTS
const API = CONFIG.PRODUCTS.ROUTES.API

const Actions = {
	receiveCategory(categories) {
		return {
			type: CONSTANTS.LOAD_CATEGORY,
			categories,
		}
	},

	receiveProduct(products) {
		return {
			type: CONSTANTS.LOAD_PRODUCT,
			products,
		}
	},
	receiveInitialUserChoices(choices) {
		return {
			type: CONSTANTS.LOAD_INITIAL_CHOICES,
			choices,
		}
	},
	receiveGiftProduct(products) {
		return {
			type: CONSTANTS.LOAD_GIFT_PRODUCT,
			gifts: products,
		}
	},

	getAllCategories() {
		return dispatch => {
			actionUtils.loadStateData(
				`${API.CATEGORIES}?includes[]=relationships`,
				(categories) => {
					categories.forEach(category => {
						if (typeof category.is_default !== 'undefined' && category.is_default === true) {
							dispatch(this.selectCategory(category.id))
						}
					})

					dispatch(this.receiveCategory(categories))
				}
			)
		}
	},

	getAllProducts(periodId, loadUserChoices) {
		let q = '?includes[]=categories&includes[]=attributes&sort=position'
		q += `&image_sizes[]=${CONSTANTS.IMAGE_SMALL}`
		q += `&image_sizes[]=${CONSTANTS.IMAGE_LARGE}`
		if (typeof periodId !== 'undefined') {
			q += `&period_id=${periodId}`
		}

		return (dispatch, getState) => {
			actionUtils.loadStateData(
				API.PRODUCTS + q,
				(products) => {
					dispatch(this.receiveProduct(products))
					loadUserChoices()
					dispatch(this.receiveInitialUserChoices(getState().userChoices))
					dispatch({
						type: CONSTANTS.LOAD_PRODUCT_COUNT,
						stock: getState().stock,
						products,
					})
				}
			)
		}
	},

	getGiftProducts(gifts) {
		const productIds = []
		gifts.forEach((gift) => {
			if (gift.itemable_type.toLowerCase() === 'product') {
				productIds.push(gift.itemable_id)
			}
		})
		const opts = {
			image_sizes: [CONSTANTS.IMAGE_SMALL, CONSTANTS.IMAGE_LARGE],
			ids: productIds,
		}

		if (productIds.length === 0) {
			return dispatch => {
				dispatch(this.receiveGiftProduct([]))
			}
		}

		return dispatch => {
			actionUtils.loadStateDataPromise(API.PRODUCTS, opts)
			.then((products) => {
				dispatch(this.receiveGiftProduct(products))
			})
		}
	},

	getStock() {
		return (dispatch, getState) => {
			const url = CONFIG.CORE.ROUTES.PRODUCT_STOCK
			Gousto.ajaxCall(url, 'GET', {}, (data) => {
				const stock = {}
				Object.keys(data).forEach((key) => {
					const productId = data[key].product_id
					stock[productId] = parseInt(data[key].number, 10)
				})
				dispatch({
					type: CONSTANTS.LOAD_STOCK,
					stock,
				})
				dispatch({
					type: CONSTANTS.LOAD_PRODUCT_COUNT,
					stock: getState().stock,
					products: getState().products,
				})
			})
		}
	},

	selectCategory(id) {
		return {
			type: CONSTANTS.SELECT_CATEGORY,
			id,
		}
	},

	qtyChange(id, delta, price, checkLimits = true) {
		return (dispatch, getState) => {
			let state = getState()

			if (!checkLimits || (checkLimits && !actionUtils.checkLimitReached(delta, id, state))) {
				let type = CONSTANTS.INCREMENT_PRODUCT
				if (delta < 0) {
					type = CONSTANTS.DECREMENT_PRODUCT
				}
				dispatch({ type, id, delta, price })

				state = getState()
				const productsLimitReached = []
				state.products.forEach((product) => {
					productsLimitReached.push({
						id: product.get('id'),
						limitReached: actionUtils.checkLimitReached(1, product.get('id'), state),
					})
				})

				dispatch({
					type: CONSTANTS.CAN_ADD_MORE,
					data: productsLimitReached,
				})
			}
		}
	},

	loadUserDetails(data) {
		return (dispatch) => {
			dispatch(this.setAgeVerified(data.ageVerified, false))
			dispatch({
				type: CONSTANTS.LOAD_USER_DATA,
				data,
			})
		}
	},

	loadOrderDetails(data) {
		return {
			type: CONSTANTS.LOAD_ORDER_DATA,
			data,
		}
	},

	setAgeVerified(value, hardSave) {
		return (dispatch, getState) => {
			if (hardSave && value === true) {
				const state = getState()
				const url = `${CONFIG.CORE.ROUTES.BASE}/user/${state.user.get('id', '')}`
				Gousto.ajaxCall(url, 'PUT', { age_verified: Number(value) })
			}

			dispatch({
				type: CONSTANTS.AGE_VERIFY,
				ageVerified: value,
			})
		}
	},

	saveChoices() {
		return (dispatch, getState) => {
			const state = getState()
			const submitData = []
			state.userChoices.forEach((productItems, id) => {
				const qty = productItems.reduce((sum, productItem) => (
					sum + productItem.get('qty')
				), 0)

				submitData.push({
					id,
					quantity: qty,
					type: 'Product',
				})
			})

			dispatch({
				type: CONSTANTS.SAVE_IN_PROGRESS,
			})

			Gousto.ajaxCall(
				`${CONFIG.CORE.ROUTES.BASE}/order/${state.order.get('id')}/updateProducts`,
				'PUT',
				{ product_choices: submitData },
				() => {
					dispatch({
						type: CONSTANTS.SAVE_FINISHED,
					})
				},
				errorInfo => {
					dispatch({
						type: CONSTANTS.SAVE_FINISHED,
					})
					alert(`An error occured: ${errorInfo}`)
				}
			)
		}
	},

	showDetails(id, visibility) {
		let type
		if (visibility === 'show') {
			type = CONSTANTS.PRODUCT_DETAILS_SHOW
		} else {
			type = CONSTANTS.PRODUCT_DETAILS_HIDE
		}

		return {
			type,
			id,
		}
	},
}

module.exports = Actions
