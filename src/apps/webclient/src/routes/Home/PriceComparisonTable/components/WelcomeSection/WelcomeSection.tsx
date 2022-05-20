import React from 'react'
import {
  AlignItems,
  Box,
  FlexDirection,
  Heading3,
  JustifyContent,
  Paragraph,
  TextAlign,
} from '@gousto-internal/citrus-react'
import { SignupCTA } from 'routes/Home/PriceComparisonTable/components/SignupCTA/SignupCTA'
import { welcomeSectionTexts, BLOCK_WIDTH_LIST } from 'routes/Home/PriceComparisonTable/constants'
import css from 'routes/Home/PriceComparisonTable/components/WelcomeSection/WelcomeSection.css'

export function WelcomeSection() {
  return (
    <Box
      className={css.welcomeSection}
      display="flex"
      flexDirection={FlexDirection.Column}
      justifyContent={JustifyContent.Center}
      alignItems={[
        AlignItems.Center,
        AlignItems.Center,
        AlignItems.FlexStart,
        AlignItems.FlexStart,
      ]}
      width={BLOCK_WIDTH_LIST}
      paddingV={[10, 10, 10, 0]}
      paddingBottom={[0, 0, 0, 0]}
    >
      <Heading3
        data-testid="Welcome_Heading"
        textAlign={[TextAlign.Center, TextAlign.Center, TextAlign.Left, TextAlign.Left]}
      >
        {welcomeSectionTexts.heading}
      </Heading3>
      <Box paddingV={4} paddingBottom={[0, 0, 6, 6]} data-testid="Welcome_Subheading">
        <Paragraph
          fontWeight={400}
          size={3}
          textAlign={[TextAlign.Center, TextAlign.Center, TextAlign.Left, TextAlign.Left]}
        >
          {welcomeSectionTexts.subheading}
        </Paragraph>
      </Box>
      <Box display={['none', 'none', 'block', 'block']}>
        <SignupCTA />
      </Box>
    </Box>
  )
}
