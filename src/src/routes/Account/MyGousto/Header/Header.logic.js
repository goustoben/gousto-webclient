import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Immutable from 'immutable'
import { HeaderPresentation } from './Header.presentation'

const ELIGIBILITY_DAYS = 7

class Header extends PureComponent {
  static propTypes = {
    orders: PropTypes.instanceOf(Immutable.Map),
    loadOrderTrackingInfo: PropTypes.func,
    nextOrderTracking: PropTypes.string,
  }

  static defaultProps = {
    orders: Immutable.Map({})
  }

  componentDidUpdate(prevProps) {
    const { orders, loadOrderTrackingInfo } = this.props
    if (prevProps.orders.size !== orders.size) {
      const now = moment()
      const nextOrder = this.findOrder(orders, now, 'next')

      if (nextOrder) {
        const date = moment(nextOrder.get('deliveryDate'))
        const nextOrderIsToday = now.format('YYMMDD') === date.format('YYMMDD')

        if (nextOrderIsToday) {
          const nextOrderId = nextOrder.get('id')
          loadOrderTrackingInfo(nextOrderId)
        }
      }
    }
  }

  formatDeliveryDate = (order, now) => {
    if (!order) {
      return {
        primary: 'No boxes scheduled',
        secondary: '',
      }
    }

    const deliveryDay = order.get('deliveryDate').substring(0, 10)
    const start = moment(`${deliveryDay} ${order.getIn(['deliverySlot', 'deliveryStart'])}`)
    const end = moment(`${deliveryDay} ${order.getIn(['deliverySlot', 'deliveryEnd'])}`)
    const roundedEnd =
      end.minute() || end.second() || end.millisecond()
        ? end.add(1, 'h').startOf('hour')
        : end
    const timeRange = `${start.format('ha')} - ${roundedEnd.format('ha')}`

    const date = moment(order.get('deliveryDate'))
    const orderIsToday = now.format('YYMMDD') === date.format('YYMMDD')

    return {
      primary: orderIsToday ? 'Today' : date.format('dddd Do MMMM'),
      secondary: timeRange,
    }
  }

  formatPreviousBoxDate = order => {
    if (!order) return null

    const deliveryDate = moment(order.get('deliveryDate'))

    return deliveryDate.format('dddd Do MMMM')
  }

  findOrder = (orders, now, orderToFind) => {
    const orderIndex = orders.reduce((currentOrderIndex, order, index) => {
      const orderDeliveryDate = moment(order.get('deliveryDate')).endOf('day')
      const orderValidComparedToNow =
        orderToFind === 'next'
          ? orderDeliveryDate.isAfter(now)
          : orderDeliveryDate.isBefore(now)

      if (!orderValidComparedToNow) return currentOrderIndex
      if (currentOrderIndex === null) return index

      const currentOrderDeliveryDate = moment(
        orders.getIn([currentOrderIndex, 'deliveryDate'])
      ).endOf('day')

      return orderDeliveryDate.isBetween(currentOrderDeliveryDate, now) ||
        orderDeliveryDate.isBetween(now, currentOrderDeliveryDate)
        ? index
        : currentOrderIndex
    }, null)

    return orders.get(orderIndex)
  }

  render() {
    const { orders } = this.props
    const now = moment()

    const nextOrder = this.findOrder(orders, now, 'next')
    const previousOrder = this.findOrder(orders, now, 'previous')

    const nextOrderMessage = this.formatDeliveryDate(nextOrder, now)
    const previousOrderMessage = this.formatPreviousBoxDate(previousOrder, now)
    const getHelpQueryParam =
      previousOrder &&
      now.diff(moment(previousOrder.get('deliveryDate')), 'days', true) <
      ELIGIBILITY_DAYS &&
      `?orderId=${previousOrder.get('id')}`
    const loaded = nextOrder || previousOrder

    return (
      loaded ?
        <HeaderPresentation
          nextOrderMessage={nextOrderMessage}
          previousOrderMessage={previousOrderMessage}
          getHelpQueryParam={getHelpQueryParam}
        />
        : null
    )
  }
}

export { Header }
