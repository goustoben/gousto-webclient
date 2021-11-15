import { connect } from 'react-redux'
import { getIsLoginModalAppAwarenessEnabled } from 'selectors/features'
import { LoginMobile } from './LoginMobile'
import { trackAppStoreLoginButton } from "actions/appAwareness/trackAppStoreLoginButton"
import { trackPlayStoreLoginButton } from "actions/appAwareness/trackPlayStoreLoginButton"

const mapStateToProps = (state) => ({
  isHelpPreLoginOpen: state.loginVisibility.get('helpPreLogin'),
  showAppAwareness: getIsLoginModalAppAwarenessEnabled(state),
})

const LoginMobileContainer = connect(mapStateToProps, {
  trackAppStoreLoginButton,
  trackPlayStoreLoginButton,
})(LoginMobile)

export {
  LoginMobileContainer
}
