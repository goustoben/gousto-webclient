import { actionTypes } from 'actions/actionTypes'
import { set } from 'utils/cookieHelper2'
import { Cookies } from 'utils/GoustoCookies'
import config from 'config/cookies'

function cookiePolicyAcceptanceChange(isAccepted) {
  return dispatch => {
    if (__CLIENT__) {
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
