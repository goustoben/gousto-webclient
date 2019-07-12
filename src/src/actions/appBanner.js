import actionTypes from 'actions/actionTypes'
import { set } from 'utils/cookieHelper2'
import Cookies from 'utils/GoustoCookies'

const appBannerDismiss = () => {
  return dispatch => {
    if (__CLIENT__) {
      set(Cookies, 'app_banner_dismissed', true, 1)
    }

    dispatch({
      type: actionTypes.APP_BANNER_DISMISSED
    })
  }
}

const appBannerActions = {
  appBannerDismiss,
}

export { appBannerActions }
