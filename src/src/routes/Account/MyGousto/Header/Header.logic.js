import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Immutable from 'immutable'
import { HeaderPresentation } from './Header.presentation'

const ELIGIBILITY_DAYS = 7

class Header extends PureComponent {
  static propTypes = {
    orders: PropTypes.instanceOf(Immutable.Map({}))
  }

  static defaultProps = {
    orders: Immutable.Map({})
  }

  formatDeliveryDate = (order, now) => {
    if (!order) {
      return null
    } else if (order) {
      const start = moment(
        order.get('deliveryDate').substring(0, 10) +
          ' ' +
          order.getIn(['deliverySlot', 'deliveryStart'])
      )
      const end = moment(
        order.get('deliveryDate').substring(0, 10) +
          ' ' +
          order.getIn(['deliverySlot', 'deliveryEnd'])
      )
      const roundedEnd =
        end.minute() || end.second() || end.millisecond()
          ? end.add(1, 'h').startOf('hour')
          : end

      const date = moment(order.get('deliveryDate'))
      let message = ''
      if (now.format('YYMMDD') === date.format('YYMMDD')) {
        message =
          'Your recipe box will be delivered today, ' +
          date.format('Do MMMM') +
          '. You can view more details in '
      } else {
        message =
          'Your next Gousto box will arrive on ' +
          date.format('dddd, Do MMMM') +
          ' between ' +
          start.format('ha') +
          '-' +
          roundedEnd.format('ha') +
          '. See all the details or edit this box from '
      }

      return message
    } else {
      return null
    }
  }

  formatPreviousBoxDate = order => {
    if (!order) {
      return null
    } else {
      const yesterday = moment().subtract(1, 'day')
      const deliveryDate = moment(order.get('deliveryDate'))

      return yesterday.isSame(deliveryDate, 'day')
        ? 'yesterday'
        : `on ${deliveryDate.format('dddd Do MMMM')}`
    }
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

    return (
      <HeaderPresentation
        nextOrderMessage={nextOrderMessage}
        previousOrderMessage={previousOrderMessage}
        getHelpQueryParam={getHelpQueryParam}
      />
    )
  }
}

export { Header }
