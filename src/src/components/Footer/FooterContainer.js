import Footer from './Footer'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
	simple: ownProps.simple || state.persist.get('simpleHeader', false),
	type: ownProps.type,
})

export default connect(mapStateToProps, {})(Footer)
