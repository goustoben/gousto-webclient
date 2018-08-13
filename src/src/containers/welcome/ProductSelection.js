import ProductList from 'Product/List'
import { getOneProductFromEachCategory, getProductsByCutoff } from 'utils/products'
import { getUserOrderById } from 'utils/user'
import actions from 'actions'
import { connect } from 'react-redux'

function mapStateToProps(state, { orderId }) {
	const cutoff = getUserOrderById(orderId, state.user.get('orders')).get('whenCutoff')
	const availableProducts = getProductsByCutoff(cutoff, state.products)
	const randomProducts = getOneProductFromEachCategory(availableProducts, orderId).toList()

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
