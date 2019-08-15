import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './OrderConfirmationHeader.css'

const OrderConfirmationHeader = ({deliveryDate, deliveryStart, deliveryEnd, whenCutoffTime, whenCutoffDate}) => (
  <div data-testing="orderConfirmationHeader">
    <p className={css.paragraph}>Delivery date: {deliveryDate} between {deliveryStart} - {deliveryEnd}</p>
    <p className={classnames(css.paragraph, css.bold)}>You can edit your choices until {whenCutoffTime} on {whenCutoffDate}</p>
  </div>
)

OrderConfirmationHeader.propTypes = {
  deliveryDate: PropTypes.string.isRequired,
  deliveryStart: PropTypes.string.isRequired,
  deliveryEnd: PropTypes.string.isRequired,
  whenCutoffTime: PropTypes.string.isRequired,
  whenCutoffDate: PropTypes.string.isRequired,
}

export { OrderConfirmationHeader }
