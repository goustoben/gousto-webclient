import { connect } from 'react-redux'
import actions from 'actions'
import Header from './Header'

const mapStateToProps = (state) => ({
  serverError: state.serverError === '500',
  isAuthenticated: state.auth.get('isAuthenticated'),
  routing: state.routing,
  promoCodeUrl: state.basket.get('promoCodeUrl'),
  loginOpen: state.loginVisibility,
  disabled: state.auth.get('isAdmin'),
  features: state.features,
  fromJoin: !state.auth.get('isAuthenticated') ? state.persist.get('simpleHeader', false) : false,
  forceSignupWizardFeature: state.features.getIn(['forceSignupWizard', 'value']),
})

export default connect(mapStateToProps, {
  logoutUser: actions.logoutUser,
  loginVisibilityChange: actions.loginVisibilityChange,
  closeBoxModalVisibilityChange: actions.cancelOrderModalToggleVisibility,
})(Header)
