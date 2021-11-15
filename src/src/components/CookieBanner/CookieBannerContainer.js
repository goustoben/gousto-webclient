import { connect } from 'react-redux'
import { getIsPolicyAccepted } from 'selectors/cookies'
import { getIsPromoAppBannerEnabled } from 'selectors/appBanner'
import { CookieBanner } from './CookieBanner'
import { cookiePolicyAcceptanceChange } from "actions/cookies/cookiePolicyAcceptanceChange"
import { trackCookiePolicyAccepted } from "actions/cookies/trackCookiePolicyAccepted"
import { trackCookiePolicyVisible } from "actions/cookies/trackCookiePolicyVisible"

const copy = {
  button: 'Agree',
  findMore: 'Find out more',
  description: `We use cookies. By continuing to browse the site
  you are agreeing to our use of cookies. `,
}

const mapStateToProps = (state) => ({
  copy,
  isCookiePolicyAccepted: getIsPolicyAccepted(state),
  isPromoAppBannerEnabled: getIsPromoAppBannerEnabled({ state }),
})

const mapDispatchToProps = {
  cookiePolicyAcceptanceChange,
  trackCookiePolicyAccepted,
  trackCookiePolicyVisible,
}

const CookieBannerContainer = connect(mapStateToProps, mapDispatchToProps)(CookieBanner)

export { CookieBannerContainer }
