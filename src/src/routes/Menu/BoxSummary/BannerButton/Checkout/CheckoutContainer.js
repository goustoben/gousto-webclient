import { connect } from 'react-redux'
import { getAddOnsBeforeOrderConfirmation } from 'selectors/features'
import { actionTypes } from 'actions/actionTypes'
import { checkoutBasket } from '../../../actions/menuCheckoutClick'
import { Checkout } from './Checkout'

const mapStateToProps = (state) => ({
  recipes: state.basket.get('recipes'),
  numPortions: state.basket.get('numPortions'),
  promoCode: state.basket.get('promoCode'),
  postcode: state.basket.get('postcode'),
  addressId: state.basket.getIn(['address', 'id'], ''),
  isAuthenticated: state.auth.get('isAuthenticated'),
  checkoutPending: state.pending.get(actionTypes.BASKET_CHECKOUT),
  menuRecipes: state.menuRecipes,
  stock: state.menuRecipeStock,
  pricingPending: state.pricing.get('pending', false),
  orderSavePending: state.pending.get('ORDER_SAVE', false),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE, null),
  basketPreviewOrderChangePending: state.pending.get('BASKET_PREVIEW_ORDER_CHANGE', false),
  isAddOnsFeatureFlagOn: getAddOnsBeforeOrderConfirmation(state),
})

const CheckoutContainer = connect(mapStateToProps, {
  checkoutBasket
})(Checkout)

export { CheckoutContainer }
