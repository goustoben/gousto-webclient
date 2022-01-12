import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { formatOrderPrice } from 'utils/pricing'
import { Text, FontWeight, Box, Color } from '@gousto-internal/citrus-react'

import css from './PricePerServingMessage.css'

const PricePerServingMessage = ({ fullPrice = null, discountedPrice = null, isPriceInCheckout = false }) => {
  if (discountedPrice) {
    // const oldPrice = fullPrice !== discountedPrice ? (
    //   <span className={classNames(css.oldPrice, { [css.oldPriceInCheckout]: isPriceInCheckout })}>
    //     <s>
    //       £
    //       {fullPrice}
    //     </s>
    //     {' '}
    //   </span>
    // ) : null

    return (
      <>
        <Text fontWeight={FontWeight.SemiBold}>
          Price per serving:
        </Text>
        {fullPrice !== discountedPrice && (
          <Box css={{marginTop: 4, marginLeft: 11}}>
            <Text>
              <s>
                £
                {fullPrice}
              </s>
            </Text>
          </Box>
        )}
        {isPriceInCheckout
          ? (
            <Box css={{marginLeft: 11}}>
              <Text fontWeight={FontWeight.Bold} size={3} color={Color.Success_900}>
                {formatOrderPrice(discountedPrice)}
              </Text>
            </Box>

          ) : (
            <Text>
              `£$
              {discountedPrice}
              `
            </Text>
          )}

        {/* <p className={classNames(css.pricePerServingMessage, { [css.priceMessageInCheckout]: isPriceInCheckout })}>
          Price per serving:
          {' '}
          {oldPrice}
          {isPriceInCheckout
            ? (
              <span className={css.newPriceInCheckout}>
                {formatOrderPrice(discountedPrice)}
              </span>
            )
            : `£${discountedPrice}`}
        </p> */}
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
