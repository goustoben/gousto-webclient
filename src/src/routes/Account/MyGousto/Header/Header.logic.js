import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Immutable from 'immutable'
import routes from 'config/routes'
import logger from 'utils/logger'
import { shouldShowEntryPointTooltip } from 'apis/getHelp'
import {
  findNewestOrder,
  isOrderBeingDeliveredToday
} from 'utils/order'
import { HeaderPresentation } from './Header.presentation'

const ELIGIBILITY_DAYS = 7

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

  formatPreviousBoxDate = order => {
    if (!order) return null

    const deliveryDate = moment(order.get('deliveryDate'))

    return deliveryDate.format('dddd Do MMMM')
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
      trackNextBoxTrackingClick,
      trackOrderNotEligibleForSelfServiceResolutionClick,
    } = this.props
    const { hasTooltipForNextOrder, hasTooltipForPreviousOrder } = this.state
    const now = moment()
    const nextOrder = findNewestOrder(orders, true)
    const previousOrder = findNewestOrder(orders, false)
    const nextOrderMessage = this.formatNextOrderCopy(nextOrder, now)
    const numberOfDaysSincePreviousOrder = previousOrder
      && now.diff(moment(previousOrder.get('deliveryDate')), 'days', true)
    const previousOrderMessage = this.formatPreviousBoxDate(previousOrder, now)
    const isOrderElegibleForSelfRefundResolution = numberOfDaysSincePreviousOrder
      && numberOfDaysSincePreviousOrder < ELIGIBILITY_DAYS
    const getHelpQueryParam = isOrderElegibleForSelfRefundResolution
      && `?orderId=${previousOrder.get('id')}`
    const loaded = nextOrder || previousOrder
    const onPreviousBoxGetHelpClick = isOrderElegibleForSelfRefundResolution
      ? () => {}
      : () => {
        const parsedNumberOfDaysSincePreviousOrder = parseInt(
          numberOfDaysSincePreviousOrder,
          0
        )

        if (parsedNumberOfDaysSincePreviousOrder >= 0) {
          trackOrderNotEligibleForSelfServiceResolutionClick(
            parsedNumberOfDaysSincePreviousOrder
          )
        }
      }

    return (
      (loaded)
        ? (
          <HeaderPresentation
            nextOrderMessage={nextOrderMessage}
            nextOrderId={nextOrder ? nextOrder.get('id') : null}
            hasTooltipForNextOrder={hasTooltipForNextOrder}
            nextOrderTracking={nextOrderTracking}
            numberOfDaysSincePreviousOrder={numberOfDaysSincePreviousOrder}
            hasTooltipForPreviousOrder={hasTooltipForPreviousOrder}
            previousOrderMessage={previousOrderMessage}
            getHelpQueryParam={getHelpQueryParam}
            trackNextBoxTrackingClick={trackNextBoxTrackingClick}
            onPreviousBoxGetHelpClick={onPreviousBoxGetHelpClick}
          />
        )
        : null
    )
  }
}

Header.propTypes = {
  accessToken: PropTypes.string.isRequired,
  orders: PropTypes.instanceOf(Immutable.Map),
  loadOrderTrackingInfo: PropTypes.func,
  nextOrderTracking: PropTypes.string,
  trackNextBoxTrackingClick: PropTypes.func,
  trackOrderNotEligibleForSelfServiceResolutionClick: PropTypes.func,
}

Header.defaultProps = {
  orders: Immutable.Map({}),
  loadOrderTrackingInfo: () => {},
  nextOrderTracking: null,
  trackNextBoxTrackingClick: () => {},
  trackOrderNotEligibleForSelfServiceResolutionClick: () => {},
}

export { Header }
