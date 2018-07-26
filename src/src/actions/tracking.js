import logger from 'utils/logger'
import actionTypes from './actionTypes'
import { getUserOrderById } from 'utils/user'

export const trackFirstPurchase = orderId => (
	(dispatch, getState) => {
		const user = getState().user
		const goustoReference = user.get('goustoReference')
		const order = getUserOrderById(orderId, user.get('orders'))

		if (!goustoReference) {
			logger.warning('Missing user data for first purchase tracking: no user found in store')
		}

		if (!order.get('prices')) {
			logger.warning(`Missing order data for first purchase tracking: no user order "${orderId}" found in store`)
		}

		dispatch({
			type: actionTypes.TRACKING,
			trackingData: {
				actionType: actionTypes.TRACKING,
				asource: getState().tracking.get('asource'),
				goustoReference,
				event: 'firstPurchase',
				orderId,
				orderTotal: order.getIn(['prices', 'total']),
				voucher: order.getIn(['prices', 'promoCode'], ''),
			},
		})
	}
)

export const setAffiliateSource = asource => (
	dispatch => {
		dispatch({
			type: actionTypes.AFFILIATE_SOURCE_SET,
			asource,
		})
	}
)

export const trackRecipeOrderDisplayed = (originalOrder, displayedOrder, collectionId) => (
	(dispatch, getState) => {
		const date = getState().basket.get('date')
		const deliveryDayId = getState().boxSummaryDeliveryDays.getIn([date, 'id'])
		const orderId = getState().basket.get('orderId')
		const browseMode = getState().menuBrowseCtaShow
		const recommended = getState().recipes.some(recipe => recipe.get('isRecommended', false))
		const recipesVisible = !(getState().menu.get('filtersMenuVisible'))

		if (recipesVisible) {
			dispatch({
				type: actionTypes.RECIPES_DISPLAYED_ORDER_TRACKING,
				originalOrder,
				displayedOrder,
				collectionId,
				deliveryDayId,
				orderId,
				recommended,
				browseMode,
			})
		}
	}
)

export const trackRecipeFiltersOpen = () => (
	(dispatch) => {
		dispatch({
			type: actionTypes.RECIPE_FILTERS_OPEN_TRACKING,
		})
	}
)

export const trackRecipeFiltersClose = () => (
	(dispatch) => {
		dispatch({
			type: actionTypes.RECIPE_FILTERS_CLOSE_TRACKING,
		})
	}
)

export const trackRecipeCollectionSelect = (collectionId) => (
	(dispatch) => {
		dispatch({
			type: actionTypes.RECIPE_COLLECTION_SELECT_TRACKING,
			collectionId,
		})
	}
)

export const trackRecipeFiltersApply = (collectionId) => (
	(dispatch) => {
		dispatch({
			type: actionTypes.RECIPE_FILTERS_APPLY_TRACKING,
			collectionId,
		})
	}
)

export default {
	trackFirstPurchase,
	setAffiliateSource,
	trackRecipeOrderDisplayed,
}
