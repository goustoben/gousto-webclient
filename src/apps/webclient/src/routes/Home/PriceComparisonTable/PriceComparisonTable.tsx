import React from 'react'

import { AlignItems, Box, FlexDirection, JustifyContent } from '@gousto-internal/citrus-react'

import css from 'routes/Home/PriceComparisonTable/PriceComparisonTable.css'
import { ComparisonTable } from 'routes/Home/PriceComparisonTable/components/ComparisonTable/ComparisonTable'
import { SignupCTA } from 'routes/Home/PriceComparisonTable/components/SignupCTA/SignupCTA'
import { WelcomeSection } from 'routes/Home/PriceComparisonTable/components/WelcomeSection/WelcomeSection'
import { TABLE_DATA } from 'routes/Home/PriceComparisonTable/constants'

export function PriceComparisonTable() {
  return (
    <Box
      data-testid="PriceComparisonTable"
      className={css.priceComparisonTable}
      display="flex"
      flexDirection={[
        FlexDirection.Column,
        FlexDirection.Column,
        FlexDirection.Row,
        FlexDirection.Row,
      ]}
      justifyContent={JustifyContent.SpaceBetween}
      alignItems={AlignItems.Center}
      maxWidth="1200px"
      paddingV={10}
      paddingBottom={6}
      paddingH={8}
      gap="32px"
    >
      <WelcomeSection data-testid="WelcomeSectionContainer" />
      <ComparisonTable items={TABLE_DATA} data-testid="ComparisonTableContainer" />
      <Box display={['block', 'block', 'none', 'none']} data-testid="SignupCTAContainer">
        <SignupCTA />
      </Box>
    </Box>
  )
}
