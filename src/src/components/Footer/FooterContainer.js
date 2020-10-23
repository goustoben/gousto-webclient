import { connect } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { trackNavigationClick } from 'actions/tracking'
import { getHomePageRedesign, getIsHelpCentreActive, getIsMenuRedirectPageEnabled } from 'selectors/features'
import Footer from './Footer'

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: getIsAuthenticated(state),
  simple: ownProps.simple || state.persist.get('simpleHeader', false),
  type: ownProps.type,
  isHomePageRedesignEnabled: getHomePageRedesign(state),
  isHelpCentreActive: getIsHelpCentreActive(state),
  isMenuRedirectPageEnabled: getIsMenuRedirectPageEnabled(state),
  postCode: state.basket.get('postcode'),
})

export default connect(mapStateToProps, {
  helpPreLoginVisibilityChange,
  trackNavigationClick,
})(Footer)
