import { connect } from 'react-redux'
import OrderSummary from 'OrderSummary'
import { actionTypes } from 'actions/actionTypes'
import { getOrderRecipes } from '../../selectors/orderDetails'
import { basketProductRemove } from "actions/basket/basketProductRemove"
import { productDetailVisibilityChange } from "actions/products/productDetailVisibilityChange"
import { basketUpdateProducts } from "routes/Menu/actions/basket/basketUpdateProducts"

function mapStateToProps(state) {
  return {
    sectionTitle: 'Order Summary',
    prices: state.basket.getIn(['orderDetails', 'prices']),
    deliveryDate: state.basket.getIn(['orderDetails', 'deliveryDate']),
    deliverySlot: state.basket.getIn(['orderDetails', 'deliverySlot']),
    giftItems: state.basket.get('gifts'),
    numPortions: parseFloat(state.basket.getIn(['orderDetails', 'box', 'numPortions'])),
    numRecipes: parseFloat(state.basket.getIn(['orderDetails', 'box', 'numRecipes'])),
    productItems: state.basket.get('products'),
    products: state.products,
    recipeItems: getOrderRecipes(state),
    recipes: state.recipes,
    shippingAddress: state.basket.getIn(['orderDetails', 'shippingAddress']),
    saveError: state.error.get(actionTypes.BASKET_CHECKOUT),
    saveRequired: state.basket.get('unsaved'),
    saving: state.pending.get(actionTypes.BASKET_CHECKOUT),
    surcharges: state.basket.getIn(['orderDetails', 'surcharges']),
    isOrderConfirmation: true,
  }
}

const OrderSummaryContainer = connect(mapStateToProps, {
  onSave: basketUpdateProducts,
  removeProduct: basketProductRemove,
  showProductDetail: productDetailVisibilityChange,
})(OrderSummary)

export default OrderSummaryContainer
