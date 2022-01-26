import { connect } from 'react-redux'
import { getIsLoginModalAppAwarenessEnabled } from 'selectors/features'
import { trackAppStoreLoginButton, trackPlayStoreLoginButton } from 'actions/appAwareness'
import { LoginMobile } from './LoginMobile'

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
