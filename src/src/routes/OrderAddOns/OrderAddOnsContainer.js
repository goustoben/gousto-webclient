import { connect } from 'react-redux'
import { getBasket, getProductCategories } from 'selectors/root'
import { getDesserts } from 'selectors/products'
import { getAgeVerified } from 'selectors/user'
import { orderDetails } from 'actions/orderConfirmation'
import { OrderAddOns } from './OrderAddOns'

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps
  const orderId = location.pathname.split('/order-add-ons/')[1] || ''

  return {
    ageVerified: getAgeVerified(state),
    basket: getBasket(state),
    orderId,
    productsCategories: getProductCategories(state),
    products: getDesserts(state),
  }
}

const OrderAddOnsContainer = connect(mapStateToProps, {
  orderDetails,
})(OrderAddOns)

export {
  OrderAddOnsContainer
}
