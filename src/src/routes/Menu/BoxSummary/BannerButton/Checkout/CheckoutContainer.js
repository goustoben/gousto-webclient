import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { isBasketTransactionalOrder } from 'selectors/basket'
import { trackViewSidesModal } from 'actions/menu'
import { getAuthUserId } from 'selectors/auth'
import { trackExperimentInSnowplow } from 'containers/OptimizelyRollouts/trackExperimentInSnowplow'
import { checkoutBasket } from '../../../actions/menuCheckoutClick'
import { openSidesModal } from '../../../actions/sides'
import { Checkout } from './Checkout'

const mapStateToProps = (state) => ({
  recipes: state.basket.get('recipes'),
  numPortions: state.basket.get('numPortions'),
  promoCode: state.basket.get('promoCode'),
  postcode: state.basket.get('postcode'),
  addressId: state.basket.getIn(['address', 'id'], ''),
  checkoutPending: state.pending.get(actionTypes.BASKET_CHECKOUT),
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
  openSidesModal: () => (dispatch) => {
    dispatch(trackViewSidesModal())
    dispatch(openSidesModal())
  },
  trackExperimentInSnowplow,
})(Checkout)

export { CheckoutContainer }
