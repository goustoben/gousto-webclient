import React from 'react'

import { Box, Link } from '@gousto-internal/citrus-react'

import routesConfig from 'config/routes'

import { OrderTotal } from './OrderTotal'
import { SectionHeading, Divider } from './SharedComponents'
import { YourBox } from './YourBox'

type Props = {
  isLoading: boolean
}

export const BoxDetailsHighlight = ({ isLoading }: Props) => (
  <Box data-testid="BoxDetailsHighlightContainer" paddingV={6} paddingH={6}>
    <YourBox />
    <Divider />

    <SectionHeading text="Order Total">
      <Link href={routesConfig.client.menu}>Edit order</Link>
    </SectionHeading>
    <OrderTotal isLoading={isLoading} />
    <Divider />

    <SectionHeading text="Delivery Date" />
  </Box>
)
