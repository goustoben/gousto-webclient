import { connect } from 'react-redux'
import { getBasket } from 'selectors/root'
import { getTempProductId, getTempAddProduct } from 'selectors/temp'
import { basketProductAdd, basketProductRemove } from 'actions/basket'
import { orderConfirmationProductTracking } from 'actions/orderConfirmation'
import { getProductList2Columns } from 'selectors/features'
import tempActions from 'actions/temp'
import { Product } from "./Product.logic"

const mapStateToProps = (state, props) => {
  const isSelectedProduct = props.product && (props.product.id === state.temp.get('productId'))

  return ({
    hasProductList2Columns: getProductList2Columns(state),
    basket: getBasket(state),
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
