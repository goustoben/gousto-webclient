import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import { windowOpen } from 'utils/window'
import { CardWithLink } from 'CardWithLink'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import css from './NextOrder.css'

const NextOrder = ({
  boxTrackingUrl,
  hasDeliveryToday,
  hasTooltip,
  linkLabel,
  linkUrl,
  orderId,
  primaryMessage,
  secondaryMessage,
  trackButtonClick,
  trackLinkClick,
}) => (
  <CardWithLink
    linkLabel={linkLabel}
    linkUrl={linkUrl}
    testingSelector="nextBoxDeliveryHelp"
    tooltipContent={hasTooltip
      && 'Any issues with this box? Let us know and we\'ll sort it out.'}
    trackClick={hasDeliveryToday ? () => trackLinkClick(orderId) : null}
  >
    <OrderDetails heading="Your next box delivery">
      <div className={css.nextOrder}>
        <div className={css.orderDetailsItem}>
          <p className={css.message}><strong>{primaryMessage}</strong></p>
          <p className={css.message}>{secondaryMessage}</p>
        </div>
        {boxTrackingUrl && (
          <div className={css.orderDetailsItem}>
            <Button
              width="full"
              onClick={() => {
                trackButtonClick(orderId)
                windowOpen(boxTrackingUrl)
              }}
            >
              Track my box
            </Button>
          </div>
        )}
      </div>
    </OrderDetails>
  </CardWithLink>
)

NextOrder.propTypes = {
  boxTrackingUrl: PropTypes.string,
  hasDeliveryToday: PropTypes.bool.isRequired,
  hasTooltip: PropTypes.bool.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  primaryMessage: PropTypes.string.isRequired,
  secondaryMessage: PropTypes.string.isRequired,
  trackButtonClick: PropTypes.func.isRequired,
  trackLinkClick: PropTypes.func.isRequired,
}

NextOrder.defaultProps = {
  boxTrackingUrl: null,
}

export { NextOrder }
