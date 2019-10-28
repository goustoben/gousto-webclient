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
    trackNotificationLinkClick: PropTypes.func,
  }

  static defaultProps = {
    card: Immutable.Map({}),
    orders: Immutable.Map({}),
    trackNotificationLinkClick: () => {},
  }

  getNotifications() {
    const { card, orders } = this.props
    const now = moment()

    return [
      checkCardExpiryDate(card, now),
      checkAmendedDeliveryDate(orders),
      checkOrderAwaitingSelection(orders, now),
      checkRafOffer(now),
    ].filter(notification => notification).map(notification => ({
      message: config[notification].message,
      type: config[notification].type,
      title: config[notification].title,
      url: config[notification].url,
      linkTrackingType: config[notification].linkTrackingType,
    })).sort((a, b) => sortNotifications(a.type, b.type))

  }

  render() {
    const notifications = this.getNotifications()
    const { trackNotificationLinkClick } = this.props

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
              onLinkClick={notification.linkTrackingType ? () => trackNotificationLinkClick(notification.linkTrackingType) : undefined}
            />
          ) : null
        ))}
      </div>
    ) : null
  }
}

export { NotificationLogic }
