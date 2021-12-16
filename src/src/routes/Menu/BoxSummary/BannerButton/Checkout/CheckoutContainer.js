import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getIsBoxSummaryShow } from 'selectors/boxSummary'
import { checkoutBasket } from '../../../actions/menuCheckoutClick'
import { Checkout } from './Checkout'

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
  isBoxSummaryOpened: getIsBoxSummaryShow(state),
})

const CheckoutContainer = connect(mapStateToProps, {
  checkoutBasket,
})(Checkout)

export { CheckoutContainer }
