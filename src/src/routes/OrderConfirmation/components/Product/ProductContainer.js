import { connect } from 'react-redux'
import { getBasket, getProductCategories } from 'selectors/root'
import { basketProductAdd, basketProductRemove } from 'actions/basket'
import tempActions from 'actions/temp'
import { Product } from "./Product.logic"

const mapStateToProps = (state, props) => {
  const isSelectedProduct = props.product && (props.product.id == state.temp.get('productId'))

  return ({
    basket: getBasket(state),
    productsCategories: getProductCategories(state),
    productId: state.temp.get('productId'),
    addProduct: state.temp.get('addProduct'),
    isSelectedProduct,
  })
}

const mapDispatchToProps = {
  basketProductAdd,
  basketProductRemove,
  temp: tempActions.temp
}

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Product)

export { ProductContainer }
