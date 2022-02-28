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
import React from 'react'

const DeliveryEducationBanner = () => (
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
      // AlignItems={AlignItems.Center}
      flexDirection="column"
    >
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

export { DeliveryEducationBanner }
