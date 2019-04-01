import ProductDetails from 'Product/Detail'
import { getProductLimitReached } from 'utils/basket'
import { connect } from 'react-redux'

function mapStateToProps(state, props) {
  const outOfStock = state.productsStock.get(props.productId, 0) === 0
  const limitReached = getProductLimitReached(props.productId, state.basket, state.products, state.productsCategories)

  const { 
    isAgeVerificationRequired, 
    attributes,
    description,
    listPrice,
    media,
    title,
  } = props

  return {
    isAgeVerificationRequired,
    attributes,
    description,
    limitReached,
    listPrice,
    outOfStock,
    media,
    title,
    isAvailable: !outOfStock && !limitReached,
    inProgress: state.pending.get('USER_AGE_VERIFY', false),
    qty: state.basket.getIn(['products', props.productId], 0),
  }
}

const ProductDetailContainer = connect(mapStateToProps)(ProductDetails)

export default ProductDetailContainer
