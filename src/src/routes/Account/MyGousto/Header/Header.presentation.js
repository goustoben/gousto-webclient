import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import { NextOrder } from './NextOrder'
import { NoNextOrder } from './NoNextOrder'
import { PreviousOrder } from './PreviousOrder'
import { SubscriberPricingBanner } from './SubscriberPricingBanner'
import css from './Header.css'

const HeaderPresentation = ({
  hasDeliveryToday,
  nextOrderId,
  nextOrderMessage,
  nextOrderTracking,
  hasTooltipForNextOrder,
  hasTooltipForPreviousOrder,
  previosOrderId,
  previousOrderMessage,
  getHelpQueryParam,
  trackClickGetHelpWithThisBox,
  trackNextBoxTrackingClick,
  showSubscriberPricingBanner,
  subscriptionStatus,
}) => {
  const getHelpUrlSuffix = getHelpQueryParam
    || `/${config.routes.client.getHelp.contact}`

  const { client } = config.routes
  const hasNextOrder = nextOrderMessage.secondary
  const { linkLabel, linkUrl } = nextOrderMessage

  return (
    <div>
      {showSubscriberPricingBanner && <SubscriberPricingBanner subscriptionStatus={subscriptionStatus} />}
      <div className={css.cardsContainer}>
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
        {previousOrderMessage
          && (
            <PreviousOrder
              hasTooltip={hasTooltipForPreviousOrder}
              linkUrl={`${client.getHelp.index}${getHelpUrlSuffix}`}
              orderId={previosOrderId}
              message={previousOrderMessage}
              trackClick={trackClickGetHelpWithThisBox}
            />
          )}
      </div>
    </div>
  )
}

HeaderPresentation.propTypes = {
  hasDeliveryToday: PropTypes.bool,
  nextOrderId: PropTypes.string,
  nextOrderMessage: PropTypes.shape({
    linkLabel: PropTypes.string,
    linkUrl: PropTypes.string,
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
  hasTooltipForNextOrder: PropTypes.bool,
  nextOrderTracking: PropTypes.string,
  hasTooltipForPreviousOrder: PropTypes.bool,
  previosOrderId: PropTypes.string,
  previousOrderMessage: PropTypes.string,
  getHelpQueryParam: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  trackClickGetHelpWithThisBox: PropTypes.func,
  trackNextBoxTrackingClick: PropTypes.func,
  showSubscriberPricingBanner: PropTypes.bool.isRequired,
  subscriptionStatus: PropTypes.string,
}

HeaderPresentation.defaultProps = {
  hasDeliveryToday: false,
  nextOrderId: null,
  nextOrderMessage: {
    linkLabel: null,
    linkUrl: null,
    primary: null,
    secondary: null,
  },
  hasTooltipForNextOrder: false,
  nextOrderTracking: null,
  hasTooltipForPreviousOrder: false,
  previosOrderId: null,
  previousOrderMessage: null,
  getHelpQueryParam: false,
  trackClickGetHelpWithThisBox: () => {},
  trackNextBoxTrackingClick: () => {},
  subscriptionStatus: 'inactive',
}

export { HeaderPresentation }
