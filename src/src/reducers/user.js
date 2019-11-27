import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

export const defaultState = Immutable.fromJS({
  id: '',
  ageVerified: false,
  orders: {},
  newOrders: {},
  nextOrderTracking: '',
  projectedDeliveries: {},
  orderCardsCollapsedStatus: {},
  orderCardsEditStatus: {},
  addresses: {},
  cancelledAllBoxesModal: {
    visibility: false,
    pendingOrdersDates: {},
  },
  unsubscribedFromEmail: false,
})

const user = {
  user: (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.USER_AGE_VERIFY:
      return state.set('ageVerified', action.verified)

    case actionTypes.USER_SUBSCRIBE:
      return state.merge(action.user)

    case actionTypes.USER_RATE_COUNT:
      return state.set('rateCount', action.rateCount)

    case actionTypes.USER_LOAD_DATA:
      return state.merge(action.user).set('ageVerified', action.user.ageVerified === '1')

      // 'shippingAddresses' has the addressed obtained from core, 'addresses' has the addresses obtained from customer service
    case actionTypes.USER_SHIPPING_ADDRESSES_RECEIVE:
      return state.set('shippingAddresses', Immutable.fromJS(action.shippingAddresses))

    case actionTypes.USER_CLEAR_DATA:
      return defaultState

    case actionTypes.USER_LOAD_ORDERS: {
      const reduceOrders = (reducerState, order) =>
        reducerState.set(
          Immutable.fromJS(order).get('id'),
          Immutable.fromJS(order)
        )

      const actionReducedOrders = action.orders
        .reduce(reduceOrders, Immutable.OrderedMap({}))

      const stateReducedOrders = state.get('orders')
        .reduce(reduceOrders, Immutable.OrderedMap({}))

      return state.set(
        'orders',
        stateReducedOrders
          .merge(actionReducedOrders)
      )
    }

    case actionTypes.USER_LOAD_ORDERS_NEW: {
      const keyedorders = Immutable.fromJS(action.orders).reduce((workingorders, order) => (
        workingorders.set(order.get('id'), order)
      ), Immutable.Map({}))

      return state.set('newOrders', keyedorders)
    }

    case actionTypes.USER_LOAD_ORDER_TRACKING: {
      return state.set('nextOrderTracking', action.trackingUrl)
    }

    case actionTypes.USER_LOAD_PROJECTED_DELIVERIES:
      return state.set('projectedDeliveries', Immutable.fromJS(action.projectedDeliveries).reduce((workingDeliveries, projectedDelivery) => {
        // Some fields need to be added to the projected deliveries to match the orders format
        let projectedOrder = projectedDelivery.set('deliveryDate', projectedDelivery.get('date'))
        projectedOrder = projectedOrder.get('active') === '1' ? projectedOrder.set('state', 'scheduled') : projectedOrder.set('state', 'cancelled')

        return workingDeliveries.set(projectedOrder.get('id'), projectedOrder)
      }, Immutable.Map({})))

    case actionTypes.USER_UNLOAD_ORDERS: {
      const newOrders = (action.orderIds || []).reduce((remainingOrders, orderId) => {
        const deleteKey = remainingOrders.findKey(order => order.get('id') === orderId)

        return remainingOrders.delete(deleteKey)
      }, state.get('orders'))

      return state.set('orders', newOrders)
    }

    case actionTypes.USER_UNLOAD_PROJECTED_DELIVERIES: {
      const newProjectedDeliveries = (action.deliveryDayIds || []).reduce((remainingDeliveries, deliveryDayId) =>
        remainingDeliveries.delete(deliveryDayId)
      , state.get('projectedDeliveries'))

      return state.set('projectedDeliveries', newProjectedDeliveries)
    }

    case actionTypes.PROJECTED_ORDER_CANCEL: {
      const orders = state.get('newOrders').map((order, orderId) => {
        if (action.orderId === orderId && order.get('orderState') === 'scheduled') {
          return order.set('orderState', 'cancelled')
            .set('restorable', true)
            .set('cancellable', false)
        }

        return order
      })

      return state.set('newOrders', orders)
    }

    case actionTypes.ORDER_CANCEL: {
      const orders = state.get('newOrders').map((order, orderId) => {
        if (action.orderId === orderId) {
          return order.merge({
            orderState: 'cancelled',
            restorable: false,
            cancellable: false,
            recipes: Immutable.fromJS({}),
          })
        }

        return order
      })

      return state.set('newOrders', orders)
    }

    case actionTypes.PROJECTED_ORDER_RESTORE: {
      const orders = state.get('newOrders').map((order, orderId) => {
        if (action.orderId === orderId && order.get('orderState') === 'cancelled') {
          return order.set('orderState', 'scheduled')
            .set('restorable', false)
            .set('cancellable', true)
        }

        return order
      })

      return state.set('newOrders', orders)
    }

    case actionTypes.USER_ORDER_CARD_OPEN_CLOSE: {
      return state.set('orderCardsCollapsedStatus',
        state.get('orderCardsCollapsedStatus').set(action.orderId, action.isCollapsed))
    }

    case actionTypes.USER_ORDER_EDIT_OPEN_CLOSE: {
      return state.set('orderCardsEditStatus',
        state.get('orderCardsEditStatus').set(action.orderId, action.editDeliveryMode))
    }

    case actionTypes.PS_SUBSCRIPTION_PAUSED: {
      return state.set('subscription',
        state.get('subscription').set('state', 'inactive'))
    }

    case actionTypes.USER_LOAD_REFERRAL_DETAILS: {
      return state.set('referralDetails', Immutable.fromJS(action.referralDetails))
    }

    case actionTypes.USER_LOAD_REFERRAL_OFFER: {
      return state.set('referralOffer', Immutable.fromJS(action.referralOffer))
    }

    case actionTypes.ORDER_DELIVERY_DAYS_RECEIVE: {
      return state.setIn(['newOrders', action.orderId, 'availableDeliveryDays'], Immutable.fromJS(action.availableDays))
    }

    case actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT: {
      return state.mergeIn(['newOrders', action.orderId], {
        coreDeliveryDayId: action.coreDayId,
        deliverySlotId: action.slotId,
        deliveryDay: action.deliveryDay,
        deliverySlotStart: action.deliverySlotStart,
        deliverySlotEnd: action.deliverySlotEnd,
        shouldCutoffAt: action.shouldCutoffAt,
      })
    }

    case actionTypes.ORDER_ADDRESS_CHANGE: {
      const orders = state.get('newOrders').map((order, orderId) => {
        if (action.data.orderId === orderId && order.get('shippingAddressId') !== action.data.addressId) {
          return order.set('shippingAddressId', action.data.addressId)
        }

        return order
      })

      return state.set('newOrders', orders)
    }

    // 'shippingAddresses' has the addressed obtained from core, 'addresses' has the addresses obtained from customer service
    case actionTypes.USER_LOAD_ADDRESSES: {
      const keyedAddresses = Immutable.fromJS(action.data).reduce((workingAddresses, address) => (
        workingAddresses.set(address.get('id'), address)
      ), Immutable.Map({}))

      return state.set('addresses', keyedAddresses)
    }

    case actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE: {
      return state
        .setIn(['cancelledAllBoxesModal', 'visibility'], action.visibility)
        .setIn(['cancelledAllBoxesModal', 'pendingOrdersDates'], action.pendingOrdersDates)
    }

    case actionTypes.UNSUBSCRIBED_USER: {
      return state.set('unsubscribedFromEmail', true)
    }

    case actionTypes.MYDELIVERIES_ORDERS: {
      return state.set('newOrders', action.orders)
    }

    default:
      return state
    }
  },
}

export default user
