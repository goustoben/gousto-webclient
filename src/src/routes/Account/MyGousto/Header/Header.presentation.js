import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { NextOrder } from './NextOrder'
import { NoNextOrder } from './NoNextOrder'
import { PreviousOrderContainer } from './PreviousOrder'
import { SubscriberPricingBanner } from './SubscriberPricingBanner'
import css from './Header.css'

const HeaderPresentation = ({
  hasDeliveryToday,
  nextOrderId,
  nextOrderMessage,
  nextOrderTracking,
  hasTooltipForNextOrder,
  hasTooltipForPreviousOrder,
  previousOrder,
  trackClickGetHelpWithThisBox,
  trackNextBoxTrackingClick,
  showSubscriberPricingBanner,
  subscriptionStatus,
}) => {
  const hasNextOrder = nextOrderMessage.secondary
  const { linkLabel, linkUrl } = nextOrderMessage

  return (
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
        {hasNextOrder
          ? (
            <NextOrder
              boxTrackingUrl={nextOrderTracking}
              hasDeliveryToday={hasDeliveryToday}
              hasTooltip={hasTooltipForNextOrder}
              linkLabel={linkLabel}
              linkUrl={linkUrl}
              orderId={nextOrderId}
              primaryMessage={nextOrderMessage.primary}
              secondaryMessage={nextOrderMessage.secondary}
              trackButtonClick={trackNextBoxTrackingClick}
              trackLinkClick={trackClickGetHelpWithThisBox}
            />
          )
          : (
            <NoNextOrder
              linkLabel={nextOrderMessage.linkLabel}
              linkUrl={nextOrderMessage.linkUrl}
              primaryMessage={nextOrderMessage.primary}
            />
          )}
      </div>
    </div>
  )
}

HeaderPresentation.propTypes = {
  hasDeliveryToday: PropTypes.bool,
  hasTooltipForNextOrder: PropTypes.bool,
  hasTooltipForPreviousOrder: PropTypes.bool,
  nextOrderId: PropTypes.string,
  nextOrderMessage: PropTypes.shape({
    linkLabel: PropTypes.string,
    linkUrl: PropTypes.string,
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
  nextOrderTracking: PropTypes.string,
  previousOrder: ImmutablePropTypes.contains({
    deliveryDate: PropTypes.string,
    orderId: PropTypes.string,
    orderState: PropTypes.string,
    price: PropTypes.string,
    recipeImages: ImmutablePropTypes.contains({
      alt: PropTypes.string,
      src: PropTypes.string,
    }),
  }),
  showSubscriberPricingBanner: PropTypes.bool.isRequired,
  subscriptionStatus: PropTypes.string,
  trackClickGetHelpWithThisBox: PropTypes.func,
  trackNextBoxTrackingClick: PropTypes.func,
}

HeaderPresentation.defaultProps = {
  hasDeliveryToday: false,
  hasTooltipForNextOrder: false,
  hasTooltipForPreviousOrder: false,
  nextOrderId: null,
  nextOrderMessage: {
    linkLabel: null,
    linkUrl: null,
    primary: null,
    secondary: null,
  },
  nextOrderTracking: null,
  previousOrder: null,
  subscriptionStatus: 'inactive',
  trackClickGetHelpWithThisBox: () => {},
  trackNextBoxTrackingClick: () => {},
}

export { HeaderPresentation }
