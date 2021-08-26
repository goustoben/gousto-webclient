import { connect } from 'react-redux'

import { productDetailVisibilityChange } from 'actions/products'
import { userFetchReferralOffer } from 'actions/user'
import { trackWelcomeAppPromoClick, fetchData } from 'actions/welcome'
import { updateUserTasteProfile } from 'actions/tastePreferences'

import { Welcome } from './Welcome'

function mapStateToProps(state, ownProps) {
  const { products, user, request } = state
  const { params, location, query } = ownProps

  return {
    orderId: params.orderId,
    productDetailId: location && location.query ? location.query.productDetailId : '',
    products,
    user,
    device: request.get('browser'),
    query,
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
