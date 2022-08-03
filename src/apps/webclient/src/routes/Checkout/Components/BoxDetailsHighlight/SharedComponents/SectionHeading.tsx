import React from 'react'

import { Box, Color, FontFamily, Text } from '@gousto-internal/citrus-react'

type Props = {
  text: string
  noBottomOffset?: boolean
}

export const SectionHeading = ({ text = '', noBottomOffset = false }: Props) => (
  <Box paddingBottom={noBottomOffset ? 0 : 3}>
    <Text size={4} fontFamily={FontFamily.SemiBold} color={Color.ColdGrey_800}>
      {text}
    </Text>
  </Box>
)
