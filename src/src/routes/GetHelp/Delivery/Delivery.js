import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Card } from 'goustouicomponents'
import { client } from 'config/routes'
import { findNewestOrder, isOrderBeingDeliveredToday } from 'utils/order'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import { List } from '../components/List'
import { ItemLink } from '../components/ItemLink'
import { DeliverySimple } from './DeliverySimple'
import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.css'

const propTypes = {
  isNewSSRDeliveriesEnabled: PropTypes.bool.isRequired,
  loadOrderTrackingInfo: PropTypes.func.isRequired,
  orders: PropTypes.instanceOf(Immutable.Map),
  nextOrderTracking: PropTypes.string,
  params: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  trackDeliveryOther: PropTypes.func.isRequired,
  trackDeliveryStatus: PropTypes.func.isRequired,
  trackNextBoxTrackingClick: PropTypes.func.isRequired,
  trackSelectDeliveryCategory: PropTypes.func.isRequired,
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

  render() {
    const {
      isNewSSRDeliveriesEnabled,
      loadOrderTrackingInfo,
      nextOrderTracking,
      orders,
      params,
      trackDeliveryOther,
      trackDeliveryStatus,
      trackNextBoxTrackingClick,
      trackSelectDeliveryCategory,
      userLoadOrders,
    } = this.props

    if (!isNewSSRDeliveriesEnabled) {
      return (
        <DeliverySimple
          loadOrderTrackingInfo={loadOrderTrackingInfo}
          nextOrderTracking={nextOrderTracking}
          orders={orders}
          trackDeliveryOther={trackDeliveryOther}
          trackDeliveryStatus={trackDeliveryStatus}
          trackNextBoxTrackingClick={trackNextBoxTrackingClick}
          userLoadOrders={userLoadOrders}
        />
      )
    }

    return (
      <GetHelpLayout2 headingText="Get help with box issue?">
        <Card
          hasLateralBordersOnSmallScreens={false}
          className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
        >
          <List>
            <ItemLink
              label="I don't know when my box will arrive"
              to={client.getHelp.deliveryDontKnowWhen(params)}
              clientRouted
              testingSelector="deliveryDontKnowWhen"
              trackClick={() => trackSelectDeliveryCategory('i_dont_know_when_my_box_will_arrive')}
            />
            <ItemLink
              label="My box did not arrive"
              to={client.getHelp.deliveryDidntArrive(params)}
              clientRouted
              testingSelector="deliveryDidntArrive"
              trackClick={() => trackSelectDeliveryCategory('my_box_didnt_arrive')}
            />
            <ItemLink
              label="I had another issue"
              to={`${client.getHelp.index}/${client.getHelp.contact}`}
              clientRouted
              testingSelector="deliveryOtherIssue"
              trackClick={() => trackSelectDeliveryCategory('i_had_another_issue')}
            />
          </List>
        </Card>
      </GetHelpLayout2>
    )
  }
}

Delivery.defaultProps = defaultProps
Delivery.propTypes = propTypes

export {
  Delivery
}
