import { connect } from 'react-redux'
import actions from 'actions/subscriptionPause'
import ReasonsScreen from './ReasonsScreen'

const mapStateToProps = (state) => ({
  reasons: state.subscriptionPause.get('activeReasons'),
})

const ReasonsScreenContainer = connect(mapStateToProps, {
  onReasonChoice: actions.subscriptionPauseReasonChoice,
})(ReasonsScreen)

export default ReasonsScreenContainer
