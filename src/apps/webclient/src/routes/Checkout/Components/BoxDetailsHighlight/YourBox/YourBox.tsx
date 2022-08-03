import React, { useState } from 'react'

import {
  AlignItems,
  Box,
  Display,
  FlexDirection,
  Icon,
  JustifyContent,
} from '@gousto-internal/citrus-react'

import { SectionHeading } from '../SharedComponents'
import { RecipeList } from './RecipeList'
import { ExpandContainer, ChevronIconContainer } from './styled'
import { useGetYourBoxData } from './yourBoxHooks'

export const YourBox = () => {
  const [expanded, setExpanded] = useState(false)
  const { numPortions } = useGetYourBoxData()

  return (
    <>
      <Box
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        justifyContent={JustifyContent.FlexStart}
        alignItems={AlignItems.FlexStart}
      >
        <ExpandContainer onClick={() => setExpanded(!expanded)}>
          <SectionHeading text={`Your box (${numPortions} people)`} noBottomOffset />
          <ChevronIconContainer expanded={expanded}>
            <Icon name="chevron_down" />
          </ChevronIconContainer>
        </ExpandContainer>

        <RecipeList expanded={expanded} />
      </Box>
    </>
  )
}
