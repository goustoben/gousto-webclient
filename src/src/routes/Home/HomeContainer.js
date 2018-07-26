import { connect } from 'react-redux'
import Home from './Home'

const HomeContainer = connect(state => ({
	enableStorystream: state.features.getIn(['enableStorystream', 'value'], false),
	moduleOrder: state.features.getIn(['hp_module_order', 'value']),
	isAuthenticated: state.auth.get('isAuthenticated'),
}), {})(Home)

export default HomeContainer
