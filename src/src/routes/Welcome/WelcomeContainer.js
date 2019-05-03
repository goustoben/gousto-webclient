import { connect } from 'react-redux'

import { productDetailVisibilityChange } from 'actions/products'

import Welcome from './Welcome'

function mapStateToProps(state, ownProps) {
  const { products, user } = state
  const { params, location } = ownProps

  return ({
    orderId: params.orderId,
    productDetailId: (location && location.query) ? location.query.productDetailId : '',
    products,
    user,
  })
}

const WelcomeContainer = connect(mapStateToProps, {
  productDetailVisibilityChange,
})(Welcome)

export default WelcomeContainer
