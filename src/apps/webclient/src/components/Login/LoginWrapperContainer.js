import { connect } from 'react-redux'
import { getBrowserType } from 'selectors/browser'
import { LoginWrapper } from './LoginWrapper'

const mapStateToProps = (state) => ({
  isMobileViewport: getBrowserType(state) === 'mobile',
})

const LoginWrapperContainer = connect(mapStateToProps)(LoginWrapper)

export {
  LoginWrapperContainer
}
