import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import logger from 'utils/logger'
import { shouldShowEntryPointTooltip } from 'apis/getHelp'
import {
  findNewestOrder,
  isOrderBeingDeliveredToday,
} from 'utils/order'
import { userOrderPropType } from '../../../GetHelp/getHelpPropTypes'
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
      showSubscriberPricingBanner,
      subscriptionStatus,
    } = this.props
    const {
      hasTooltipForNextOrder,
      hasTooltipForPreviousOrder
    } = this.state
    const nextOrder = findNewestOrder(orders, true)
    const previousOrder = findNewestOrder(orders, false)
    const loaded = nextOrder || previousOrder
    const hasDeliveryToday = nextOrder && isOrderBeingDeliveredToday(nextOrder.get('deliveryDate'))

    return (
      (loaded)
        ? (
          <HeaderPresentation
            hasDeliveryToday={hasDeliveryToday}
            nextOrder={nextOrder}
            hasTooltipForNextOrder={hasTooltipForNextOrder}
            nextOrderTracking={nextOrderTracking}
            hasTooltipForPreviousOrder={hasTooltipForPreviousOrder}
            previousOrder={previousOrder}
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
  orders: ImmutablePropTypes.mapOf(userOrderPropType),
  showSubscriberPricingBanner: PropTypes.bool,
  subscriptionStatus: PropTypes.string,
}

Header.defaultProps = {
  loadOrderTrackingInfo: () => {},
  nextOrderTracking: null,
  orders: Immutable.Map({}),
  showSubscriberPricingBanner: false,
  subscriptionStatus: 'inactive',
}

export { Header }
