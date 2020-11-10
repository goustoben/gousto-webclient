import { connect } from 'react-redux'
import { subscriptionLoadData } from 'actions/subscription'
import userActions from 'actions/user'
import { menuLoadBoxPrices } from 'actions/menu'
import { getBoxDetails, getDeliveryDetails, getUserDetails, getCurrentDeliverySlot } from './selectors/subscription'

import { Subscription } from './Subscription'

const mapStateToProps = (state) => ({
  userDetails: getUserDetails(state),
  boxDetails: getBoxDetails(state),
  deliveryDetails: getDeliveryDetails(state),
  currentDeliverySlot: getCurrentDeliverySlot(state),
})

const SubscriptionContainer = connect(mapStateToProps, {
  subscriptionLoadData,
  userLoadData: userActions.userLoadData,
  menuLoadBoxPrices,
})(Subscription)

export { SubscriptionContainer }
