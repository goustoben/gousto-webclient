import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Immutable from 'immutable'
import userActions, { userFetchReferralOffer } from 'actions/user'
import { locationQuery } from 'selectors/routing'
import { getAgeVerified, getReferralOffer } from 'selectors/user'
import { isOrderConfirmationPageLoading } from 'selectors/orderConfirmation'
import { getBasketOrderDetails, getShortlistUsed, getShortlistFeedbackViewed } from 'selectors/basket'
import { isCollapsedRafFeatureEnabled } from 'selectors/features'
import { OrderConfirmation } from './OrderConfirmation'
import { getHeaderDetails } from './helper'

const mapStateToProps = (state) => {
  const locationQueryParam = locationQuery(state)
  const order = getBasketOrderDetails(state)
  const headerDetails = !!order && getHeaderDetails(order)
  const showHeader = (!!state.temp.get('showHeader') || !!(locationQueryParam && locationQueryParam['order_action'])) && !!headerDetails
  const isLoading = !order || isOrderConfirmationPageLoading(state)

  return ({
    ageVerified: getAgeVerified(state),
    hasCollapsedRafFeature: isCollapsedRafFeatureEnabled(state),
    headerDetails,
    isLoading,
    rafOffer: getReferralOffer(state) || Immutable.Map(),
    showHeader,
    showShortlistFeedback: (getShortlistUsed(state) && !getShortlistFeedbackViewed(state)),
  })
}

const mapDispatchToProps = {
  userVerifyAge: userActions.userVerifyAge,
  userFetchReferralOffer,
}

const OrderConfirmationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation))

export default OrderConfirmationContainer
