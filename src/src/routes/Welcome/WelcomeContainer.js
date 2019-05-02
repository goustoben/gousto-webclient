import { connect } from 'react-redux'

import actions from 'actions'

import Welcome from './Welcome'

function mapStateToProps(state, ownProps) {
  return ({
    orderId: ownProps.params.orderId,
    productDetailId: (ownProps.location && ownProps.location.query) ? ownProps.location.query.productDetailId : '',
    products: state.products,
    user: state.user,
  })
}

const WelcomeContainer = connect(mapStateToProps, {
  productDetailVisibilityChange: actions.productDetailVisibilityChange,
})(Welcome)

export default WelcomeContainer
