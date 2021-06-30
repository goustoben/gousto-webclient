import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'goustouicomponents'
import { CardWithLink } from 'CardWithLink'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import css from './NoNextOrder.css'

const NoNextOrder = ({ linkLabel, linkUrl, primaryMessage }) => (
  <div>
    <Heading size="fontStyleM" type="h2">
      Upcoming delivery
    </Heading>
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
  </div>

)

NoNextOrder.propTypes = {
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  primaryMessage: PropTypes.string.isRequired,
}

export { NoNextOrder }
