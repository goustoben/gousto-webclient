import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { isBasketTransactionalOrder } from 'selectors/basket'
import { getAuthUserId } from 'selectors/auth'
import { trackExperimentInSnowplow } from 'containers/OptimizelyRollouts/trackExperimentInSnowplow'
import { Checkout } from './Checkout'
import { checkoutBasket } from "routes/Menu/actions/menuCheckoutClick/checkoutBasket"
import { openSidesModal } from "routes/Menu/actions/sides/openSidesModal"

const mapStateToProps = (state) => ({
  recipes: state.basket.get('recipes'),
  numPortions: state.basket.get('numPortions'),
  promoCode: state.basket.get('promoCode'),
  postcode: state.basket.get('postcode'),
  addressId: state.basket.getIn(['address', 'id'], ''),
  checkoutPending: state.pending.get(actionTypes.BASKET_CHECKOUT),
  loadingOrderPending: state.pending.get(actionTypes.LOADING_ORDER, false),
  menuFetchData: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
  menuRecipes: state.menuRecipes,
  stock: state.menuRecipeStock,
  pricingPending: state.pricing.get('pending', false),
  orderSavePending: state.pending.get('ORDER_SAVE', false),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE, null),
  basketPreviewOrderChangePending: state.pending.get('BASKET_PREVIEW_ORDER_CHANGE', false),
  isBasketTransactionalOrder: isBasketTransactionalOrder(state),
  userId: getAuthUserId(state),
})

const CheckoutContainer = connect(mapStateToProps, {
  checkoutBasket,
  openSidesModal,
  trackExperimentInSnowplow,
})(Checkout)

export { CheckoutContainer }
