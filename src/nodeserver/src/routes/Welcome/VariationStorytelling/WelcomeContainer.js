import { connect } from 'react-redux'
import actions from 'actions'
import Welcome from './Welcome'

function mapStateToProps(state) {
	return ({
		user: state.user,
	})
}

const WelcomeContainer = connect(mapStateToProps, {
	productsLoadProducts: actions.productsLoadProducts,
	productsLoadProductsById: actions.productsLoadProductsById,
	recipesLoadRecipesById: actions.recipesLoadRecipesById,
	userLoadOrders: actions.userLoadOrders,
})(Welcome)

export default WelcomeContainer
