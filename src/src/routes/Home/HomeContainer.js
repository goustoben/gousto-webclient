import { connect } from 'react-redux'
import Home from './Home'

const mapStateToProps = (state, props) => ({
	enableStorystream: state.features.getIn(['enableStorystream', 'value'], false),
	moduleOrder: state.features.getIn(['hp_module_order', 'value']),
	isAuthenticated: state.auth.get('isAuthenticated'),
	variant: (props.location && props.location.query) ? props.location.query.variant : 'default'
})

const HomeContainer = connect(
	mapStateToProps,
)(Home)

export default HomeContainer
