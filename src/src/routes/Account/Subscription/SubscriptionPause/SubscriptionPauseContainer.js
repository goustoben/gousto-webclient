import { connect } from 'react-redux'
import actions, { fetchData } from 'actions/subscriptionPause'
import SubscriptionPause from './SubscriptionPause'

const mapStateToProps = state => {
  const { subscriptionPause } = state
  const reasons = subscriptionPause.get('reasons')

  return {
    dataLoaded: reasons.size > 0,
    showModal: subscriptionPause.get('inProgress'),
  }
}

const mapDispatchToProps = {
  fetchData,
  subscriptionPauseFetchReasons: actions.subscriptionPauseFetchReasons,
}

const SubscriptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionPause)

export default SubscriptionContainer
