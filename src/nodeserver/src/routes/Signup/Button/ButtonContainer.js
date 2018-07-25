import { connect } from 'react-redux'
import Button from './Button'

const mapStateToProps = state => ({
	isLastStep: state.signup.getIn(['wizard', 'isLastStep']),
})

export default connect(
	mapStateToProps,
)(Button)
