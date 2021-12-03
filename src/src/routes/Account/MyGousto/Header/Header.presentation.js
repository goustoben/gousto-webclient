import React from 'react'
import PropTypes from 'prop-types'
import Loading from 'Loading'
import { myGoustoOrderPropType } from '../../../GetHelp/getHelpPropTypes'
import { NextOrderContainer } from './NextOrder'
import { NextProjectedDelivery } from './NextProjectedDelivery'
import { NoNextOrder } from './NoNextOrder'
import { PreviousOrderContainer } from './PreviousOrder'
import { SubscriberPricingBanner } from './SubscriberPricingBanner'
import css from './Header.module.css'

const HeaderPresentation = ({
  nextProjectedOrder,
  hasDeliveryToday,
  isLoading,
  nextOrder,
  nextOrderTracking,
  hasTooltipForNextOrder,
  hasTooltipForPreviousOrder,
  previousOrder,
  showSubscriberPricingBanner,
  subscriptionStatus,
}) => {
  const previousOrderCard = previousOrder
    ? (
      <PreviousOrderContainer
        hasDeliveryToday={hasDeliveryToday}
        hasTooltip={hasTooltipForPreviousOrder}
        order={previousOrder}
      />
    ) : null

  const renderUpcomingOrderCard = () => {
    if (nextOrder) {
      return (
        <NextOrderContainer
          boxTrackingUrl={nextOrderTracking}
          hasDeliveryToday={hasDeliveryToday}
          hasTooltip={hasTooltipForNextOrder}
          order={nextOrder}
        />
      )
    }

    if (nextProjectedOrder) {
      return <NextProjectedDelivery deliveryDate={nextProjectedOrder.deliveryDate} />
    }

    return <NoNextOrder />
  }

  return (
    <div>
      {showSubscriberPricingBanner && <SubscriberPricingBanner subscriptionStatus={subscriptionStatus} />}
      {isLoading
        ? (
          <div className={css.loading}>
            <Loading />
          </div>
        ) : (
          <div className={`${css.cardsContainer}`}>
            {previousOrderCard}
            {renderUpcomingOrderCard()}
          </div>
        )}
    </div>
  )
}

HeaderPresentation.propTypes = {
  hasDeliveryToday: PropTypes.bool,
  hasTooltipForNextOrder: PropTypes.bool,
  hasTooltipForPreviousOrder: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  nextOrder: myGoustoOrderPropType,
  nextOrderTracking: PropTypes.string,
  nextProjectedOrder: PropTypes.shape({
    deliveryDate: PropTypes.string.isRequired,
  }),
  previousOrder: myGoustoOrderPropType,
  showSubscriberPricingBanner: PropTypes.bool.isRequired,
  subscriptionStatus: PropTypes.string,
}

HeaderPresentation.defaultProps = {
  hasDeliveryToday: false,
  hasTooltipForNextOrder: false,
  hasTooltipForPreviousOrder: false,
  nextOrder: null,
  nextOrderTracking: null,
  nextProjectedOrder: null,
  previousOrder: null,
  subscriptionStatus: 'inactive',
}

export { HeaderPresentation }
