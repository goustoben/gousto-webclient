import { connect } from 'react-redux'
import { getIsAppAwarenessEnabled } from 'selectors/features'
import { LoginMobile } from './LoginMobile'

const mapStateToProps = (state) => ({
  isHelpPreLoginOpen: state.loginVisibility.get('helpPreLogin'),
  showAppAwareness: getIsAppAwarenessEnabled(state),
})

const LoginMobileContainer = connect(mapStateToProps)(LoginMobile)

export {
  LoginMobileContainer
}
