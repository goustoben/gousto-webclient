import React from 'react'
import PropTypes from 'prop-types'

import css from './PricePerServingMessage.css'

const PricePerServingMessage = ({ fullPrice, discountedPrice }) => {
  const oldPrice =
    fullPrice !== discountedPrice ? (
      <span className={css.oldPrice}><s>£{fullPrice}</s> </span>
    ) : null

  return (
    <p className={css.pricePerServingMessage}>
      Price per serving: {oldPrice}£{discountedPrice}
    </p>
  )
}

PricePerServingMessage.propTypes = {
  fullPrice: PropTypes.string.isRequired,
  discountedPrice: PropTypes.string.isRequired
}

export { PricePerServingMessage }
