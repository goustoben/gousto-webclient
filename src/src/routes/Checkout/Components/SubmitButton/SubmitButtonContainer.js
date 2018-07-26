import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'

function mapStateToProps(state, ownProps) {
	const browser = state.request.get('browser')

	return {
		nextStepName: ownProps.nextStepName,
		onClick: ownProps.onClick,
		browser,
	}
}

export default connect(mapStateToProps, {})(SubmitButton)
