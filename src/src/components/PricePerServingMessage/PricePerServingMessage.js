import React from 'react'
import PropTypes from 'prop-types'

import css from './PricePerServingMessage.css'

const PricePerServingMessage = ({ fullPrice = null, discountedPrice = null }) => {
  if (discountedPrice) {
    const oldPrice =
      fullPrice !== discountedPrice ? (
        <span className={css.oldPrice}><s>£{fullPrice}</s> </span>
      ) : null
  
    return (
      <p className={css.pricePerServingMessage}>
        Price per serving: {oldPrice}£{discountedPrice}
      </p>
    )
  } else {
    return null
  }
}

PricePerServingMessage.propTypes = {
  fullPrice: PropTypes.string,
  discountedPrice: PropTypes.string
}

export { PricePerServingMessage }
