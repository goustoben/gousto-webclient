import { connect } from 'react-redux'

import { productDetailVisibilityChange } from 'actions/products'
import { userFetchReferralOffer } from 'actions/user'
import { getRafPositionOnWelcomePage, getWelcomePageAppPromo } from 'selectors/features'

import Welcome from './Welcome'

function mapStateToProps(state, ownProps) {
  const { products, user, request } = state
  const { params, location } = ownProps

  return ({
    orderId: params.orderId,
    productDetailId: (location && location.query) ? location.query.productDetailId : '',
    products,
    user,
    isRafAboveCarousel: getRafPositionOnWelcomePage(state),
    welcomePageAppPromo: getWelcomePageAppPromo(state),
    device: request.get('browser')
  })
}

const WelcomeContainer = connect(mapStateToProps, {
  productDetailVisibilityChange,
  userFetchReferralOffer,
})(Welcome)

export default WelcomeContainer
