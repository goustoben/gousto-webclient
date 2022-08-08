import React from 'react'

import {
  AlignItems,
  Box,
  Color,
  Display,
  FlexDirection,
  FontFamily,
  JustifyContent,
  Text,
} from '@gousto-internal/citrus-react'

type Props = {
  text: string
  noBottomOffset?: boolean
  children?: React.ReactNode
}

export const SectionHeading = ({ text = '', noBottomOffset = false, children }: Props) => (
  <Box
    paddingBottom={noBottomOffset ? 0 : 3}
    display={Display.Flex}
    flexDirection={FlexDirection.Row}
    justifyContent={JustifyContent.SpaceBetween}
    alignItems={AlignItems.Center}
  >
    <Text size={4} fontFamily={FontFamily.SemiBold} color={Color.ColdGrey_800}>
      {text}
    </Text>

    {children}
  </Box>
)
