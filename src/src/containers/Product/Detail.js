import { connect } from 'react-redux'
import Immutable from 'immutable' /* eslint-disable new-cap */
import actions from 'actions'
import { getProductLimitReached } from 'utils/basket'
import ProductDetail from 'Product/Detail'

function mapStateToProps(state, props) {
  const product = state.products.get(props.productId, Immutable.Map())
  const limitReached = getProductLimitReached(props.productId, state.basket, state.products, state.productsCategories)
  const outOfStock = state.productsStock.get(props.productId, 0) === 0

  return {
    isAgeVerificationRequired: product.get('ageRestricted') && !state.user.get('ageVerified'),
    attributes: product.get('attributes', Immutable.List()),
    description: product.get('description', ''),
    isAvailable: !outOfStock && !limitReached,
    inProgress: state.pending.get('USER_AGE_VERIFY', false),
    limitReached,
    listPrice: product.get('listPrice', ''),
    outOfStock,
    media: product.get('media', Immutable.List()),
    qty: state.basket.getIn(['products', props.productId], 0),
    title: product.get('title', ''),
  }
}

const DetailContainer = connect(mapStateToProps, {
  onAdd: actions.basketProductAdd,
  onRemove: actions.basketProductRemove,
  onVerifyAge: actions.userVerifyAge,
  onVisibilityChange: actions.productDetailVisibilityChange,
})(ProductDetail)

export default DetailContainer
