import { connect } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import {
  getAbandonBasket,
  getIsMobileTopBannerAppAwarenessEnabled,
  getIsPaymentBeforeChoosingEnabled,
} from 'selectors/features'
import { getUserFromJoin } from 'selectors/user'
import { getIsAppAwarenessLoginEnabled } from 'selectors/appLoginModal'
import { Header } from './Header'
import { helpPreLoginVisibilityChange } from "actions/login/helpPreLoginVisibilityChange"
import { trackNavigationClick } from "actions/tracking/trackNavigationClick"
import { cancelOrderModalToggleVisibility } from "actions/order/cancelOrderModalToggleVisibility"
import { logoutUser } from "actions/login/logoutUser"
import { loginVisibilityChange } from "actions/login/loginVisibilityChange"
import { trackHelpPreLoginModalDisplayed } from "routes/GetHelp/actions/getHelp/trackHelpPreLoginModalDisplayed"
import { trackContinueAsNewCustomer } from "routes/GetHelp/actions/getHelp/trackContinueAsNewCustomer"

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
  closeBoxModalVisibilityChange: cancelOrderModalToggleVisibility,
  helpPreLoginVisibilityChange,
  logoutUser,
  loginVisibilityChange,
  trackContinueAsNewCustomer,
  trackHelpPreLoginModalDisplayed,
  trackNavigationClick,
})(Header)
