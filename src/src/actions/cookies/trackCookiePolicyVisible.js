import { actionTypes } from "actions/actionTypes"

const trackCookiePolicyVisible = () => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'cookie_banner_displayed',
  }
})
export { trackCookiePolicyVisible }
