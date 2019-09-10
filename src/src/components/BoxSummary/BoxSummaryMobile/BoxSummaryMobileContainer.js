import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import actions from 'actions'
import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import { isMobile } from 'utils/view'
import { getUnavailableRecipeIds } from 'routes/Menu/selectors/basket'
import { getShortlistTutorialFirstStep, getShortlistTutorialSecondStep } from 'selectors/tutorial'
import BoxSummaryMobile from './BoxSummaryMobile'

const shouldShortlistTutorialShow = (state) => (
  getShortlistTutorialFirstStep(state) && !getShortlistTutorialSecondStep(state)
)

const mapStateToProps = (state) => ({
  date: state.basket.get('date'),
  numPortions: state.basket.get('numPortions'),
  recipes: state.basket.get('recipes'),
  showDetails: state.boxSummaryShow.get('show') && isMobile(state.boxSummaryShow.get('view')),
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
  shouldShowTutorialStep2: shouldShortlistTutorialShow(state)

})

const BoxSummaryMobileContainer = connect(mapStateToProps, {
  boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
  basketRestorePreviousValues: actions.basketRestorePreviousValues,
  boxSummaryNext: actions.boxSummaryNext,
  incrementTutorialViewed,
  tutorialTracking,
})(BoxSummaryMobile)

export default BoxSummaryMobileContainer
