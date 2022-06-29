import { connect } from 'react-redux'

import { productDetailVisibilityChange } from 'actions/products'
import { userFetchReferralOffer } from 'actions/user'
import { trackWelcomeAppPromoClick, fetchData } from 'actions/welcome'

import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { getHeaderDetails } from 'routes/OrderConfirmation/helper'

import { WelcomeWrapper } from './WelcomeWrapper'

function mapStateToProps(state, ownProps) {
  const { products, user, request } = state
  const { params, location, query } = ownProps
  const order = state.user.getIn(['orders', params.orderId])
  const orderDetails = !!order && getHeaderDetails(order)

  return {
    orderId: params.orderId,
    productDetailId: location && location.query ? location.query.productDetailId : '',
    products,
    user,
    device: request.get('browser'),
    query,
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
    orderDetails,
  }
}

const WelcomeContainer = connect(mapStateToProps, {
  productDetailVisibilityChange,
  userFetchReferralOffer,
  trackWelcomeAppPromoClick,
  fetchData,
})(WelcomeWrapper)

export { WelcomeContainer }
