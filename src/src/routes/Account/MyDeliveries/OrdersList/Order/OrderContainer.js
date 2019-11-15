import { connect } from 'react-redux'
import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'
import Order from './Order'

function mapStateToProps(state, ownProps) {
  const order = ownProps.order
  const orderId = order.get('id')
  const products = order.get('products', Immutable.Map({}))

  return {
    userId: state.user.get('id'),
    orderId,
    deliveryDayId: order.get('coreDeliveryDayId') || order.get('deliveryDayId'),
    deliveryDay: order.get('deliveryDay'),
    orderDateTime: order.get('deliveryDay'),
    deliveryDayRescheduled: order.get('deliveryDayRescheduled'),
    deliveryDayRescheduledReason: order.get('deliveryDayRescheduledReason'),
    orderDeliveryTimeStart: order.get('deliverySlotStart'),
    orderDeliveryTimeEnd: order.get('deliverySlotEnd'),
    orderState: order.get('orderState'),
    orderWhenCutoff: order.get('whenCutoff'),
    orderWhenCommitted: order.get('whenCommited'),
    orderWhenMenuOpen: order.get('whenMenuOpen'),
    recipes: order.get('recipes', Immutable.List([])),
    products,
    collapsed: state.user.getIn(['orderCardsCollapsedStatus', orderId]),
    editDeliveryMode: state.user.getIn(['orderCardsEditStatus', orderId]),
    priceBreakdown: order.get('priceBreakdown', Immutable.Map({})),
    cancellable: order.get('cancellable'),
    restorable: order.get('restorable'),
    orderDeliveryDaysFetchError: state.error.get(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE),
    recipesPeriodStockFetchError: state.error.get(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE),
  }
}

const OrderContainer = connect(mapStateToProps, {})(Order)

export default OrderContainer
