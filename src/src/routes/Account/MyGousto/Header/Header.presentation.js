import React from 'react'
import PropTypes from 'prop-types'
import { userOrderPropType } from '../../../GetHelp/getHelpPropTypes'
import { NextOrderContainer } from './NextOrder'
import { NoNextOrder } from './NoNextOrder'
import { PreviousOrderContainer } from './PreviousOrder'
import { SubscriberPricingBanner } from './SubscriberPricingBanner'
import css from './Header.css'

const HeaderPresentation = ({
  hasDeliveryToday,
  nextOrder,
  nextOrderTracking,
  hasTooltipForNextOrder,
  hasTooltipForPreviousOrder,
  previousOrder,
  showSubscriberPricingBanner,
  subscriptionStatus,
}) => (
  <div>
    {showSubscriberPricingBanner && <SubscriberPricingBanner subscriptionStatus={subscriptionStatus} />}
    <div className={css.cardsContainer}>
      {previousOrder
          && (
            <PreviousOrderContainer
              hasDeliveryToday={hasDeliveryToday}
              hasTooltip={hasTooltipForPreviousOrder}
              order={previousOrder}
            />
          )}
      {nextOrder
        ? (
          <NextOrderContainer
            boxTrackingUrl={nextOrderTracking}
            hasDeliveryToday={hasDeliveryToday}
            hasTooltip={hasTooltipForNextOrder}
            order={nextOrder}
          />
        )
        : (
          <NoNextOrder />
        )}
    </div>
  </div>
)

HeaderPresentation.propTypes = {
  hasDeliveryToday: PropTypes.bool,
  hasTooltipForNextOrder: PropTypes.bool,
  hasTooltipForPreviousOrder: PropTypes.bool,
  nextOrder: userOrderPropType,
  nextOrderTracking: PropTypes.string,
  previousOrder: userOrderPropType,
  showSubscriberPricingBanner: PropTypes.bool.isRequired,
  subscriptionStatus: PropTypes.string,
}

HeaderPresentation.defaultProps = {
  hasDeliveryToday: false,
  hasTooltipForNextOrder: false,
  hasTooltipForPreviousOrder: false,
  nextOrder: null,
  nextOrderTracking: null,
  previousOrder: null,
  subscriptionStatus: 'inactive',
}

export { HeaderPresentation }
