import { connect } from 'react-redux'
import { LoginMobile } from './LoginMobile'

const mapStateToProps = (state) => ({
  isHelpPreLoginOpen: state.loginVisibility.get('helpPreLogin'),
})

const LoginMobileContainer = connect(mapStateToProps)(LoginMobile)

export {
  LoginMobileContainer
}
