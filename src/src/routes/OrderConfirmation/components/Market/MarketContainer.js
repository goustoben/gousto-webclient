import { connect } from 'react-redux'
import { getBasket, getProductCategories } from 'selectors/root'
import {
  getCategoriesForNavBar,
  getProductsForMarket,
} from 'selectors/products'
import { getAgeVerified } from 'selectors/user'
import { getBasketOrderDetails } from 'selectors/basket'
import actionTypes from 'actions/actionTypes'
import basketActions from 'actions/basket'
import { filterProductCategory } from 'actions/filters'
import { Market } from './Market.logic'

const mapStateToProps = (state) => {
  const order = getBasketOrderDetails(state)

  return {
    showOrderConfirmationReceipt: !!order,
    basket: getBasket(state),
    productsCategories: getProductCategories(state),
    products: getProductsForMarket(state),
    productsLoadError: state.error.get('PRODUCTS_RECEIVE', null),
    ageVerified: getAgeVerified(state),
    selectedCategory: state.filters.get('selectedCategory') || 'all-products',
    saving: state.pending.get(actionTypes.BASKET_CHECKOUT),
    saveRequired: state.basket.get('unsaved'),
    saveError: state.error.get(actionTypes.BASKET_CHECKOUT),
    isOrderConfirmation: true,
    categoriesForNavBar: getCategoriesForNavBar(state),
  }
}

const mapDispatchToProps = {
  filterProductCategory,
  onSave: basketActions.basketUpdateProducts,
}

const MarketContainer = connect(mapStateToProps, mapDispatchToProps)(Market)

export { MarketContainer }
