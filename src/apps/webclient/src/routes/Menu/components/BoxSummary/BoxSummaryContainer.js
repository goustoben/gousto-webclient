import React from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { boxSummaryVisibilityChange, boxSummaryNext } from 'actions/boxSummary'
import { getBrowserType } from 'selectors/browser'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import { getUnavailableRecipeIds } from 'routes/Menu/selectors/basket'
import { isMobile } from 'utils/view'
import { getIsBoxSummaryShow } from 'selectors/boxSummary'
import { usePricing } from 'routes/Menu/domains/pricing'
import BoxSummaryDesktop from './BoxSummary'
import { getMenuBrowseCTAShow } from '../../../../selectors/root'
import {
  getBasketSlotId,
  getBasketDate,
  getNumPortions,
  getBasketOrderId,
  getBasketRecipes,
  shouldShowBoxSummary,
} from '../../../../selectors/basket'

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
  shouldShowBoxSummary: shouldShowBoxSummary(state),
  shouldMenuBrowseCTAShow: getMenuBrowseCTAShow(state),
  isBoxSummaryOpened: getIsBoxSummaryShow(state),
})

const BoxSummaryPure = (props) => {
  const { isPending } = usePricing()

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BoxSummaryDesktop {...props} pricingPending={isPending} />
}

const BoxSummaryDesktopContainer = connect(mapStateToProps, {
  boxDetailsVisibilityChange: boxSummaryVisibilityChange,
  basketRestorePreviousValues: actions.basketRestorePreviousValues,
  boxSummaryNext,
})(BoxSummaryPure)

export default BoxSummaryDesktopContainer
