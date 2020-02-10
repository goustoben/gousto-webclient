import { connect } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import { getUserId } from 'selectors/user'
import Footer from './Footer'

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: getIsAuthenticated(state),
  simple: ownProps.simple || state.persist.get('simpleHeader', false),
  type: ownProps.type,
  userId: getUserId(state),
})

export default connect(mapStateToProps, {})(Footer)
