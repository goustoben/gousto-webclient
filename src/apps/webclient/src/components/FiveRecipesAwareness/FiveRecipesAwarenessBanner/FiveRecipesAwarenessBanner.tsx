import React from 'react'

import {
  Box,
  Icon,
  IconVariant,
  Heading5,
  Paragraph,
  FlexDirection,
  Color,
  BorderStyle,
} from '@gousto-internal/citrus-react'

import { sendClientMetric } from 'routes/Menu/apis/clientMetrics'

import { use5RecipesAwareness } from '../use5RecipesAwareness'

export const FiveRecipesAwarenessBanner = () => {
  const { isEnabled, hasClosedBanner, setBannerAsClosed } = use5RecipesAwareness()

  const onBannerClose = () => {
    setBannerAsClosed()
    sendClientMetric('my-deliveries-five-recipes-awareness-4M-2P', 1, 'Count')
  }

  if (!isEnabled || hasClosedBanner) {
    return null
  }

  return (
    <Box width="80%" paddingH={3}>
      <Box
        bg={Color.Informative_50}
        borderColor={Color.Informative_200}
        display="flex"
        flexDirection={FlexDirection.Row}
        paddingH={5}
        paddingV={5}
        borderRadius={1.5}
        borderWidth={0.5}
        borderStyle={BorderStyle.Solid}
      >
        <Icon name="info" title="info" variant={IconVariant.Informative} />
        <Box
          flexGrow={3}
          display="flex"
          flexDirection={FlexDirection.Column}
          gap="10px"
          paddingH={3}
        >
          <Heading5 size={2}>5 recipes, here we come!</Heading5>
          <Paragraph>Choose up to 5 recipes each week.</Paragraph>
        </Box>
        <Icon
          name="close"
          title="Close Banner"
          role="button"
          onClick={() => onBannerClose()}
          size={5}
          tabIndex={0}
        />
      </Box>
    </Box>
  )
}
