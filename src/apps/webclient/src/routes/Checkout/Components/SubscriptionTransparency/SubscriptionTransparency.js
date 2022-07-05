import React from 'react'

import {
  Box,
  Display,
  JustifyContent,
  AlignItems,
  FlexDirection,
} from '@gousto-internal/citrus-react'
import { TickText } from 'TickText'
import config from 'config'

export const SubscriptionTransparency = () => (
  <Box
    width="100%"
    display={Display.Flex}
    alignItems={AlignItems.Center}
    justifyContent={JustifyContent.Center}
    flexDirection={FlexDirection.Column}
  >
    <TickText
      maxWidth="72%"
      highlightedText="No commitment. No cancellation fees."
      ordinaryText="Skip a box or cancel your subscription online at anytime."
    />
    <TickText
      maxWidth="72%"
      highlightedText="Free delivery on your first box"
      ordinaryText={`(usually ${config.deliveryPriceConfig.deliveryPriceFormatted}) as a welcome treat.`}
    />
  </Box>
)
