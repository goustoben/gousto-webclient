import { connect } from 'react-redux'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import { getUnavailableRecipeIds } from 'routes/Menu/selectors/basket'
import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'
import { getShortlistTutorialFirstStep, getShortlistTutorialSecondStep } from 'selectors/tutorial'
import { isMobile } from 'utils/view'
import BoxSummaryDesktop from './BoxSummary'

const shouldShortlistTutorialShow = (state) => (
  getShortlistTutorialFirstStep(state) && !getShortlistTutorialSecondStep(state)
)

const mapStateToProps = (state) => ({
  isMobile: isMobile(state.request.get('browser')),
  date: state.basket.get('date'),
  numPortions: state.basket.get('numPortions'),
  recipes: state.basket.get('recipes'),
  showDetails: state.boxSummaryShow.get('show'),
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
  menuFetchPending: state.pending.get(actionTypes.MENU_FETCH_DATA),
  hasUnavailableRecipes: Boolean(getUnavailableRecipeIds(state).size),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
  pricingPending: state.pricing.get('pending'),
  shouldShowTutorialStep2: shouldShortlistTutorialShow(state)
})

const BoxSummaryDesktopContainer = connect(mapStateToProps, {
  boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
  basketRestorePreviousValues: actions.basketRestorePreviousValues,
  boxSummaryNext: actions.boxSummaryNext,
  incrementTutorialViewed,
  tutorialTracking,
})(BoxSummaryDesktop)

export default BoxSummaryDesktopContainer
