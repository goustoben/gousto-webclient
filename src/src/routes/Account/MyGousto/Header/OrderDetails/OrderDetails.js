import React from 'react'
import PropTypes from 'prop-types'
import css from './OrderDetails.css'

const OrderDetails = ({ heading, children }) => (
  <div className={css.contentWrapper}>
    <h2 className={css.heading}>{heading}</h2>
    {children}
  </div>
)

OrderDetails.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { OrderDetails }
