import Immutable from 'immutable'
import ProductDetails from 'Product/Detail'
import { getProductLimitReached } from 'utils/basket'
import { getAgeVerified } from 'selectors/user'
import { connect } from 'react-redux'

function mapStateToProps(state, props) {
  const { productsStock, basket, products, productsCategories, pending } = state
  const {
    id,
    attributes,
    description,
    listPrice,
    title,
    images,
    ageRestricted,
    showPopUp,
    onVisibilityChange,
  } = props

  const imgSource = images && images['400']['src']
  const ageVerified = getAgeVerified(state)
  const isAgeVerificationRequired = !ageVerified && ageRestricted
  const outOfStock = productsStock.get(id, 0) <= 0
  const limitReached = getProductLimitReached(id, basket, products, productsCategories)

  return {
    productId: id,
    isAgeVerificationRequired,
    attributes: Immutable.fromJS(attributes),
    description,
    limitReached,
    listPrice,
    outOfStock,
    media: imgSource,
    title,
    isAvailable: !outOfStock && !limitReached,
    inProgress: pending.get('USER_AGE_VERIFY', false),
    qty: basket.getIn(['products', id], 0),
    showPopUp,
    onVisibilityChange,
  }
}

const ProductDetailContainer = connect(mapStateToProps)(ProductDetails)

export default ProductDetailContainer
