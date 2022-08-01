import React from 'react'

import { Box } from '@gousto-internal/citrus-react'

import { SectionHeading, Divider } from './SharedComponents'
import { YourBox } from './YourBox'

export const BoxDetailsHighlight = () => (
  <Box data-testid="BoxDetailsHighlightContainer" paddingV={6} paddingH={6}>
    <YourBox />
    <Divider />

    <SectionHeading text="Order Total" />
    <Divider />

    <SectionHeading text="Delivery Date" />
  </Box>
)
