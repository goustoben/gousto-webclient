import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Notification } from 'Notification'
import moment from 'moment'
import { config } from './config'

class NotificationLogic extends Component {

  static propTypes = {
    card: PropTypes.instanceOf(Immutable.Map),
    orders: PropTypes.instanceOf(Immutable.Map),
  }

  static defaultProps = {
    card: Immutable.Map({}),
    orders: Immutable.Map({}),
  }

  state = {
    bannersToShow: [],
  }

  componentDidMount() {
    const { card, orders } = this.props
    const now = moment()

    this.checkCardExpiryDate(card, now)
    this.checkAmendedDeliveryDate(orders)
    this.checkOrderAwaitingSelection(orders, now)
    this.checkRafOffer(now)
  }

  checkCardExpiryDate = (card, now) => {
    let bannerToShow = ''
    const expiryDate = moment(card.get('expiryDate'))

    if (now.isBefore(expiryDate) && expiryDate.diff(now, 'days') <= 30) {
      bannerToShow = 'toExpire'
    } else if (now.isSameOrAfter(expiryDate)) {
      bannerToShow = 'expired'
    }

    if (bannerToShow) {
      this.setState(prevState => ({ bannersToShow: [...prevState.bannersToShow, bannerToShow] }))
    }

  }

  checkAmendedDeliveryDate = (orders) => {
    const alternateDeliveryDays = orders.filter(order => order.state === 'pending' && order.original_delivery_day).toArray()
    if (alternateDeliveryDays.length > 0) {
      this.setState(prevState => ({ bannersToShow: [...prevState.bannersToShow, 'amendDelivery'] }))
    }
  }

  checkOrderAwaitingSelection = (orders, now) => {
    const notifications = orders
      .filter(order => order.state === 'pending' && order.default === '1')
      .filter(order => moment(order.when_cutoff).isSame(now, 'day'))
      .toArray()

    if (notifications.length > 1 && now.isBefore(moment().hours(12))) {
      this.setState(prevState => ({ bannersToShow: [...prevState.bannersToShow, 'selectOrder'] }))
    }
  }

  checkRafOffer = (now) => {
    const rafExpiry = moment(now).isBetween('2019-05-13', '2020-05-19')

    if (rafExpiry) {
      this.setState(prevState => ({ bannersToShow: [...prevState.bannersToShow, 'referAFriend'] }))
    }
  }

  render() {
    const { bannersToShow } = this.state

    const notificationBannerDetails = bannersToShow.map(banner => (
      {
        message: config[banner].message,
        type: config[banner].type,
        title: config[banner].title,
        url: config[banner].url,
      }
    ))
      .sort((a, b) => {
        if (b.type === 'warning') return 1
        if (b.type === 'confirm' && a.type !== 'warning') return 1
        if (b.type === 'notify' && a.type !== 'warning' && a.type !== 'confirm') return 1

        return 0
      })

    return (
      <div>
        {
          notificationBannerDetails.map((banner, index) => {
            return < Notification key={banner.type} message={banner.message} type={banner.type} title={banner.title} url={banner.url} />
          })
        }
      </div>
    )

  }
}

export { NotificationLogic }
