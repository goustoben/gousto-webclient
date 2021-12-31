import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { formatOrderPrice } from 'utils/pricing'
import { jsx } from '@emotion/react'
import { Text, FontWeight, Space, Color } from '@gousto-internal/zest-react'

import css from './PricePerServingMessage.css'

const PricePerServingMessage = ({ fullPrice = null, discountedPrice = null, isPriceInCheckout = false }) => {
  if (discountedPrice) {
    const oldPrice = fullPrice !== discountedPrice ? (
      <span className={classNames(css.oldPrice, { [css.oldPriceInCheckout]: isPriceInCheckout })}>
        <s>
          £
          {fullPrice}
        </s>
      </span>
    ) : null

    return (
      <>
        <Text fontWeight={FontWeight.SemiBold}>
          Price per serving:
        </Text>
        <Space size={2} direction="horizontal" />
        <Text style={{textDecoration: 'line-through'}}>
          £
          {fullPrice}
        </Text>
        {isPriceInCheckout
          ? (
            <>
              <Space size={2} direction="horizontal" />
              <Text fontWeight={FontWeight.SemiBold} size={3} color={Color.Success_800}>
                {formatOrderPrice(discountedPrice)}
              </Text>
            </>
          )
          : (
            <Text>
              `£$
              {discountedPrice}
              `
            </Text>
          )}
      </>
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
