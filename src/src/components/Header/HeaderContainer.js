import { connect } from 'react-redux'
import actions from 'actions'
import { trackNavigationClick } from 'actions/tracking'
import { getAbandonBasket, getRenderNewMenuDesignFeatureFlag } from 'selectors/features'
import { getUserFromJoin } from 'selectors/user'
import { locationAtMyGousto } from 'selectors/routing'
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
  abandonBasketFeature: getAbandonBasket(state),
  shouldLoadOrders: locationAtMyGousto(state),
  shouldRenderNewMenuDesign: getRenderNewMenuDesignFeatureFlag(state),
})

export const HeaderContainer = connect(mapStateToProps, {
  logoutUser: actions.logoutUser,
  loginVisibilityChange: actions.loginVisibilityChange,
  closeBoxModalVisibilityChange: actions.cancelOrderModalToggleVisibility,
  trackNavigationClick,
  loadUserOrders: actions.userLoadOrders,
})(Header)
