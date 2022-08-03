import React, { useState } from 'react'

import {
  AlignItems,
  BorderStyle,
  Box,
  Color,
  Display,
  FlexDirection,
  Icon,
  JustifyContent,
} from '@gousto-internal/citrus-react'

import { SectionHeading } from '../SharedComponents'
import { ExpandContainer, ChevronIconContainer, RecipesContainer } from './styled'
import { useGetYourBoxData } from './yourBoxHooks'
import { getRecipeTileResponsiveSize } from './yourBoxUtils'

export const YourBox = () => {
  const [expanded, setExpanded] = useState(false)
  const { numPortions, maxRecipesNum, recipesList } = useGetYourBoxData()
  const recipeTileResponsiveSize = getRecipeTileResponsiveSize(maxRecipesNum, expanded)

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
        <RecipesContainer expanded={expanded} fiveRecipes={maxRecipesNum === 5}>
          {recipesList.map((recipeId) => (
            <Box
              key={recipeId}
              width={recipeTileResponsiveSize}
              height={recipeTileResponsiveSize}
              borderStyle={!recipeId ? BorderStyle.Dashed : undefined}
              borderWidth={1}
              borderColor={Color.ColdGrey_800}
            >
              {recipeId ? <div>{recipeId}</div> : null}
            </Box>
          ))}
        </RecipesContainer>
      </Box>
    </>
  )
}
