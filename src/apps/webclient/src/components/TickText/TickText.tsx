import React from 'react'

import {
  Box,
  Text,
  Color,
  Display,
  AlignItems,
  JustifyContent,
  Icon,
  IconVariant,
  Space,
  FontWeight,
  TextAlign,
} from '@gousto-internal/citrus-react'

import { TickTextProps } from './TickText.models'

export const TickText = ({
  highlightedText,
  ordinaryText,
  justifyContent,
  alignItems,
  fontWeight,
  tickPadding,
  maxWidth,
  textAlign,
}: TickTextProps) => (
  <Box
    display={Display.Flex}
    justifyContent={justifyContent || JustifyContent.Center}
    alignItems={alignItems || AlignItems.Center}
    flexGrow={0}
    maxWidth={maxWidth || '100%'}
    data-testId="container"
  >
    <Box paddingRight={tickPadding || 0}>
      <Icon name="tick" variant={IconVariant.Confirmation} data-testId="tick" />
      <Space size={1} direction="horizontal" />
    </Box>

    <Text size={2} textAlign={textAlign || TextAlign.Center}>
      <Text
        fontWeight={fontWeight || FontWeight.Bold}
        color={Color.Success_600}
        display={Display.InlineBlock}
        data-testId="highlighted"
      >
        {highlightedText}
      </Text>
      <span> {ordinaryText}</span>
    </Text>
  </Box>
)
