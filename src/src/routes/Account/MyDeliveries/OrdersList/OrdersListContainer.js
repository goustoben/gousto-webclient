import { connect } from 'react-redux'
import OrdersList from './OrdersList'

function mapStateToProps(state) {
  return {
    orders: state.user.get('newOrders'),
    recipes: state.homeCarouselRecipes,
    boxType: state.subscription.getIn(['box', 'boxType']),
  }
}

const OrdersListContainer = connect(mapStateToProps, {})(OrdersList)

export default OrdersListContainer
