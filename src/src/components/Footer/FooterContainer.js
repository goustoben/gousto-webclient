import { connect } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { getHomePageRedesign } from 'selectors/features'
import Footer from './Footer'

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: getIsAuthenticated(state),
  simple: ownProps.simple || state.persist.get('simpleHeader', false),
  type: ownProps.type,
  isHomePageRedesignEnabled: getHomePageRedesign(state)
})

export default connect(mapStateToProps, {
  helpPreLoginVisibilityChange,
})(Footer)
