import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import actions from 'actions'
import BoxSummaryMobile from './BoxSummaryMobile'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import { okRecipes } from 'utils/basket'

function mapStateToProps(state) {
	const okRecipeIds = okRecipes(state.basket.get('recipes'), state.menuRecipes, state.menuRecipeStock, state.basket.get('numPortions'))
	const hasUnavailableRecipes = state.basket.get('recipes').some((obj, recipeId) => !okRecipeIds.has(recipeId))

	return {
		date: state.basket.get('date'),
		numPortions: state.basket.get('numPortions'),
		recipes: state.basket.get('recipes'),
		showDetails: state.boxSummaryShow.get('show') && state.boxSummaryShow.get('view') === 'mobile',
		slotId: state.basket.get('slotId'),
		userOrders: state.user.get('orders'),
		deliveryDays: state.boxSummaryDeliveryDays,
		menuRecipes: state.menuRecipes,
		stock: state.menuRecipeStock,
		boxSummaryCurrentView: getCurrentBoxSummaryView(state),
		menuRecipesStore: state.recipes,
		orderId: state.basket.get('orderId'),
		disabled: state.auth.get('isAdmin'),
		hasUnavailableRecipes,
		orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
	}
}

const BoxSummaryMobileContainer = connect(mapStateToProps, {
	boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
	basketRestorePreviousValues: actions.basketRestorePreviousValues,
	boxSummaryNext: actions.boxSummaryNext,
})(BoxSummaryMobile)

export default BoxSummaryMobileContainer
