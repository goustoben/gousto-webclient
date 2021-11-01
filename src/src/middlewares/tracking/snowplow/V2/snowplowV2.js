import { actionTypes } from 'actions/actionTypes'
import globals from 'config/globals'
import { getWindow } from 'utils/window'
import logger from 'utils/logger'
import trackingGlobals from '../global'
import basketTracking from '../basket'
import pauseSubscriptionTracking from '../pauseSubscription'
import { recipeListViewed } from '../recipes'
import * as menuTracking from '../menu'
import { getHelpTracking } from '../getHelp'
import { trackEventWithData, getPathname } from '../utils'

const { loginAttempt, loginRememberMe, loginFailed, loginVisibility, logout } = trackingGlobals

function userIdentifiedTracking(action) {
  const windowObj = getWindow()

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
  const windowObj = getWindow()

  if (windowObj && typeof windowObj.snowplow === 'function') {
    windowObj.snowplow('setUserId', null)
  } else {
    logger.debug(`tracking ${action.type} snowplow function not set`)
  }
  trackEventWithData(logout)(action)
}

function pageChange() {
  const windowObj = getWindow()

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
    const pathname = getPathname(prevState)

    trackingMap({
      [actionTypes.BASKET_ORDER_LOADED]: trackEventWithData(basketTracking.basketOrderLoaded),
      [actionTypes.USER_IDENTIFIED]: userIdentifiedTracking,
      [actionTypes.USER_LOGGED_OUT]: userLoggedOut,
      [actionTypes.MENU_BOX_PRICES_RECEIVE]: trackEventWithData(basketTracking.menuBoxPricesReceive),
      [actionTypes.BASKET_PROMO_CODE_CHANGE]: trackEventWithData(basketTracking.promocodeChange),
      [actionTypes.BASKET_PROMO_CODE_APPLIED_CHANGE]: trackEventWithData(basketTracking.appliedPromocode),
      [actionTypes.LOGIN_ATTEMPT]: trackEventWithData(loginAttempt),
      [actionTypes.LOGIN_REMEMBER_ME]: trackEventWithData(loginRememberMe),
      [actionTypes.LOGIN_FAILED]: trackEventWithData(loginFailed),
      [actionTypes.LOGIN_VISIBILITY_CHANGE]: trackEventWithData(loginVisibility),
      [actionTypes.PS_SUBSCRIPTION_PAUSE_ATTEMPT]: trackEventWithData(pauseSubscriptionTracking.pauseAttempt),
      [actionTypes.PS_START_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.startModalViewed),
      [actionTypes.PS_REASON_CATEGORY_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.reasonCategoryModalViewed),
      [actionTypes.PS_REASON_CATEGORY_SELECTED]: trackEventWithData(pauseSubscriptionTracking.reasonCategorySelected),
      [actionTypes.PS_REASON_LIST_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.reasonListModalViewed),
      [actionTypes.PS_REASON_SELECTED]: trackEventWithData(pauseSubscriptionTracking.reasonSelected),
      [actionTypes.PS_RECOVERY_ATTEMPT_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.recoveryAttemptModalViewed),
      [actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE]: trackEventWithData(pauseSubscriptionTracking.subscriptionKeptActive),
      [actionTypes.PS_SUBSCRIPTION_PAUSED]: trackEventWithData(pauseSubscriptionTracking.subscriptionPaused),
      [actionTypes.PS_END_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.endModalViewed),
      [actionTypes.RECIPES_DISPLAYED_ORDER_TRACKING]: trackEventWithData(recipeListViewed),
      [actionTypes.GET_HELP_INGREDIENTS_ACCEPT_REFUND]: trackEventWithData(getHelpTracking.acceptIngredientRefund),
      [actionTypes.GET_HELP_CONTACT_CHANNEL_SELECT]: trackEventWithData(getHelpTracking.selectContactChannel),
      [actionTypes.GET_HELP_STORE_SELECTED_INGREDIENTS]: trackEventWithData(getHelpTracking.selectIngredients),
      [actionTypes.GET_HELP_INGREDIENT_ISSUES_SELECT]: trackEventWithData(getHelpTracking.selectIngredientIssues),
      [actionTypes.GET_HELP_ORDER_ISSUE_SELECT]: trackEventWithData(getHelpTracking.selectOrderIssue),
      [actionTypes.SIGNUP_TRACKING_STEP_CHANGE]: trackEventWithData(basketTracking.signupCheckoutStepChange),
      [actionTypes.MENU_LOAD_COMPLETE]: trackEventWithData(menuTracking.menuLoadComplete),
      [actionTypes.__REACT_ROUTER_LOCATION_CHANGE]: pageChange, // eslint-disable-line no-underscore-dangle
    })(action, state, prevState, pathname)
  }
}

export default Tracking
