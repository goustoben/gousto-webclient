import React from 'react'

import { BorderStyle, Box, Color } from '@gousto-internal/citrus-react'

import { RecipesContainer } from 'routes/Checkout/Components/BoxDetailsHighlight/YourBox/styled'
import { useGetYourBoxData } from 'routes/Checkout/Components/BoxDetailsHighlight/YourBox/yourBoxHooks'
import { getRecipeTileResponsiveSize } from 'routes/Checkout/Components/BoxDetailsHighlight/YourBox/yourBoxUtils'

type Props = { expanded: boolean }

export const RecipeList = ({ expanded }: Props) => {
  const { maxRecipesNum, recipesList } = useGetYourBoxData()
  const recipeTileResponsiveSize = getRecipeTileResponsiveSize(maxRecipesNum, expanded)

  return (
    <RecipesContainer expanded={expanded}>
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
  )
}
