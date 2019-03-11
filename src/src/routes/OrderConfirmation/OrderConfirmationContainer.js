import { connect } from 'react-redux'
import { orderDetails } from 'actions/order'
import actionTypes from 'actions/actionTypes'
import OrderConfirmation from './OrderConfirmation'

function mapStateToProps(state, ownProps) {
  const { orderId } = ownProps.params
  const order = state.basket.get('orderDetails')
  
  return {
    orderNumber: orderId,
    prices: order ? order.get('prices'): {},
    deliveryDate: order && order.get('deliveryDate'),
    deliverySlot: order && order.get('deliverySlot'),
    giftItems: state.basket.get('gifts'),
    numPortions: parseFloat(order && order.getIn(['box', 'numPortions'])),
    numRecipes: parseFloat(order && order.getIn(['box', 'numRecipes'])),
    productItems: state.basket.get('products'),
    products: state.products,
    recipeItems: state.basket.get('recipes'),
    recipes: state.recipes,
    shippingAddress: order && order.get('shippingAddress'),
    saveError: state.error.get(actionTypes.BASKET_CHECKOUT),
    saveRequired: state.basket.get('unsaved'),
    saving: state.pending.get(actionTypes.BASKET_CHECKOUT),
    surcharges: order && order.get('surcharges'),
  }
}

const OrderConfirmationContainer = connect(mapStateToProps, {
  loadOrder: orderDetails
})(OrderConfirmation)

export default OrderConfirmationContainer
