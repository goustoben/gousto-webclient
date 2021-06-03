import React from 'react'
import PropTypes from 'prop-types'
import { CardWithLink } from 'CardWithLink'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import css from './PreviousOrder.css'

const PreviousOrder = ({
  hasTooltip,
  linkUrl,
  orderId,
  message,
  trackClick,
}) => (
  <CardWithLink
    linkLabel="Get help with this box"
    linkUrl={linkUrl}
    tooltipContent={hasTooltip
        && 'Any issues with this box? Let us know and we\'ll sort it out.'}
    trackClick={() => trackClick(orderId)}
  >
    <OrderDetails heading="Your most recent box delivery">
      <div className={css.orderDetailsItem}>
        <p className={css.message}><strong>{message}</strong></p>
      </div>
    </OrderDetails>
  </CardWithLink>
)

PreviousOrder.propTypes = {
  hasTooltip: PropTypes.bool.isRequired,
  linkUrl: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  trackClick: PropTypes.func.isRequired,
}

export { PreviousOrder }
