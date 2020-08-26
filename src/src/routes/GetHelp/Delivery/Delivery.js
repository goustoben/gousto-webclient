import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { browserHistory } from 'react-router'
import { windowOpen } from 'utils/window'
import { client } from 'config/routes'
import { CTA, ItemExpandable } from 'goustouicomponents'
import { findNewestOrder, isOrderBeingDeliveredToday } from 'utils/order'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import { List } from '../components/List'
import { ItemLink } from '../components/ItemLink'
import css from './Delivery.css'

const propTypes = {
  loadOrderTrackingInfo: PropTypes.func.isRequired,
  nextOrderTracking: PropTypes.string,
  orders: PropTypes.instanceOf(Immutable.Map),
  trackDeliveryOther: PropTypes.func.isRequired,
  trackDeliveryStatus: PropTypes.func.isRequired,
  trackNextBoxTrackingClick: PropTypes.func.isRequired,
  userLoadOrders: PropTypes.func.isRequired,
}
const defaultProps = {
  nextOrderTracking: null,
  orders: Immutable.Map({})
}

class Delivery extends PureComponent {
  async componentDidMount() {
    const { userLoadOrders } = this.props

    userLoadOrders()
  }

  componentDidUpdate(prevProps) {
    const { orders, loadOrderTrackingInfo } = this.props
    if (prevProps.orders.size !== orders.size) {
      const upcomingOrder = findNewestOrder(orders, true)
      const orderDeliveryDate = upcomingOrder && upcomingOrder.get('deliveryDate')

      if (upcomingOrder && isOrderBeingDeliveredToday(orderDeliveryDate)) {
        loadOrderTrackingInfo(upcomingOrder.get('id'))
      }
    }
  }

  getContent = ({ nextOrderTracking }) => (
    (!nextOrderTracking)
      ? {
        ctaLabel: 'View My Gousto',
        deliveryDescription: 'The tracking link is available on your day of delivery and this can be found on the "My Gousto" page under your next box delivery.',
      }
      : {
        ctaLabel: 'Track my box',
        deliveryDescription: 'The tracking link is now available, this can usually be found on the "My Gousto" page under your next box delivery.'
      }
  )

  trackMyBoxClick = () => {
    const { nextOrderTracking, orders, trackNextBoxTrackingClick } = this.props

    if (nextOrderTracking) {
      const foundUpcomingOrder = findNewestOrder(orders, true)

      trackNextBoxTrackingClick(foundUpcomingOrder.get('id'))
      windowOpen(nextOrderTracking)
    } else {
      browserHistory.push(client.myGousto)
    }
  }

  render() {
    const { trackDeliveryStatus, trackDeliveryOther } = this.props
    const { ctaLabel, deliveryDescription } = this.getContent(this.props)

    return (
      <GetHelpLayout2 headingText="Get help with box issue?">
        <List>
          <ItemExpandable
            label="Day of delivery tracking"
            trackClick={trackDeliveryStatus}
          >
            <div className={css.deliveryStatusContent}>
              <p>{deliveryDescription}</p>
              <CTA size="small" onClick={this.trackMyBoxClick} variant="primary">
                {ctaLabel}
              </CTA>
            </div>
          </ItemExpandable>
          <ItemLink
            label="Other"
            trackClick={trackDeliveryOther}
            to={`${client.getHelp.index}/${client.getHelp.contact}`}
            clientRouted
          />
        </List>
      </GetHelpLayout2>
    )
  }
}

Delivery.defaultProps = defaultProps
Delivery.propTypes = propTypes

export {
  Delivery
}
