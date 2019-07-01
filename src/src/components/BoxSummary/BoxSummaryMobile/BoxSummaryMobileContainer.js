import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import actions from 'actions'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import { getUnavailableRecipeIds } from 'routes/Menu/selectors/basket'
import BoxSummaryMobile from './BoxSummaryMobile'

const mapStateToProps = (state) => ({
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
  basketCheckedOut: state.pending.get(actionTypes.BASKET_CHECKOUT),
  hasUnavailableRecipes: Boolean(getUnavailableRecipeIds(state).size),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
})

const BoxSummaryMobileContainer = connect(mapStateToProps, {
  boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
  basketRestorePreviousValues: actions.basketRestorePreviousValues,
  boxSummaryNext: actions.boxSummaryNext,
})(BoxSummaryMobile)

export default BoxSummaryMobileContainer
