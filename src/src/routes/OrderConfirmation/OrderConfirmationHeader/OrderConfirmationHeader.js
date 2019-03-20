import React from 'react'
import PropTypes from 'prop-types'
import css from './OrderConfirmationHeader.css'

const OrderConfirmationHeader = ({deliveryDate, deliveryStart, deliveryEnd, whenCutoffTime, whenCutoffDate}) => (
  <div className={css.orderConfirmationHeader}>
    <div className={css.orderConfirmationColumns}>
      <h1 className={css.orderConfirmationTitle}>Thank you! Your order has been created.</h1>
      <p className={css.orderConfirmationDetails}>Delivery date: {deliveryDate} between {deliveryStart} - {deliveryEnd}</p>
      <p className={css.orderConfirmationDetails}>Your recipe choices have been saved and we will start picking your box soon.</p>
      <p className={css.orderConfirmationDetails}>You can edit your choices until {whenCutoffTime} on {whenCutoffDate}</p>
    </div>
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
