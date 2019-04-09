import { connect } from 'react-redux'
import basketActions from 'actions/basket'
import productActions from 'actions/products'
import OrderSummary from 'OrderSummary'
import actionTypes from 'actions/actionTypes'

function mapStateToProps(state) {

  return {
    sectionTitle: 'Order Summary',
    prices: state.basket.getIn(['orderDetails','prices']),
    deliveryDate:  state.basket.getIn(['orderDetails','deliveryDate']),
    deliverySlot:  state.basket.getIn(['orderDetails','deliverySlot']),
    giftItems: state.basket.get('gifts'),
    numPortions: parseFloat(state.basket.getIn(['orderDetails', 'box', 'numPortions'])),
    numRecipes:  parseFloat(state.basket.getIn(['orderDetails','box', 'numRecipes'])),
    productItems: state.basket.get('products'),
    products: state.products,
    recipeItems: state.basket.get('recipes'),
    recipes: state.recipes,
    shippingAddress: state.basket.getIn(['orderDetails', 'shippingAddress']),
    saveError: state.error.get(actionTypes.BASKET_CHECKOUT),
    saveRequired: state.basket.get('unsaved'),
    saving: state.pending.get(actionTypes.BASKET_CHECKOUT),
    surcharges: state.basket.getIn(['orderDetails', 'surcharges']),
  }
}

const ReceiptContainer = connect(mapStateToProps, {
  onSave: basketActions.basketUpdateProducts,
  removeProduct: basketActions.basketProductRemove,
  showProductDetail: productActions.productDetailVisibilityChange,
})(OrderSummary)

export default ReceiptContainer
