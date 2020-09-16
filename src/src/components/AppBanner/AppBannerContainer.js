import { connect } from 'react-redux'
import { appBannerDismiss, trackingAppPromoCTAClick, trackingAppPromoBannerView } from 'actions/appBanner'
import { getIsPromoAppBannerEnabled, getPlatformDetails } from 'selectors/appBanner'
import { AppBanner } from './AppBanner'

const mapStateToProps = state => {
  const { name, ratings } = getPlatformDetails()

  return {
    name,
    ratings,
    showAppBanner: getIsPromoAppBannerEnabled({ state }),
  }
}

const AppBannerContainer = connect(mapStateToProps, {
  appBannerDismiss,
  trackingAppPromoCTAClick,
  trackingAppPromoBannerView,
})(AppBanner)

export { AppBannerContainer }
