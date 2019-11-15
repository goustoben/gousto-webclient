import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import userActions, { userFetchReferralOffer } from 'actions/user'
import { locationQuery } from 'selectors/routing'
import { getAgeVerified } from 'selectors/user'
import { isOrderConfirmationPageLoading } from 'selectors/orderConfirmation'
import { getBasketOrderDetails, getShortlistUsed, getShortlistFeedbackViewed } from 'selectors/basket'
import { getProductList2Columns } from 'selectors/features'
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
    hasProductList2Columns: getProductList2Columns(state),
    headerDetails,
    isLoading,
    showHeader,
    showShortlistFeedback: (getShortlistUsed(state) && !getShortlistFeedbackViewed(state)),
  })
}

const mapDispatchToProps = {
  userFetchReferralOffer,
  userVerifyAge: userActions.userVerifyAge,
}

const OrderConfirmationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation))

export default OrderConfirmationContainer
