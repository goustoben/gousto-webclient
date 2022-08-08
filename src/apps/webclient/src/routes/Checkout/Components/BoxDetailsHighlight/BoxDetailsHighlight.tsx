import React from 'react'

import { Box } from '@gousto-internal/citrus-react'

import { SectionHeading, Divider } from './SharedComponents'
import { Summary } from './Summary'
import { YourBox } from './YourBox'

type Props = {
  isLoading: boolean
}

export const BoxDetailsHighlight = ({ isLoading }: Props) => (
  <Box data-testid="BoxDetailsHighlightContainer" paddingV={6} paddingH={6}>
    <YourBox />
    <Divider />

    <SectionHeading text="Order Total" />
    <Summary isLoading={isLoading} />
    <Divider />

    <SectionHeading text="Delivery Date" />
  </Box>
)
