import { connect } from 'react-redux'
import actions from 'actions'
import { trackNavigationClick } from 'actions/tracking'
import { getForceSignupWizard, getAbandonBasket } from 'selectors/features'
import { getUserFromJoin } from 'selectors/user'
import { Header } from './Header'

const mapStateToProps = (state) => ({
  serverError: state.serverError === '500',
  isAuthenticated: state.auth.get('isAuthenticated'),
  routing: state.routing,
  promoCodeUrl: state.basket.get('promoCodeUrl'),
  loginOpen: state.loginVisibility,
  disabled: state.auth.get('isAdmin'),
  features: state.features,
  fromJoin: getUserFromJoin(state),
  forceSignupWizardFeature: getForceSignupWizard(state),
  shouldShowAbandonBasketModal: getAbandonBasket(state),
})

export const HeaderContainer = connect(mapStateToProps, {
  logoutUser: actions.logoutUser,
  loginVisibilityChange: actions.loginVisibilityChange,
  closeBoxModalVisibilityChange: actions.cancelOrderModalToggleVisibility,
  trackNavigationClick,
})(Header)
