import { actionTypes } from 'actions/actionTypes'
import { set } from 'utils/cookieHelper2'
import Cookies from 'utils/GoustoCookies'
import * as trackingKeys from 'actions/trackingKeys'
import { canUseWindow } from 'utils/browserEnvironment'

export const appBannerDismiss = () => (
  dispatch => {
    if (canUseWindow()) {
      set(Cookies, 'app_banner_dismissed', true, 1)
    }

    dispatch({
      type: actionTypes.APP_BANNER_DISMISSED
    })
  }
)

export const trackingAppPromoCTAClick = ({ platform }) => (dispatch) => {
  const type = trackingKeys.clickAppBannerInstall

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: type,
      platform,
    }
  })
}

export const trackingAppPromoBannerView = ({ platform }) => (dispatch) => {
  const type = trackingKeys.viewAppBanner

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: type,
      platform,
    }
  })
}
