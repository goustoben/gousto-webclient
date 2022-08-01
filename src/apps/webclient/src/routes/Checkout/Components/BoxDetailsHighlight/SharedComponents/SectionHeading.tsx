import React from 'react'

import { Box, Color, FontFamily, Text } from '@gousto-internal/citrus-react'

type Props = {
  text: string
  smallBottomOffset?: boolean
}

export const SectionHeading = ({ text = '', smallBottomOffset = false }: Props) => (
  <Box paddingBottom={smallBottomOffset ? 2 : 3}>
    <Text size={4} fontFamily={FontFamily.SemiBold} color={Color.ColdGrey_800}>
      {text}
    </Text>
  </Box>
)
