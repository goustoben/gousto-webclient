import React from 'react'
import PropTypes from 'prop-types'
import { formatOrderPrice } from 'utils/pricing'
import {
  Text,
  FontWeight,
  Box,
  Color,
  Space,
  FlexDirection,
  AlignItems,
} from '@gousto-internal/citrus-react'

const PricePerServingMessage = ({ fullPrice, discountedPrice, isPriceInCheckout }) => {
  if (discountedPrice) {
    return (
      <>
        <Box
          display="flex"
          flexDirection={FlexDirection.Row}
          alignItems={AlignItems.Center}
          data-testing="pricePerServingMessage"
        >
          <Text fontWeight={FontWeight.SemiBold}>Price per serving:</Text>

          {fullPrice !== discountedPrice && (
            <>
              <Space direction="horizontal" size={isPriceInCheckout ? 3 : 1} />
              <Box>
                {isPriceInCheckout && <Space size={1} />}
                <Text data-testing="oldPrice">
                  <s>
                    £
                    {fullPrice}
                  </s>
                </Text>
              </Box>
            </>
          )}

          <Space direction="horizontal" size={isPriceInCheckout ? 3 : 1} />
          {isPriceInCheckout ? (
            <Text fontWeight={FontWeight.Bold} size={3} color={Color.Success_900}>
              {formatOrderPrice(discountedPrice)}
            </Text>
          ) : (
            <Text fontWeight={FontWeight.Bold}>
              £
              {discountedPrice}
            </Text>
          )}
        </Box>

        {!isPriceInCheckout && <Space size={4} />}
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

PricePerServingMessage.defaultProps = {
  fullPrice: null,
  discountedPrice: null,
  isPriceInCheckout: false,
}

export { PricePerServingMessage }
