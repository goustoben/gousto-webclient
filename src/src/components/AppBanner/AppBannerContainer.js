import { connect } from 'react-redux'
import { appBannerActions } from 'actions/appBanner'
import { AppBanner } from './AppBanner'

const getOS = () => {
  let userAgent
  if (typeof window === 'undefined') {
    userAgent = ''
  } else {
    userAgent = window.navigator.userAgent
  }

  let os

  if (/android/i.test(userAgent)) os = 'Android'
  else if (/iPad|iPhone|iPod/.test(userAgent)) os = 'iOS'

  return os
}

const mapStateToProps = state => {
  const OS = getOS()

  const showAppBanner = state.cookies.get('isPolicyAccepted') && !state.appBanner.get('isDismissed') && OS

  return {
    appTitle: 'Gousto for iOS',
    rating: 4.6,
    OS,
    showAppBanner,
  }

}

const AppBannerContainer = connect(mapStateToProps, {
  appBannerDismiss: appBannerActions.appBannerDismiss
})(AppBanner)

export { AppBannerContainer }
