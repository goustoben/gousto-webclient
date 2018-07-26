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
	contentLoadContentByPageSlug: actions.contentLoadContentByPageSlug,
	productDetailVisibilityChange: actions.productDetailVisibilityChange,
	productsLoadCategories: actions.productsLoadCategories,
	productsLoadProducts: actions.productsLoadProducts,
	productsLoadProductsById: actions.productsLoadProductsById,
	productsLoadStock: actions.productsLoadStock,
	recipesLoadRecipesById: actions.recipesLoadRecipesById,
	userLoadOrder: actions.userLoadOrder,
})(Welcome)

export default WelcomeContainer
