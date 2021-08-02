import { connect } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { trackNavigationClick } from 'actions/tracking'
import { getIsMenuRedirectPageEnabled } from 'selectors/features'
import Footer from './Footer'

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: getIsAuthenticated(state),
  simple: ownProps.simple || state.persist.get('simpleHeader', false),
  type: ownProps.type,
  isMenuRedirectPageEnabled: getIsMenuRedirectPageEnabled(state),
  postCode: state.basket.get('postcode'),
})

export default connect(mapStateToProps, {
  helpPreLoginVisibilityChange,
  trackNavigationClick,
})(Footer)
