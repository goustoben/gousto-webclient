import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { locationQuery } from 'selectors/routing'
import { getAgeVerified } from 'selectors/user'
import { isOrderConfirmationPageLoading } from 'selectors/orderConfirmation'
import { getBasketOrderDetails } from 'selectors/basket'
import { OrderConfirmation } from './OrderConfirmation'
import { getHeaderDetails } from './helper'
import { userFetchReferralOffer } from "actions/user/userFetchReferralOffer"
import { userVerifyAge } from "actions/user/userVerifyAge"

const mapStateToProps = (state) => {
  const locationQueryParam = locationQuery(state)
  const order = getBasketOrderDetails(state)
  const headerDetails = !!order && getHeaderDetails(order)
  const showHeader = !!(locationQueryParam && locationQueryParam.order_action) && !!headerDetails
  const isLoading = !order || isOrderConfirmationPageLoading(state)

  return ({
    ageVerified: getAgeVerified(state),
    headerDetails,
    isLoading,
    showHeader
  })
}

const mapDispatchToProps = {
  userFetchReferralOffer,
  userVerifyAge,
}

const OrderConfirmationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation))

export default OrderConfirmationContainer
