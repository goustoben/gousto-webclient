import { connect } from 'react-redux'
import { userLoadOrderTrackingInfo } from 'actions/user'
import { getIsMyGoustoBannerSubscriberPricingEnabled } from 'selectors/features'
import { getUserId, getUserSubscriptionState } from 'selectors/user'
import { getMaxNumRecipes } from 'routes/Account/MyDeliveries/selectors'
import {
  getIsOrdersPending,
  getIsProjectedDeliveriesPending,
  getNextOrder,
  getNextProjectedOrder,
  getPreviousOrder,
} from '../selectors'
import { loadNextProjectedOrder } from '../actions/loadNextProjectedOrder'
import { loadOrders } from '../actions/loadOrders'
import { Header } from './Header.logic'

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
  maxNumRecipes: getMaxNumRecipes(state),
})

export const HeaderContainer = connect(mapStateToProps, {
  loadNextProjectedOrder,
  loadOrderTrackingInfo: userLoadOrderTrackingInfo,
  loadOrders,
})(Header)
