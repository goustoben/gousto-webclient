import { connect } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import Footer from './Footer'
import { helpPreLoginVisibilityChange } from "actions/login/helpPreLoginVisibilityChange"
import { trackNavigationClick } from "actions/tracking/trackNavigationClick"

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: getIsAuthenticated(state),
  simple: ownProps.simple || state.persist.get('simpleHeader', false),
  type: ownProps.type,
})

export default connect(mapStateToProps, {
  helpPreLoginVisibilityChange,
  trackNavigationClick,
})(Footer)
