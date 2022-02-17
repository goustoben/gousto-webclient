import React from 'react'
import classNames from 'classnames'
import { formatOrderPrice } from 'utils/pricing'

import css from './PricePerServingMessage.css'

type Props = {
  fullPrice: string | null
  discountedPrice: string | null
  isPriceInCheckout: boolean
}

const PricePerServingMessage = ({
  fullPrice = null,
  discountedPrice = null,
  isPriceInCheckout = false,
}: Props) => {
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
      <p
        className={classNames(css.pricePerServingMessage, {
          [css.priceMessageInCheckout]: isPriceInCheckout,
        })}
      >
        Price per serving:
        {' '}
        {oldPrice}
        {isPriceInCheckout ? (
          <span className={css.newPriceInCheckout}>{formatOrderPrice(discountedPrice)}</span>
        ) : (
          `£${discountedPrice}`
        )}
      </p>
    )
  } else {
    return null
  }
}

export { PricePerServingMessage }
