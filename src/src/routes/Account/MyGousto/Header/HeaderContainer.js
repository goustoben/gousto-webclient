import { connect } from 'react-redux'
import { getIsMyGoustoBannerSubscriberPricingEnabled } from 'selectors/features'
import { getUserId, getUserSubscriptionState } from 'selectors/user'
import {
  getIsOrdersPending,
  getIsProjectedDeliveriesPending,
  getNextOrder,
  getNextProjectedOrder,
  getPreviousOrder,
} from '../selectors'
import { Header } from './Header.logic'
import { userLoadOrderTrackingInfo } from "actions/user/userLoadOrderTrackingInfo"
import { loadNextProjectedOrder } from "routes/Account/MyGousto/actions/loadNextProjectedOrder/loadNextProjectedOrder"
import { loadOrders } from "routes/Account/MyGousto/actions/loadOrders/loadOrders"

const mapStateToProps = state => ({
  accessToken: state.auth.get('accessToken'),
  isOrdersPending: getIsOrdersPending(state),
  isProjectedDeliveriesPending: getIsProjectedDeliveriesPending(state),
  nextOrder: getNextOrder(state),
  nextOrderTracking: state.user.get('nextOrderTracking'),
  nextProjectedOrder: getNextProjectedOrder(state),
  previousOrder: getPreviousOrder(state),
  showSubscriberPricingBanner: getIsMyGoustoBannerSubscriberPricingEnabled(state),
  subscriptionStatus: getUserSubscriptionState(state),
  userId: getUserId(state),
})

export const HeaderContainer = connect(mapStateToProps, {
  loadNextProjectedOrder,
  loadOrderTrackingInfo: userLoadOrderTrackingInfo,
  loadOrders,
})(Header)
