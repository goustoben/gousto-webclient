import { connect } from 'react-redux'
import actions from 'actions'
import { trackNavigationClick } from 'actions/tracking'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { getIsAuthenticated } from 'selectors/auth'
import { getAbandonBasket, isAccountTabNameTest, getHomePageRedesign } from 'selectors/features'
import { getUserFromJoin } from 'selectors/user'
import { Header } from './Header'

const mapStateToProps = (state) => ({
  serverError: state.serverError === '500',
  isAuthenticated: getIsAuthenticated(state),
  routing: state.routing,
  promoCodeUrl: state.basket.get('promoCodeUrl'),
  isHelpPreLoginOpen: state.loginVisibility.get('helpPreLogin'),
  isLoginOpen: state.loginVisibility.get('login'),
  disabled: state.auth.get('isAdmin'),
  features: state.features,
  fromJoin: getUserFromJoin(state),
  abandonBasketFeature: getAbandonBasket(state),
  isAccountTabNameTest: isAccountTabNameTest(state),
  isHomePageRedesignEnabled: getHomePageRedesign(state)
})

export const HeaderContainer = connect(mapStateToProps, {
  closeBoxModalVisibilityChange: actions.cancelOrderModalToggleVisibility,
  helpPreLoginVisibilityChange,
  logoutUser: actions.logoutUser,
  loginVisibilityChange: actions.loginVisibilityChange,
  trackNavigationClick,
})(Header)
