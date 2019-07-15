import { connect } from 'react-redux'
import { appBannerActions } from 'actions/appBanner'
import { getIsDismissed } from 'selectors/appBanner'
import { getIsAuthenticated } from 'selectors/auth'
import { getIsPolicyAccepted } from 'selectors/cookies'
import { AppBanner } from './AppBanner'

const getPlatformDetails = () => {
  let userAgent
  if (typeof window === 'undefined') {
    userAgent = ''
  } else {
    userAgent = window.navigator.userAgent
  }

  if (/android/i.test(userAgent)) return { name: 'Android', averageRating: 4.6, ratings: '1.8K' }
  else if (/iPad|iPhone|iPod/.test(userAgent)) return { name: 'iOS', averageRating: 4.8, ratings: '33.4K' }

  return {}
}

const mapStateToProps = state => {
  const { name, averageRating, ratings } = getPlatformDetails()

  const showAppBanner = getIsPolicyAccepted(state) && getIsAuthenticated(state) && !getIsDismissed(state) && name

  return {
    name,
    averageRating,
    ratings,
    showAppBanner,
  }

}

const AppBannerContainer = connect(mapStateToProps, {
  appBannerDismiss: appBannerActions.appBannerDismiss
})(AppBanner)

export { AppBannerContainer }
