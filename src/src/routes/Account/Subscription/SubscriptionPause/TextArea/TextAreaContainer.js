import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import TextArea from './TextArea'
import { subscriptionPauseReasonSubmit } from "actions/subscriptionPause/subscriptionPauseReasonSubmit"

const mapStateToProps = (state) => ({
  disabled: state.pending.get(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT || !!state.error.get(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT)),
})

const SubscriptionPauseTextAreaContainer = connect(mapStateToProps, {
  onSubmit: reasonText => subscriptionPauseReasonSubmit(undefined, reasonText),
})(TextArea)

export default SubscriptionPauseTextAreaContainer
