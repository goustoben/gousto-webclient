import { connect } from 'react-redux'
import actions, { fetchData } from 'actions/subscriptionPause'
import { userLoadNewOrders } from 'actions/user'
import { getIsAuthenticated } from 'selectors/auth'
import SubscriptionPause from './SubscriptionPause'

const mapStateToProps = state => {
  const { subscriptionPause } = state
  const reasons = subscriptionPause.get('reasons')
  const isAuthenticated = getIsAuthenticated(state)

  return {
    isAuthenticated,
    dataLoaded: reasons.size > 0,
    showModal: subscriptionPause.get('inProgress'),
  }
}

const mapDispatchToProps = {
  fetchData,
  subscriptionPauseFetchReasons: actions.subscriptionPauseFetchReasons,
  userLoadNewOrders,
}

const SubscriptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionPause)

export default SubscriptionContainer
