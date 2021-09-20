import { connect } from 'react-redux'
import actions from 'actions'
import { trackNavigationClick } from 'actions/tracking'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { getIsAuthenticated } from 'selectors/auth'
import {
  getAbandonBasket,
  getIsMobileTopBannerAppAwarenessEnabled,
  getIsPaymentBeforeChoosingEnabled,
} from 'selectors/features'
import { getUserFromJoin } from 'selectors/user'
import { getIsAppAwarenessLoginEnabled } from 'selectors/appLoginModal'
import { trackContinueAsNewCustomer, trackHelpPreLoginModalDisplayed } from '../../routes/GetHelp/actions/getHelp'
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
  showAppAwareness: getIsAppAwarenessLoginEnabled(state),
  isAppAwarenessEnabled: getIsMobileTopBannerAppAwarenessEnabled(state),
  isPaymentBeforeChoosingEnabled: getIsPaymentBeforeChoosingEnabled(state),
})

export const HeaderContainer = connect(mapStateToProps, {
  closeBoxModalVisibilityChange: actions.cancelOrderModalToggleVisibility,
  helpPreLoginVisibilityChange,
  logoutUser: actions.logoutUser,
  loginVisibilityChange: actions.loginVisibilityChange,
  trackContinueAsNewCustomer,
  trackHelpPreLoginModalDisplayed,
  trackNavigationClick,
})(Header)
