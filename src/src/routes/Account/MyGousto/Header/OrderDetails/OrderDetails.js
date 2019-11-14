import React from 'react'
import PropTypes from 'prop-types'
import css from './OrderDetails.css'

const OrderDetails = ({
  heading,
  messagePrimary,
  messageSecondary,
}) => (
  <div className={css.contentWrapper}>
    <p>{heading}</p>
    <p className={css.messagePrimary}>
      {messagePrimary}
    </p>
    {messageSecondary && (
      <p className={css.messageSecondary}>{messageSecondary}</p>
    )}
  </div>
)

OrderDetails.propTypes = {
  heading: PropTypes.string.isRequired,
  messagePrimary: PropTypes.string.isRequired,
  messageSecondary: PropTypes.string,
}

OrderDetails.defaultProps = {
  messageSecondary: '',
}

export { OrderDetails }
