import { connect } from 'react-redux'
import actions from 'actions'
import Welcome from './Welcome'

function mapStateToProps(state, ownProps) {
	return ({
		isAuthenticated: state.auth.get('isAuthenticated'),
		orderId: ownProps.params.orderId,
		productDetailId: (ownProps.location && ownProps.location.query) ? ownProps.location.query.productDetailId : '',
		products: state.products,
		recipes: state.recipes,
		user: state.user,
		content: state.content,
	})
}

const WelcomeContainer = connect(mapStateToProps, {
	productsLoadProducts: actions.productsLoadProducts,
	productsLoadProductsById: actions.productsLoadProductsById,
	recipesLoadRecipesById: actions.recipesLoadRecipesById,
	userLoadOrders: actions.userLoadOrders,
	contentLoadContentByPageSlug: actions.contentLoadContentByPageSlug,
})(Welcome)

export default WelcomeContainer
