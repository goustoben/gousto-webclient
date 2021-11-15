import { connect } from 'react-redux'
import ReasonsScreen from './ReasonsScreen'
import { subscriptionPauseReasonChoice } from "actions/subscriptionPause/subscriptionPauseReasonChoice"

const mapStateToProps = (state) => ({
  reasons: state.subscriptionPause.get('activeReasons'),
})

const ReasonsScreenContainer = connect(mapStateToProps, {
  onReasonChoice: subscriptionPauseReasonChoice,
})(ReasonsScreen)

export default ReasonsScreenContainer
