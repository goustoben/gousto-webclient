import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import logger from 'utils/logger'
import { shouldShowEntryPointTooltip } from 'apis/getHelp'
import { isOrderBeingDeliveredToday } from 'utils/order'
import { myGoustoOrderPropType } from '../../../GetHelp/getHelpPropTypes'
import { HeaderPresentation } from './Header.presentation'
class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasTooltipForNextOrder: false, hasTooltipForPreviousOrder: false }
  }

  componentDidMount() {
    this.fetchOrders()
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      loadNextProjectedOrder,
      loadOrderTrackingInfo,
      nextOrder,
      previousOrder,
      userId
    } = this.props

    if (userId && !prevProps.userId) {
      loadNextProjectedOrder(userId)
    }

    if (prevProps.previousOrder !== previousOrder) {
      this.checkShouldShowTooltip({
        orderDate: previousOrder.get('deliveryDate'),
        targetTime: 'yesterday',
      }).then(orderHasTooltip => {
        if (orderHasTooltip && !prevState.hasTooltipForPreviousOrder) {
          this.setState({ hasTooltipForPreviousOrder: true })
        }
      })
    }

    if (prevProps.nextOrder !== nextOrder) {
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

  fetchOrders = async () => {
    const { loadNextProjectedOrder, loadOrders, userId, userLoadData } = this.props

    if (!userId) {
      await userLoadData()
    }

    loadOrders()

    if (userId) {
      loadNextProjectedOrder(userId)
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
      isOrdersPending,
      isProjectedDeliveriesPending,
      nextOrder,
      nextProjectedOrder,
      nextOrderTracking,
      previousOrder,
      showSubscriberPricingBanner,
      subscriptionStatus,
      maxNumRecipes,
      isFetchingUserData,
    } = this.props
    const {
      hasTooltipForNextOrder,
      hasTooltipForPreviousOrder
    } = this.state
    const isLoading = isOrdersPending || isProjectedDeliveriesPending || isFetchingUserData
    const hasDeliveryToday = !!(nextOrder && isOrderBeingDeliveredToday(nextOrder.get('deliveryDate')))

    return (
      <HeaderPresentation
        nextProjectedOrder={nextProjectedOrder}
        hasDeliveryToday={hasDeliveryToday}
        isLoading={isLoading}
        nextOrder={nextOrder}
        hasTooltipForNextOrder={hasTooltipForNextOrder}
        nextOrderTracking={nextOrderTracking}
        hasTooltipForPreviousOrder={hasTooltipForPreviousOrder}
        previousOrder={previousOrder}
        showSubscriberPricingBanner={showSubscriberPricingBanner}
        subscriptionStatus={subscriptionStatus}
        maxNumRecipes={maxNumRecipes}
      />
    )
  }
}

Header.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isOrdersPending: PropTypes.bool.isRequired,
  isFetchingUserData: PropTypes.bool.isRequired,
  isProjectedDeliveriesPending: PropTypes.bool.isRequired,
  loadNextProjectedOrder: PropTypes.func.isRequired,
  loadOrders: PropTypes.func.isRequired,
  userLoadData: PropTypes.func.isRequired,
  loadOrderTrackingInfo: PropTypes.func,
  nextOrder: myGoustoOrderPropType,
  nextOrderTracking: PropTypes.string,
  nextProjectedOrder: PropTypes.shape({
    deliveryDate: PropTypes.string.isRequired,
  }),
  previousOrder: myGoustoOrderPropType,
  showSubscriberPricingBanner: PropTypes.bool,
  subscriptionStatus: PropTypes.string,
  userId: PropTypes.string,
  maxNumRecipes: PropTypes.number,
}

Header.defaultProps = {
  nextOrder: null,
  loadOrderTrackingInfo: () => {},
  nextOrderTracking: null,
  nextProjectedOrder: null,
  previousOrder: null,
  showSubscriberPricingBanner: false,
  subscriptionStatus: 'inactive',
  userId: null,
  maxNumRecipes: 4
}

export { Header }
