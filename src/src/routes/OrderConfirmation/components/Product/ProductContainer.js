import { connect } from 'react-redux'
import { getBasket } from 'selectors/root'
import { getTempAddProduct, getTempProductId } from 'selectors/temp'
import { Product } from './Product.logic'
import { orderConfirmationProductTracking } from "actions/order/orderConfirmationProductTracking"
import { basketProductAdd } from "actions/basket/basketProductAdd"
import { basketProductRemove } from "actions/basket/basketProductRemove"
import { temp } from "actions/temp/temp"

const mapStateToProps = (state, props) => {
  const isSelectedProduct = props.product && (props.product.id === state.temp.get('productId'))

  return ({
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
  temp,
  orderConfirmationProductTracking
}

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Product)

export { ProductContainer }
