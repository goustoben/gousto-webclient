import { connect } from 'react-redux'
import Steps from './Steps'

function mapStateToProps(state) {
	return {
		browser: state.request.get('browser'),
	}
}

const StepsContainer = connect(mapStateToProps, {})(Steps)

export default StepsContainer
