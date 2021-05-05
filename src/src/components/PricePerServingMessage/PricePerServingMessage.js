import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import css from './PricePerServingMessage.css'

const PricePerServingMessage = ({ fullPrice = null, discountedPrice = null, isPriceInCheckout = false }) => {
  if (discountedPrice) {
    const oldPrice = fullPrice !== discountedPrice ? (
      <span className={classNames(css.oldPrice, { [css.oldPriceInCheckout]: isPriceInCheckout })}>
        <s>
          £
          {fullPrice}
        </s>
        {' '}
      </span>
    ) : null

    return (
      <p className={classNames(css.pricePerServingMessage, { [css.priceMessageInCheckout]: isPriceInCheckout })}>
        Price per serving:
        {' '}
        {oldPrice}
        {isPriceInCheckout
          ? <span className={css.newPriceInCheckout}>{`£${discountedPrice}`}</span>
          : `£${discountedPrice}`}
      </p>
    )
  } else {
    return null
  }
}

PricePerServingMessage.propTypes = {
  fullPrice: PropTypes.string,
  discountedPrice: PropTypes.string,
  isPriceInCheckout: PropTypes.bool,
}

export { PricePerServingMessage }
