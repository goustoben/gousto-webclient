import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import css from './PricePerServingMessage.css'

const PricePerServingMessage = ({ fullPrice = null, discountedPrice = null, isCheckoutOverhaulEnabled = false }) => {
  if (discountedPrice) {
    const oldPrice = fullPrice !== discountedPrice ? (
      <span className={classNames(css.oldPrice, { [css.oldPriceRedesign]: isCheckoutOverhaulEnabled })}>
        <s>
          £
          {fullPrice}
        </s>
        {' '}
      </span>
    ) : null

    return (
      <p className={classNames(css.pricePerServingMessage, { [css.redesignMessage]: isCheckoutOverhaulEnabled })}>
        Price per serving:
        {' '}
        {oldPrice}
        {isCheckoutOverhaulEnabled
          ? <span className={css.newPriceRedesign}>{`£${discountedPrice}`}</span>
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
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

export { PricePerServingMessage }
