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
      data-testing="delivery-education-banner"
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
        <Text color={Color.Informative_900}>
          <Icon name="cool" variant={IconVariant.Inherit} />
        </Text>
        <Space size={4} direction="horizontal" />
        <Text size={2} data-testing="delivery-education-info">
          Insulated packaging keeps your ingredients fresh for up to 12 hours.
        </Text>
      </Box>
      <Space size={2} />
      <Box display="flex" AlignItems={AlignItems.Center}>
        <Text color={Color.Informative_900}>
          <Icon name="delivery" variant={IconVariant.Inherit} />
        </Text>
        <Space size={4} direction="horizontal" />
        <Text size={2} data-testing="delivery-education-info">
          Delivery slot updates on the day via text and email.
        </Text>
      </Box>
    </Box>
    <Space size={8} />
  </>
)

export { DeliveryEducationBanner }
