import {
  Box,
  Color,
  Icon,
  IconVariant,
  Text,
  FontFamily,
  Space,
  Display,
  JustifyContent,
  AlignItems,
} from '@gousto-internal/citrus-react'

import React from 'react'

export const SubscriptionTransparency = () => (
  <Box width="100%" display={Display.Flex} justifyContent={JustifyContent.Center}>
    <Box
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      AlignItems={AlignItems.Center}
      paddingH={['0.75rem', 0]}
      maxWidth="72%"
      flexGrow={0}
      data-testing="container"
    >
      <Box>
        <Icon name="tick" variant={IconVariant.Confirmation} />
        <Space size={1} direction="horizontal" />
      </Box>

      <Text size={2} textAlign="center">
        <Text
          fontWeight={FontFamily.Bold}
          color={Color.Success_600}
          display="inline-block"
          data-testing="highlighted"
        >
          No commitment. No cancellation fees.
        </Text>{' '}
        Skip a box or cancel your subscription online at anytime.
      </Text>
    </Box>
  </Box>
)
