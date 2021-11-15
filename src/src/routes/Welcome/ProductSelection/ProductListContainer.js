import ProductList from 'Product/List'
import productUtils from 'utils/products'
import { connect } from 'react-redux'
import { productDetailVisibilityChange } from "actions/products/productDetailVisibilityChange"

function mapStateToProps(state, { orderId }) {
  const randomProducts = productUtils.getOneProductFromEachCategory(state.products, orderId)

  return {
    orderId,
    products: randomProducts,
    number: 6,
  }
}

const ProductListContainer = connect(mapStateToProps, {
  onProductClick: productDetailVisibilityChange,
})(ProductList)

export default ProductListContainer
