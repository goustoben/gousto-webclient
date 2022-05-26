import React from 'react'

import actions from 'actions'
import { connect } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { boxSummaryVisibilityChange, boxSummaryNext } from 'actions/boxSummary'
import { usePricing } from 'routes/Menu/domains/pricing'
import { getUnavailableRecipeIds } from 'routes/Menu/selectors/basket'
import { getBrowserType } from 'selectors/browser'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import { isMobile } from 'utils/view'

import {
  getNumPortions,
  getBasketOrderId,
  getBasketRecipes,
  shouldShowBoxSummary,
} from '../../../../selectors/basket'
import { getMenuBrowseCTAShow } from '../../../../selectors/root'
import BoxSummaryDesktop from './BoxSummary'

const mapStateToProps = (state) => ({
  isMobile: isMobile(getBrowserType(state)),
  numPortions: getNumPortions(state),
  recipes: getBasketRecipes(state),
  showDetails: state.boxSummaryShow.get('show'),
  menuRecipes: state.menuRecipes,
  stock: state.menuRecipeStock,
  boxSummaryCurrentView: getCurrentBoxSummaryView(state),
  orderId: getBasketOrderId(state),
  basketCheckedOut: state.pending.get(actionTypes.BASKET_CHECKOUT),
  basketCheckoutClicked: state.pending.get(actionTypes.BASKET_CHECKOUT_CLICKED),
  menuFetchPending: state.pending.get(actionTypes.MENU_FETCH_DATA),
  hasUnavailableRecipes: Boolean(getUnavailableRecipeIds(state).size),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
  shouldShowBoxSummary: shouldShowBoxSummary(state),
  shouldMenuBrowseCTAShow: getMenuBrowseCTAShow(state),
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
