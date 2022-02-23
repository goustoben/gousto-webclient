import React from 'react'

import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { usePricing } from 'routes/Menu/domains/pricing'
import { getIsBoxSummaryShow } from 'selectors/boxSummary'
import { checkoutBasket } from '../../../../actions/menuCheckoutClick'
import { Checkout } from './Checkout'

const mapStateToProps = (state) => ({
  recipes: state.basket.get('recipes'),
  numPortions: state.basket.get('numPortions'),
  checkoutPending: state.pending.get(actionTypes.BASKET_CHECKOUT),
  loadingOrderPending: state.pending.get(actionTypes.LOADING_ORDER, false),
  menuFetchData: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
  menuRecipes: state.menuRecipes,
  stock: state.menuRecipeStock,
  orderSavePending: state.pending.get('ORDER_SAVE', false),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE, null),
  basketPreviewOrderChangePending: state.pending.get('BASKET_PREVIEW_ORDER_CHANGE', false),
  isBoxSummaryOpened: getIsBoxSummaryShow(state),
})

const CheckoutPure = (props) => {
  const { isPending } = usePricing()

  return <Checkout {...props} pricingPending={isPending} />
}

const CheckoutContainer = connect(mapStateToProps, {
  checkoutBasket,
})(CheckoutPure)

export { CheckoutContainer }
