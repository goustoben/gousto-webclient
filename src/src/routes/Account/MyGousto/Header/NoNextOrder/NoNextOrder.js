import React from 'react'
import PropTypes from 'prop-types'
import { CardWithLink } from 'CardWithLink'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import css from './NoNextOrder.css'

const NoNextOrder = ({ linkLabel, linkUrl, primaryMessage }) => (
  <CardWithLink
    linkLabel={linkLabel}
    linkUrl={linkUrl}
  >
    <OrderDetails heading="Your next box delivery">
      <div className={css.orderDetailsItem}>
        <p className={css.message}><strong>{primaryMessage}</strong></p>
      </div>
    </OrderDetails>
  </CardWithLink>
)

NoNextOrder.propTypes = {
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  primaryMessage: PropTypes.string.isRequired,
}

export { NoNextOrder }
