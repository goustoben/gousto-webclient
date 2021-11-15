import { actionTypes } from "actions/actionTypes"

const trackCookiePolicyAccepted = () => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'cookie_banner_ok_clicked',
  }
})
export { trackCookiePolicyAccepted }
