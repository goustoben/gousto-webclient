import { connect } from 'react-redux'
import actions from 'actions'
import { getIsAuthenticated } from 'selectors/auth'
import { MenuRedirect } from './MenuRedirect'

const mapStateToProps = (state => ({
  isAuthenticated: getIsAuthenticated(state),
  device: state.request.get('browser')
}))

const mapDispatchToProps = {
  loginVisibilityChange: actions.loginVisibilityChange,
  trackGetStarted: actions.trackUTMAndPromoCode,
  trackLoginClick: actions.trackLoginClickOnHungryPage,
}

export const MenuRedirectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuRedirect)
