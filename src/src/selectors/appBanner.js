import { getIsAuthenticated } from 'selectors/auth'
import { getIsAppAwarenessEnabled } from 'selectors/features'

const getIsDismissed = state => state.appBanner.get('isDismissed')

const getPlatformDetails = () => {
  let userAgent = ''

  if (typeof window !== 'undefined') {
    userAgent = window.navigator.userAgent
  }

  if (/android/i.test(userAgent)) return { name: 'Android', ratings: '4,270' }
  else if (/iPad|iPhone|iPod/.test(userAgent)) return { name: 'iOS', ratings: '63,700' }

  return {}
}

const getIsPromoAppBannerEnabled = ({ state }) => {
  const { name } = getPlatformDetails()
  const path = state.routing.locationBeforeTransitions.pathname
  const isValidPath = path === '/' || path === '/my-gousto'

  const showAppBanner = getIsAppAwarenessEnabled(state)
    && getIsAuthenticated(state)
    && !getIsDismissed(state)
    && name
    && isValidPath

  return showAppBanner
}

export {
  getIsPromoAppBannerEnabled,
  getPlatformDetails,
}
