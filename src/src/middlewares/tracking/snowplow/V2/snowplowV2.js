import actions from 'actions/actionTypes'
import globals from 'config/globals'
import windowUtils from 'utils/window'
import logger from 'utils/logger'
import trackingGlobals from '../global'
import basketTracking from '../basket'
import pauseSubscriptionTracking from '../pauseSubscription'
import recipesTracking from '../recipes'
import trackingUtils from '../utils'

const { loginAttempt, loginRememberMe, loginFailed, loginVisibility, logout } = trackingGlobals

function userIdentifiedTracking(action) {
	const windowObj = windowUtils.getWindow()

	if (action.user && action.user.id) {
		if (windowObj && typeof windowObj.snowplow === 'function') {
			windowObj.snowplow('setUserId', action.user.id)
		} else {
			logger.debug(`tracking ${action.type} snowplow function not set`)
		}
	} else {
		logger.debug(`tracking ${action.type} user data not set`)
	}
}

function userLoggedOut(action) {
	const windowObj = windowUtils.getWindow()

	if (windowObj && typeof windowObj.snowplow === 'function') {
		windowObj.snowplow('setUserId', null)
	} else {
		logger.debug(`tracking ${action.type} snowplow function not set`)
	}
	trackingUtils.trackEventWithData(logout)(action)
}

function pageChange() {
	const windowObj = windowUtils.getWindow()

	if (windowObj && typeof windowObj.snowplow === 'function') {
		windowObj.snowplow('trackPageView')
	}
}

function trackingMap(cases) {
	return (action, state, prevState, pathname) => {
		if (action.type in cases) {
			cases[action.type](action, state, prevState, pathname)
		}
	}
}

const Tracking = (action, state = {}, prevState = {}) => {
	if (globals.client) {
		const pathname = trackingUtils.getPathname(prevState)

		trackingMap({
			[actions.BASKET_ORDER_LOADED]: trackingUtils.trackEventWithData(basketTracking.basketOrderLoaded),
			[actions.USER_IDENTIFIED]: userIdentifiedTracking,
			[actions.USER_LOGGED_OUT]: userLoggedOut,
			[actions.MENU_BOX_PRICES_RECEIVE]: trackingUtils.trackEventWithData(basketTracking.menuBoxPricesReceive),
			[actions.BASKET_PROMO_CODE_CHANGE]: trackingUtils.trackEventWithData(basketTracking.promocodeChange),
			[actions.BASKET_PROMO_CODE_APPLIED_CHANGE]: trackingUtils.trackEventWithData(basketTracking.appliedPromocode),
			[actions.LOGIN_ATTEMPT]: trackingUtils.trackEventWithData(loginAttempt),
			[actions.LOGIN_REMEMBER_ME]: trackingUtils.trackEventWithData(loginRememberMe),
			[actions.LOGIN_FAILED]: trackingUtils.trackEventWithData(loginFailed),
			[actions.LOGIN_VISIBILITY_CHANGE]: trackingUtils.trackEventWithData(loginVisibility),
			[actions.PS_SUBSCRIPTION_PAUSE_ATTEMPT]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.pauseAttempt),
			[actions.PS_START_MODAL_VIEWED]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.startModalViewed),
			[actions.PS_REASON_CATEGORY_MODAL_VIEWED]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.reasonCategoryModalViewed),
			[actions.PS_REASON_CATEGORY_SELECTED]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.reasonCategorySelected),
			[actions.PS_REASON_LIST_MODAL_VIEWED]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.reasonListModalViewed),
			[actions.PS_REASON_SELECTED]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.reasonSelected),
			[actions.PS_RECOVERY_ATTEMPT_MODAL_VIEWED]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.recoveryAttemptModalViewed),
			[actions.PS_SUBSCRIPTION_KEPT_ACTIVE]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.subscriptionKeptActive),
			[actions.PS_SUBSCRIPTION_PAUSED]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.subscriptionPaused),
			[actions.PS_END_MODAL_VIEWED]: trackingUtils.trackEventWithData(pauseSubscriptionTracking.endModalViewed),
			[actions.RECIPES_DISPLAYED_ORDER_TRACKING]: trackingUtils.trackEventWithData(recipesTracking.recipeListViewed),
			[actions.RECIPE_FILTERS_OPEN_TRACKING]: trackingUtils.trackEventWithData(recipesTracking.recipeFiltersOpen),
			[actions.RECIPE_FILTERS_CLOSE_TRACKING]: trackingUtils.trackEventWithData(recipesTracking.recipeFiltersClose),
			[actions.RECIPE_FILTERS_APPLY_TRACKING]: trackingUtils.trackEventWithData(recipesTracking.recipeFiltersApply),
			[actions.RECIPE_COLLECTION_SELECT_TRACKING]: trackingUtils.trackEventWithData(recipesTracking.recipeCollectionSelect),
			[actions.SIGNUP_TRACKING_STEP_CHANGE]: trackingUtils.trackEventWithData(basketTracking.signupCheckoutStepChange),
			[actions.__REACT_ROUTER_LOCATION_CHANGE]: pageChange, // eslint-disable-line no-underscore-dangle
		})(action, state, prevState, pathname)
	}
}

export default Tracking
