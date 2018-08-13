import { connect } from 'react-redux'
import actions from 'actions/subscriptionPause'
import actionTypes from 'actions/actionTypes'
import TextArea from './TextArea'

const mapStateToProps = (state) => ({
	disabled: state.pending.get(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT || !!state.error.get(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT)),
})

const SubscriptionPauseTextAreaContainer = connect(mapStateToProps, {
	onSubmit: reasonText => actions.subscriptionPauseReasonSubmit(undefined, reasonText),
})(TextArea)

export default SubscriptionPauseTextAreaContainer
