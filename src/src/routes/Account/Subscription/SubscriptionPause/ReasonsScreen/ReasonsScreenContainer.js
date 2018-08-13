import { connect } from 'react-redux'
import ReasonsScreen from './ReasonsScreen'
import actions from 'actions/subscriptionPause'

const mapStateToProps = (state) => ({
	reasons: state.subscriptionPause.get('activeReasons'),
})

const ReasonsScreenContainer = connect(mapStateToProps, {
	onReasonChoice: actions.subscriptionPauseReasonChoice,
})(ReasonsScreen)

export default ReasonsScreenContainer
