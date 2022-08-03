import React, { useState } from 'react'

import styled from '@emotion/styled'
import {
  AlignItems,
  BorderStyle,
  Box,
  Color,
  Display,
  FlexDirection,
  JustifyContent,
  Icon,
} from '@gousto-internal/citrus-react'

import { SectionHeading } from '../SharedComponents'
import { useGetYourBoxData } from './yourBoxHooks'
import { getRecipeTileResponsiveSize, getRecipeTileResponsiveGaps } from './yourBoxUtils'

const ExpandContainer = styled.div(() => ({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}))

type ChevronIconContainerProps = { expanded: boolean }
const ChevronIconContainer = styled.div(({ expanded }: ChevronIconContainerProps) => ({
  transition: 'ease-out .3s',
  transform: `rotateX(${expanded ? '180deg' : '90deg'})`,
}))

export const YourBox = () => {
  const [expanded, setExpanded] = useState(false)
  const { numPortions, maxRecipesNum, recipesList } = useGetYourBoxData()
  const recipeTileResponsiveSize = getRecipeTileResponsiveSize(maxRecipesNum, expanded)
  const recipeTileGapResponsiveSize = getRecipeTileResponsiveGaps(maxRecipesNum, expanded)

  return (
    <>
      <Box
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        justifyContent={JustifyContent.FlexStart}
        alignItems={AlignItems.FlexStart}
      >
        <ExpandContainer onClick={() => setExpanded(!expanded)}>
          <SectionHeading text={`Your box (${numPortions} people)`} smallBottomOffset />
          <ChevronIconContainer expanded={expanded}>
            <Icon name="chevron_down" />
          </ChevronIconContainer>
        </ExpandContainer>
        <Box
          display={Display.Flex}
          flexDirection={FlexDirection.Row}
          justifyContent={JustifyContent.FlexStart}
          alignItems={AlignItems.Center}
          gap={recipeTileGapResponsiveSize}
          width="100%"
        >
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
        </Box>
      </Box>
    </>
  )
}
