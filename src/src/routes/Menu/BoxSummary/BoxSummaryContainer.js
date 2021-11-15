import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getBrowserType } from 'selectors/browser'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import { getUnavailableRecipeIds } from 'routes/Menu/selectors/basket'
import { isMobile } from 'utils/view'
import BoxSummaryDesktop from './BoxSummary'
import { getMenuBrowseCTAShow } from '../../../selectors/root'
import {
  getBasketDate,
  getBasketOrderId,
  getBasketRecipes,
  getBasketSlotId,
  getNumPortions,
  shouldShowBoxSummary
} from '../../../selectors/basket'
import { boxSummaryVisibilityChange } from "actions/boxSummary/boxSummaryVisibilityChange"
import { boxSummaryNext } from "actions/boxSummary/boxSummaryNext"
import { basketRestorePreviousValues } from "actions/basket/basketRestorePreviousValues"

const mapStateToProps = (state) => ({
  isMobile: isMobile(getBrowserType(state)),
  date: getBasketDate(state),
  numPortions: getNumPortions(state),
  recipes: getBasketRecipes(state),
  showDetails: state.boxSummaryShow.get('show'),
  slotId: getBasketSlotId(state),
  deliveryDays: state.boxSummaryDeliveryDays,
  menuRecipes: state.menuRecipes,
  stock: state.menuRecipeStock,
  boxSummaryCurrentView: getCurrentBoxSummaryView(state),
  menuRecipesStore: state.recipes,
  orderId: getBasketOrderId(state),
  basketCheckedOut: state.pending.get(actionTypes.BASKET_CHECKOUT),
  basketCheckoutClicked: state.pending.get(actionTypes.BASKET_CHECKOUT_CLICKED),
  menuFetchPending: state.pending.get(actionTypes.MENU_FETCH_DATA),
  hasUnavailableRecipes: Boolean(getUnavailableRecipeIds(state).size),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
  pricingPending: state.pricing.get('pending'),
  shouldShowBoxSummary: shouldShowBoxSummary(state),
  shouldMenuBrowseCTAShow: getMenuBrowseCTAShow(state)
})

const BoxSummaryDesktopContainer = connect(mapStateToProps, {
  boxDetailsVisibilityChange: boxSummaryVisibilityChange,
  basketRestorePreviousValues,
  boxSummaryNext,
})(BoxSummaryDesktop)

export default BoxSummaryDesktopContainer
