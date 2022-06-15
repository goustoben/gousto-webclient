import OrderSummary from 'OrderSummary'
import { connect } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { basketProductRemove } from 'actions/basket'
import { productDetailVisibilityChange } from 'actions/products'
import { basketUpdateProducts } from 'routes/Menu/actions/basket'
import { getUserOrderById } from 'utils/user'

function mapStateToProps(state) {
  const orderId = state.basket.get('orderId')
  const order = getUserOrderById(orderId, state.user.get('orders'))

  return {
    prices: order.get('prices'),
    deliveryDate: order.get('deliveryDate'),
    deliverySlot: order.get('deliverySlot'),
    giftItems: state.basket.get('gifts'),
    numPortions: parseFloat(order.getIn(['box', 'numPortions'])),
    numRecipes: parseFloat(order.getIn(['box', 'numRecipes'])),
    productItems: state.basket.get('products'),
    products: state.products,
    recipeItems: order.get('recipeItems'),
    recipes: state.recipes,
    shippingAddress: order.get('shippingAddress'),
    saveError: state.error.get(actionTypes.BASKET_CHECKOUT),
    saveRequired: state.basket.get('unsaved'),
    saving: state.pending.get(actionTypes.BASKET_CHECKOUT),
    surcharges: order.get('surcharges'),
    orderNumber: orderId,
  }
}

const OrderSummaryContainer = connect(mapStateToProps, {
  onSave: basketUpdateProducts,
  removeProduct: basketProductRemove,
  showProductDetail: productDetailVisibilityChange,
})(OrderSummary)

export default OrderSummaryContainer
