import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Immutable from 'immutable'
import routes from 'config/routes'
import logger from 'utils/logger'
import { shouldShowEntryPointTooltip } from 'apis/getHelp'
import {
  findNewestOrder,
  isOrderBeingDeliveredToday,
} from 'utils/order'
import { HeaderPresentation } from './Header.presentation'

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasTooltipForNextOrder: false, hasTooltipForPreviousOrder: false }
  }

  componentDidUpdate(prevProps, prevState) {
    const { orders, loadOrderTrackingInfo } = this.props
    if (prevProps.orders.size !== orders.size) {
      const previousOrder = findNewestOrder(orders, false)
      const nextOrder = findNewestOrder(orders, true)

      if (previousOrder) {
        this.checkShouldShowTooltip({
          orderDate: previousOrder.get('deliveryDate'),
          targetTime: 'yesterday',
        }).then(orderHasTooltip => {
          if (orderHasTooltip && !prevState.hasTooltipForPreviousOrder) {
            this.setState({ hasTooltipForPreviousOrder: true })
          }
        })
      }

      if (nextOrder) {
        if (isOrderBeingDeliveredToday(nextOrder.get('deliveryDate'))) {
          loadOrderTrackingInfo(nextOrder.get('id'))
        }

        this.checkShouldShowTooltip({
          orderDate: nextOrder.get('deliveryDate'),
          targetTime: 'same_day_evening',
        }).then(orderHasTooltip => {
          if (orderHasTooltip && !prevState.hasTooltipForNextOrder) {
            this.setState({ hasTooltipForNextOrder: true })
          }
        })
      }
    }
  }

  formatNextOrderCopy = (order, now) => {
    if (!order) {
      return {
        linkLabel: 'View this week\'s menu',
        linkUrl: routes.client.menu,
        primary: 'No boxes scheduled',
        secondary: '',
      }
    }

    const deliveryDay = order.get('deliveryDate').substring(0, 10)
    const start = moment(`${deliveryDay} ${order.getIn(['deliverySlot', 'deliveryStart'])}`)
    const end = moment(`${deliveryDay} ${order.getIn(['deliverySlot', 'deliveryEnd'])}`)
    const roundedEnd = end.minute() || end.second() || end.millisecond()
      ? end.add(1, 'h').startOf('hour')
      : end
    const timeRange = `${start.format('ha')} - ${roundedEnd.format('ha')}`

    const date = moment(order.get('deliveryDate'))
    const isOrderForToday = now.format('YYMMDD') === date.format('YYMMDD')

    return {
      linkLabel: isOrderForToday
        ? 'Get help with this box' : 'View my deliveries',
      linkUrl: isOrderForToday
        ? `${routes.client.getHelp.index}?orderId=${order.get('id')}`
        : routes.client.myDeliveries,
      primary: isOrderForToday ? 'Today' : date.format('dddd Do MMMM'),
      secondary: timeRange,
    }
  }

  checkShouldShowTooltip = async ({ orderDate, targetTime }) => {
    const { accessToken } = this.props

    try {
      const { data: { day: showTooltipTime } } = await shouldShowEntryPointTooltip(
        accessToken,
        orderDate
      )

      if (showTooltipTime === targetTime) {
        return true
      }
    } catch (error) {
      logger.warning(
        `API call to shouldShowEntryPointTooltip for order with date ${orderDate} thrown an error`,
        error
      )
    }

    return false
  }

  render() {
    const {
      orders,
      nextOrderTracking,
      trackClickGetHelpWithThisBox,
      trackNextBoxTrackingClick,
      showSubscriberPricingBanner,
      subscriptionStatus,
    } = this.props
    const {
      hasTooltipForNextOrder,
      hasTooltipForPreviousOrder
    } = this.state
    const now = moment()
    const nextOrder = findNewestOrder(orders, true)
    const previousOrder = findNewestOrder(orders, false)
    const nextOrderMessage = this.formatNextOrderCopy(nextOrder, now)
    const loaded = nextOrder || previousOrder
    const hasDeliveryToday = nextOrder && isOrderBeingDeliveredToday(nextOrder.get('deliveryDate'))

    return (
      (loaded)
        ? (
          <HeaderPresentation
            hasDeliveryToday={hasDeliveryToday}
            nextOrderMessage={nextOrderMessage}
            nextOrderId={nextOrder ? nextOrder.get('id') : null}
            hasTooltipForNextOrder={hasTooltipForNextOrder}
            nextOrderTracking={nextOrderTracking}
            hasTooltipForPreviousOrder={hasTooltipForPreviousOrder}
            previousOrder={previousOrder}
            trackClickGetHelpWithThisBox={trackClickGetHelpWithThisBox}
            trackNextBoxTrackingClick={trackNextBoxTrackingClick}
            showSubscriberPricingBanner={showSubscriberPricingBanner}
            subscriptionStatus={subscriptionStatus}
          />
        )
        : null
    )
  }
}

Header.propTypes = {
  accessToken: PropTypes.string.isRequired,
  loadOrderTrackingInfo: PropTypes.func,
  nextOrderTracking: PropTypes.string,
  orders: PropTypes.instanceOf(Immutable.Map),
  showSubscriberPricingBanner: PropTypes.bool,
  subscriptionStatus: PropTypes.string,
  trackClickGetHelpWithThisBox: PropTypes.func,
  trackNextBoxTrackingClick: PropTypes.func,
}

Header.defaultProps = {
  loadOrderTrackingInfo: () => {},
  nextOrderTracking: null,
  orders: Immutable.Map({}),
  showSubscriberPricingBanner: false,
  subscriptionStatus: 'inactive',
  trackClickGetHelpWithThisBox: () => {},
  trackNextBoxTrackingClick: () => {},
}

export { Header }
