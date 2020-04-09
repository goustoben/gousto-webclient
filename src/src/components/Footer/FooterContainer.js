import { connect } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import { helpPreLoginVisibilityChange } from 'actions/login'
import Footer from './Footer'

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: getIsAuthenticated(state),
  simple: ownProps.simple || state.persist.get('simpleHeader', false),
  type: ownProps.type,
})

export default connect(mapStateToProps, {
  helpPreLoginVisibilityChange,
})(Footer)
