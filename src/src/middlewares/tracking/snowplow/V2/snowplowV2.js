import actions from 'actions/actionTypes'
import globals from 'config/globals'
import windowUtils from 'utils/window'
import logger from 'utils/logger'
import trackingGlobals from '../global'
import basketTracking from '../basket'
import pauseSubscriptionTracking from '../pauseSubscription'
import recipesTracking from '../recipes'
import * as menuTracking from '../menu'
import { getHelpTracking } from '../getHelp'
import { trackEventWithData, getPathname } from '../utils'

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
  trackEventWithData(logout)(action)
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
    const pathname = getPathname(prevState)

    trackingMap({
      [actions.BASKET_ORDER_LOADED]: trackEventWithData(basketTracking.basketOrderLoaded),
      [actions.USER_IDENTIFIED]: userIdentifiedTracking,
      [actions.USER_LOGGED_OUT]: userLoggedOut,
      [actions.MENU_BOX_PRICES_RECEIVE]: trackEventWithData(basketTracking.menuBoxPricesReceive),
      [actions.BASKET_PROMO_CODE_CHANGE]: trackEventWithData(basketTracking.promocodeChange),
      [actions.BASKET_PROMO_CODE_APPLIED_CHANGE]: trackEventWithData(basketTracking.appliedPromocode),
      [actions.LOGIN_ATTEMPT]: trackEventWithData(loginAttempt),
      [actions.LOGIN_REMEMBER_ME]: trackEventWithData(loginRememberMe),
      [actions.LOGIN_FAILED]: trackEventWithData(loginFailed),
      [actions.LOGIN_VISIBILITY_CHANGE]: trackEventWithData(loginVisibility),
      [actions.PS_SUBSCRIPTION_PAUSE_ATTEMPT]: trackEventWithData(pauseSubscriptionTracking.pauseAttempt),
      [actions.PS_START_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.startModalViewed),
      [actions.PS_REASON_CATEGORY_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.reasonCategoryModalViewed),
      [actions.PS_REASON_CATEGORY_SELECTED]: trackEventWithData(pauseSubscriptionTracking.reasonCategorySelected),
      [actions.PS_REASON_LIST_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.reasonListModalViewed),
      [actions.PS_REASON_SELECTED]: trackEventWithData(pauseSubscriptionTracking.reasonSelected),
      [actions.PS_RECOVERY_ATTEMPT_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.recoveryAttemptModalViewed),
      [actions.PS_SUBSCRIPTION_KEPT_ACTIVE]: trackEventWithData(pauseSubscriptionTracking.subscriptionKeptActive),
      [actions.PS_SUBSCRIPTION_PAUSED]: trackEventWithData(pauseSubscriptionTracking.subscriptionPaused),
      [actions.PS_END_MODAL_VIEWED]: trackEventWithData(pauseSubscriptionTracking.endModalViewed),
      [actions.RECIPES_DISPLAYED_ORDER_TRACKING]: trackEventWithData(recipesTracking.recipeListViewed),
      [actions.GET_HELP_ACCEPT_REFUND]: trackEventWithData(getHelpTracking.acceptRefund),
      [actions.GET_HELP_CONTACT_CHANNEL_SELECT]: trackEventWithData(getHelpTracking.selectContactChannel),
      [actions.GET_HELP_STORE_SELECTED_INGREDIENTS]: trackEventWithData(getHelpTracking.selectIngredients),
      [actions.GET_HELP_INGREDIENT_ISSUES_SELECT]: trackEventWithData(getHelpTracking.selectIngredientIssues),
      [actions.GET_HELP_ORDER_ISSUE_SELECT]: trackEventWithData(getHelpTracking.selectOrderIssue),
      [actions.SIGNUP_TRACKING_STEP_CHANGE]: trackEventWithData(basketTracking.signupCheckoutStepChange),
      [actions.MENU_LOAD_COMPLETE]: trackEventWithData(menuTracking.menuLoadComplete),
      [actions.__REACT_ROUTER_LOCATION_CHANGE]: pageChange, // eslint-disable-line no-underscore-dangle
    })(action, state, prevState, pathname)
  }
}

export default Tracking
