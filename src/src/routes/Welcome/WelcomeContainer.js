import { connect } from 'react-redux'

import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { getHeaderDetails } from 'routes/OrderConfirmation/helper'

import { Welcome } from './Welcome'
import { productDetailVisibilityChange } from "actions/products/productDetailVisibilityChange"
import { updateUserTasteProfile } from "actions/tastePreferences/updateUserTasteProfile"
import { userFetchReferralOffer } from "actions/user/userFetchReferralOffer"
import { trackWelcomeAppPromoClick } from "actions/welcome/trackWelcomeAppPromoClick"
import { fetchData } from "actions/welcome/fetchData"

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
  updateUserTasteProfile,
  fetchData,
})(Welcome)

export { WelcomeContainer }
