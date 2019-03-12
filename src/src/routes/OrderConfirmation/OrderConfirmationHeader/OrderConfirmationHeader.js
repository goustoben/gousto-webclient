import React from 'react'
import PropTypes from 'prop-types'

const OrderConfirmationHeader = ({deliveryDate, deliveryStart, deliveryEnd, whenCutoffTime, whenCutoffDate}) => (
  <div className="gousto-market-header-confirmation">
    <div className="col-md-12 wrap">
      <h1>Thank you! Your order has been created.</h1>
      <p>Delivery date: {deliveryDate} between {deliveryStart} - {deliveryEnd}</p>
      <p>Your recipe choices have been saved and we will start picking your box soon.</p>
      <p>You can edit your choices until {whenCutoffTime} on {whenCutoffDate}</p>
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
