import { connect } from 'react-redux'
import actions from 'actions'
import { trackNavigationClick } from 'actions/tracking'
import { changeRecaptcha } from 'actions/auth'
import { getIsAuthenticated } from 'selectors/auth'
import { getAbandonBasket, isAccountTabNameTest } from 'selectors/features'
import { getUserFromJoin, getUserId } from 'selectors/user'
import { Header } from './Header'

const mapStateToProps = (state) => ({
  serverError: state.serverError === '500',
  isAuthenticated: getIsAuthenticated(state),
  routing: state.routing,
  promoCodeUrl: state.basket.get('promoCodeUrl'),
  loginOpen: state.loginVisibility,
  disabled: state.auth.get('isAdmin'),
  features: state.features,
  fromJoin: getUserFromJoin(state),
  abandonBasketFeature: getAbandonBasket(state),
  isAccountTabNameTest: isAccountTabNameTest(state),
  userId: getUserId(state),
})

export const HeaderContainer = connect(mapStateToProps, {
  logoutUser: actions.logoutUser,
  loginVisibilityChange: actions.loginVisibilityChange,
  closeBoxModalVisibilityChange: actions.cancelOrderModalToggleVisibility,
  trackNavigationClick,
  changeRecaptcha
})(Header)
