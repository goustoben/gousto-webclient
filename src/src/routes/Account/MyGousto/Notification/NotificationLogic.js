import React, { Component } from 'react'
import { Notification } from 'Notification'
import moment from 'moment'
import { config } from './config'

class NotificationLogic extends Component {

  state = {
    bannersToShow: [],
  }

  componentDidMount() {
    const { card, orders } = this.props
    const now = moment()

    // this.checkCardExpiryDate(card, now)
    this.checkAmendedDeliveryDate(orders)
    this.checkOrderAwaitingSelection(orders, now)
    this.checkRafOffer(now)
  }

  checkCardExpiryDate = (card, now) => {
    let bannerToShow = ''
    const expiryDate = moment(card.expiry_date).endOf('month')
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
    const alternateDeliveryDays = orders.filter(order => order.state === 'pending' && order.original_delivery_day)

    if (alternateDeliveryDays.length > 0) {
      this.setState(prevState => ({ bannersToShow: [...prevState.bannersToShow, 'amendDeliverys'] }))
    }
  }

  checkOrderAwaitingSelection = (orders, now) => {
    const notifications = orders
      .filter(order => order.state === 'pending' && order.default === '1')
      .filter(order => moment(order.when_cutoff).isSame(now, 'day'))

    if (notifications.length > 1 && now.isBefore(moment().hours(12))) {
      this.setState(prevState => ({ bannersToShow: [...prevState.bannersToShow, 'order'] }))
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

    return (
      <div>
        {
          notificationBannerDetails.map(banner => (
            < Notification key={banner.type} message={banner.message} type={banner.type} title={banner.title} url={banner.url} />)
          )
        }
      </div>
    )

  }
}

export { NotificationLogic }
