import { connect } from 'react-redux'
import cookieActions from 'actions/cookies'
import { getIsPolicyAccepted } from 'selectors/cookies'
import CookieBanner from './CookieBanner'

const copy = {
  button: 'OK, I Agree',
  findMore: 'Find out more',
  description: `We use cookies. By continuing to browse the site
  you are agreeing to our use of cookies. `,
}

const mapStateToProps = (state) => ({
  copy,
  isCookiePolicyAccepted: getIsPolicyAccepted(state),
})

const mapDispatchToProps = {
  cookiePolicyAcceptanceChange: cookieActions.cookiePolicyAcceptanceChange,
}

export default connect(mapStateToProps, mapDispatchToProps)(CookieBanner)
