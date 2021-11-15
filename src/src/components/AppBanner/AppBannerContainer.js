import { connect } from 'react-redux'
import { getIsPromoAppBannerEnabled, getPlatformDetails } from 'selectors/appBanner'
import { AppBanner } from './AppBanner'
import { appBannerDismiss } from "actions/appBanner/appBannerDismiss"
import { trackingAppPromoCTAClick } from "actions/appBanner/appBanner/trackingAppPromoCTAClick"
import { trackingAppPromoBannerView } from "actions/appBanner/trackingAppPromoBannerView"

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
