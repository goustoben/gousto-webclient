import { connect } from 'react-redux'
import {
  cookiePolicyAcceptanceChange,
  trackCookiePolicyAccepted,
  trackCookiePolicyVisible,
} from 'actions/cookies'
import { getIsPolicyAccepted } from 'selectors/cookies'
import { getIsPromoAppBannerEnabled } from 'selectors/appBanner'
import { getHomePageRedesign } from 'selectors/features'
import { CookieBanner } from './CookieBanner'

const copy = {
  button: 'OK, I Agree',
  findMore: 'Find out more',
  description: `We use cookies. By continuing to browse the site
  you are agreeing to our use of cookies. `,
}

const mapStateToProps = (state) => ({
  copy,
  isCookiePolicyAccepted: getIsPolicyAccepted(state),
  isPromoAppBannerEnabled: getIsPromoAppBannerEnabled({ state }),
  isHomePageRedesignEnabled: getHomePageRedesign(state),
})

const mapDispatchToProps = {
  cookiePolicyAcceptanceChange,
  trackCookiePolicyAccepted,
  trackCookiePolicyVisible,
}

const CookieBannerContainer = connect(mapStateToProps, mapDispatchToProps)(CookieBanner)

export { CookieBannerContainer }
