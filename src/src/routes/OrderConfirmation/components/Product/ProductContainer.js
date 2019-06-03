import { connect } from 'react-redux'
import { getBasket, getProductCategories } from 'selectors/root'
import { getTempProductId, getTempAddProduct } from 'selectors/temp'
import { basketProductAdd, basketProductRemove } from 'actions/basket'
import { orderConfirmationProductTracking } from 'actions/orderConfirmation'
import tempActions from 'actions/temp'
import { Product } from "./Product.logic"

const mapStateToProps = (state, props) => {
  const isSelectedProduct = props.product && (props.product.id === state.temp.get('productId'))

  return ({
    basket: getBasket(state),
    productsCategories: getProductCategories(state),
    productId: getTempProductId(state),
    addProduct: getTempAddProduct(state),
    ageVerificationPending: state.pending.get('USER_AGE_VERIFY'),
    isSelectedProduct,
  })
}

const mapDispatchToProps = {
  basketProductAdd,
  basketProductRemove,
  temp: tempActions.temp,
  orderConfirmationProductTracking
}

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Product)

export { ProductContainer }
