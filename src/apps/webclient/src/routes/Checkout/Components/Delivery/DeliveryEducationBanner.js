import React from 'react'

import {
  Box,
  Text,
  Color,
  BorderStyle,
  Space,
  Icon,
  IconVariant,
  AlignItems,
} from '@gousto-internal/citrus-react'
import PropTypes from 'prop-types'

const DeliveryEducationBanner = ({ deliveryDate, deliveryTime }) => (
  <>
    <Box
      bg={Color.Informative_50}
      paddingH={4}
      paddingV={3.5}
      borderStyle={BorderStyle.Solid}
      borderColor={Color.Informative_200}
      borderWidth={0.5}
      borderRadius={2}
      display="flex"
      flexDirection="column"
    >
      {deliveryTime && deliveryDate && (
        <Text size={2}>
          Your selected delivery day is <span style={{ fontWeight: 'bold' }}>{deliveryDate}, </span>
          <span style={{ textTransform: 'uppercase' }}>{deliveryTime}</span>
        </Text>
      )}
      <Box display="flex" AlignItems={AlignItems.Center}>
        <Icon name="cool" variant={IconVariant.Informative} />
        <Space size={4} direction="horizontal" />
        <Text size={2}>Insulated packaging keeps your ingredients fresh for up to 12 hours.</Text>
      </Box>
      <Space size={2} />
      <Box display="flex" AlignItems={AlignItems.Center}>
        <Icon name="delivery" variant={IconVariant.Informative} />
        <Space size={4} direction="horizontal" />
        <Text size={2}>Delivery slot updates on the day via text and email.</Text>
      </Box>
    </Box>
    <Space size={8} />
  </>
)

DeliveryEducationBanner.propTypes = {
  deliveryDate: PropTypes.string,
  deliveryTime: PropTypes.string,
}

DeliveryEducationBanner.defaultProps = {
  deliveryDate: null,
  deliveryTime: null,
}

export { DeliveryEducationBanner }
