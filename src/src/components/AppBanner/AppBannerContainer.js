import { connect } from 'react-redux'
import { appBannerActions } from 'actions/appBanner'
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

  const showAppBanner = state.cookies.get('isPolicyAccepted') && !state.appBanner.get('isDismissed') && name

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
