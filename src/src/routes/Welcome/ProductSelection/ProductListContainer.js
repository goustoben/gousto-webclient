import ProductList from 'Product/List'
import { getOneProductFromEachCategory } from 'utils/products'
import { actions } from 'actions'
import { connect } from 'react-redux'

function mapStateToProps(state, { orderId }) {
  const randomProducts = getOneProductFromEachCategory(state.products, orderId)

  return {
    orderId,
    products: randomProducts,
    number: 6,
  }
}

const ProductListContainer = connect(mapStateToProps, {
  onProductClick: actions.productDetailVisibilityChange,
})(ProductList)

export default ProductListContainer
