import React, { Component } from 'react'
import moment from 'moment'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { config } from './config'
import {
  checkRafOffer,
  sortNotifications,
  checkCardExpiryDate,
  checkAmendedDeliveryDate,
  checkOrderAwaitingSelection,
} from './helpers'

import { NotificationPresentation } from './Notification.presentation'

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
    notifications: [],
  }

  componentDidMount() {
    const { card, orders } = this.props
    const now = moment()

    const notifications = [
      checkCardExpiryDate(card, now),
      checkAmendedDeliveryDate(orders),
      checkOrderAwaitingSelection(orders, now),
      checkRafOffer(now),
    ].filter(notification => notification).map(notification => ({
      message: config[notification].message,
      type: config[notification].type,
      title: config[notification].title,
      url: config[notification].url,
    })).sort((a, b) => sortNotifications(a.type, b.type))

    this.setState({
      notifications,
    })
  }

  render() {
    const { notifications } = this.state

    return (notifications.length) ? (
      <div>
        {notifications.map((notification, index) => (
          (index < 2) ? (
            <NotificationPresentation
              key={notification.title}
              message={notification.message}
              type={notification.type}
              title={notification.title}
              url={notification.url}
            />
          ) : null
        ))}
      </div>
    ) : null
  }
}

export { NotificationLogic }
