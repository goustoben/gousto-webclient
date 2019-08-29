import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Immutable from 'immutable'
import { HeaderPresentation } from './Header.presentation'

class Header extends PureComponent {

  static propTypes = {
    orders: PropTypes.instanceOf(Immutable.Map({}))
  }

  formatDeliveryDate = (order, now) => {
    if (!order) {
      return null
    } else if (order) {
      const start = moment(order.get('deliveryDate').substring(0, 10) + ' ' + order.getIn(['deliverySlot', 'deliveryStart']))
      const end = moment(order.get('deliveryDate').substring(0, 10) + ' ' + order.getIn(['deliverySlot', 'deliveryEnd']))
      const roundedEnd = end.minute() || end.second() || end.millisecond() ? end.add(1, 'h').startOf('hour') : end

      const date = moment(order.get('deliveryDate'))
      let message = ''
      if (now.format('YYMMDD') === date.format('YYMMDD')) {
        message = 'Your recipe box will be delivered today, ' + date.format('Do MMMM') + '. You can view more details in '
      } else {
        message = 'Your next Gousto box will arrive on ' + date.format('dddd, Do MMMM') + ' between ' + start.format('ha') + '-' + roundedEnd.format('ha') + '. See all the details or edit this box from '
      }

      return message
    } else {
      return null
    }
  }

  formatLastBoxDate = (order) => {
    if (!order) {
      return null
    } else {
      return moment(order.get('deliveryDate')).format('dddd Do MMMM')
    }
  }

  findNextOrder = (orders, now) => {
    const orderIndex = orders.reduce((nextOrderIndex, box, i) => {

      const deliveryDate = moment(box.get('deliveryDate')).set('h', 23).set('m', 59).set('s', 59)
      let nextBoxDate
      if (deliveryDate > now) {
        if (nextOrderIndex === null) {

          return i
        }

        nextBoxDate = moment(orders.get(nextOrderIndex).deliveryDate).set('h', 23).set('m', 59).set('s', 59)
        if (deliveryDate < nextBoxDate) {

          return i
        } else {

          return nextOrderIndex
        }
      } else {

        return nextOrderIndex
      }
    }, null)

    return orders.get(orderIndex)
  }

  findLastOrder = (orders, now) => {
    const orderIndex = orders.reduce((lastOrderIndex, box, i) => {

      const deliveryDate = moment(box.get('deliveryDate')).set('h', 23).set('m', 59).set('s', 59)
      let lastBoxDate
      if (now > deliveryDate) {
        if (lastOrderIndex === null) {

          return i
        }

        lastBoxDate = moment(orders.get(lastOrderIndex).deliveryDate).set('h', 23).set('m', 59).set('s', 59)
        if (lastBoxDate < deliveryDate) {

          return i
        } else {

          return lastOrderIndex
        }
      } else {

        return lastOrderIndex
      }
    }, null)

    return orders.get(orderIndex)
  }

  render() {
    const { orders } = this.props
    const now = moment()

    const nextOrder = this.findNextOrder(orders, now)
    const lastOrder = this.findLastOrder(orders, now)

    const nextOrderMessage = this.formatDeliveryDate(nextOrder, now)
    const lastOrderMessage = this.formatLastBoxDate(lastOrder, now)

    return (
      <HeaderPresentation nextOrderMessage={nextOrderMessage} lastOrderMessage={lastOrderMessage} />
    )
  }
}

export { Header }

