import { connect } from 'react-redux'
import { getIsAppAwarenessLoginEnabled } from 'selectors/appLoginModal'
import { LoginDesktop } from './LoginDesktop'

const mapStateToProps = (state) => ({
  showAppAwareness: getIsAppAwarenessLoginEnabled(state)
})

const LoginDesktopContainer = connect(mapStateToProps)(LoginDesktop)

export {
  LoginDesktopContainer
}
