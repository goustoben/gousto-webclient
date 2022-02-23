import { actionTypes } from 'actions/actionTypes'
import { set } from 'utils/cookieHelper2'
import Cookies from 'utils/GoustoCookies'
import config from 'config/cookies'
import { canUseWindow } from 'utils/browserEnvironment'

function cookiePolicyAcceptanceChange(isAccepted) {
  return dispatch => {
    if (canUseWindow()) {
      set(Cookies, 'cookie_policy_v2', { isAccepted }, config.cookiePolicyAcceptanceExpireTime)
    }

    dispatch({
      type: actionTypes.COOKIE_POLICY_ACCEPTANCE_CHANGE,
      isAccepted,
    })
  }
}

const trackCookiePolicyAccepted = () => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'cookie_banner_ok_clicked',
  }
})

const trackCookiePolicyVisible = () => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'cookie_banner_displayed',
  }
})

export {
  cookiePolicyAcceptanceChange,
  trackCookiePolicyAccepted,
  trackCookiePolicyVisible,
}
