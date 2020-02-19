import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Immutable from 'immutable'
import routes from 'config/routes'
import { shouldShowEntryPointTooltip } from 'apis/getHelp'
import logger from 'utils/logger'
import { HeaderPresentation } from './Header.presentation'

const ELIGIBILITY_DAYS = 7

class Header extends PureComponent {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    orders: PropTypes.instanceOf(Immutable.Map),
    loadOrderTrackingInfo: PropTypes.func,
    nextOrderTracking: PropTypes.string,
    trackNextBoxTrackingClick: PropTypes.func,
    trackOrderNotEligibleForSelfServiceResolutionClick: PropTypes.func,
  }

  static defaultProps = {
    orders: Immutable.Map({}),
    loadOrderTrackingInfo: () => {},
    nextOrderTracking: null,
    trackNextBoxTrackingClick: () => {},
    trackOrderNotEligibleForSelfServiceResolutionClick: () => {},
  }

  constructor(props) {
    super(props)
    this.state = { todayOrderHasTooltip: false }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { accessToken, orders, loadOrderTrackingInfo } = this.props
    if (prevProps.orders.size !== orders.size) {
      const now = moment()
      const nextOrder = this.findOrder(orders, now, 'next')

      if (nextOrder) {
        const date = moment(nextOrder.get('deliveryDate'))
        const nextOrderIsToday = now.format('YYMMDD') === date.format('YYMMDD')

        if (nextOrderIsToday) {
          const nextOrderId = nextOrder.get('id')
          loadOrderTrackingInfo(nextOrderId)
        }

        try {
          const { data: { day: showTooltipTime } } = await shouldShowEntryPointTooltip(
            accessToken,
            nextOrder.get('deliveryDate')
          )

          if (
            showTooltipTime === 'same_day_evening'
            && !prevState.todayOrderHasTooltip
          ) {
            this.setState({ todayOrderHasTooltip: true })
          }
        } catch (error) {
          logger.warning(
            'API call to shouldShowEntryPointTooltip thrown an error',
            error
          )
        }
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

  findOrder = (orders, now, orderToFind) => {
    const orderIndex = orders.reduce((currentOrderIndex, order, index) => {
      const orderDeliveryDate = moment(order.get('deliveryDate')).endOf('day')
      const orderValidComparedToNow = orderToFind === 'next'
        ? orderDeliveryDate.isAfter(now)
        : orderDeliveryDate.isBefore(now)

      if (!orderValidComparedToNow) return currentOrderIndex
      if (currentOrderIndex === null) return index

      const currentOrderDeliveryDate = moment(
        orders.getIn([currentOrderIndex, 'deliveryDate'])
      ).endOf('day')

      return orderDeliveryDate.isBetween(currentOrderDeliveryDate, now)
        || orderDeliveryDate.isBetween(now, currentOrderDeliveryDate)
        ? index
        : currentOrderIndex
    }, null)

    return orders.get(orderIndex)
  }

  render() {
    const {
      orders,
      nextOrderTracking,
      trackNextBoxTrackingClick,
      trackOrderNotEligibleForSelfServiceResolutionClick,
    } = this.props
    const { todayOrderHasTooltip } = this.state
    const now = moment()
    const nextOrder = this.findOrder(orders, now, 'next')
    const previousOrder = this.findOrder(orders, now, 'previous')
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
            nextOrderHasTooltip={todayOrderHasTooltip}
            nextOrderTracking={nextOrderTracking}
            numberOfDaysSincePreviousOrder={numberOfDaysSincePreviousOrder}
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

export { Header }
