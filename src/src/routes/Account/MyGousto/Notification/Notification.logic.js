import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import { NotificationPresentation } from './Notification.presentation'
import { config } from './config'
import { checkCardExpiryDate, checkAmendedDeliveryDate, checkOrderAwaitingSelection, checkRafOffer } from './notificationHelper'

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

    const banners = [
      checkCardExpiryDate(card, now),
      checkAmendedDeliveryDate(orders),
      checkOrderAwaitingSelection(orders, now),
      checkRafOffer(now)
    ].filter(banner => banner)

    this.setState({
      bannersToShow: banners
    })
  }

  sortBanners = (a, b) => {
    if (b.type === 'danger') return 1
    if (b.type === 'warning' && a.type !== 'danger') return 1
    if (b.type === 'notify' && a.type !== 'danger' && a.type !== 'warning') return 1

    return 0
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
      .sort((a, b) => this.sortBanners(a, b))

    return (
      <div>
        {
          notificationBannerDetails.map((banner, index) => {
            return index < 2 ?
              < NotificationPresentation key={banner.title} message={banner.message} type={banner.type} title={banner.title} url={banner.url} />
              : null
          })
        }
      </div>
    )

  }
}

export { NotificationLogic }
