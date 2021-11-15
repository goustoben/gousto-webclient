import { connect } from 'react-redux'
import SubscriptionPause from './SubscriptionPause'
import { fetchData } from "actions/subscriptionPause/fetchData"
import { subscriptionPauseFetchReasons } from "actions/subscriptionPause/subscriptionPauseFetchReasons"
import { userLoadNewOrders } from "actions/user/userLoadNewOrders"

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
  subscriptionPauseFetchReasons: subscriptionPauseFetchReasons,
  userLoadNewOrders,
}

const SubscriptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionPause)

export default SubscriptionContainer
