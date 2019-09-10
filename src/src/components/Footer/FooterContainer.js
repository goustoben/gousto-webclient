import { connect } from 'react-redux'
import Footer from './Footer'

const mapStateToProps = (state, ownProps) => ({
  simple: ownProps.simple || state.persist.get('simpleHeader', false),
  type: ownProps.type,
})

export default connect(mapStateToProps, {})(Footer)
