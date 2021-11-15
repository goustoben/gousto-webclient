import Immutable from "immutable"
import moment from "moment"
import { temp } from "actions/temp/temp"
import { userLoadOrders } from "actions/user/userLoadOrders"

export const orderCheckPossibleDuplicate = (orderId) => (
  async (dispatch, getState) => {
    try {
      await dispatch(userLoadOrders(true, 'any', 5))
    } catch (e) {
      // do nothing
    }
    const orders = getState().user.get('orders', Immutable.List([]))
    const order = orders.filter(o => o.get('id') == orderId).first()
    if (order) {
      const sixDaysBeforeOrder = moment(order.get('deliveryDate')).subtract(6, 'days')
      const sixDaysFromOrder = moment(order.get('deliveryDate')).add(6, 'days')

      const closeOrderIds = orders
        .filter(o => (
          moment(o.get('deliveryDate')).isBetween(sixDaysBeforeOrder, sixDaysFromOrder)
        ))
        .map(o => o.get('id'))

      if (closeOrderIds.size > 0) {
        dispatch(temp('closeOrderIds', closeOrderIds))
      }
    }
  })
