import React, { useEffect } from 'react'

import {
  AlignItems,
  BorderStyle,
  Box,
  Color,
  Display,
  FlexDirection,
  FontFamily,
  FontWeight,
  JustifyContent,
  Space,
  Text,
} from '@gousto-internal/citrus-react'
import GoustoImage from 'Image'
import Immutable from 'immutable'
import { useDispatch } from 'react-redux'

import recipesActions from 'actions/recipes'
import css from 'routes/Checkout/Components/RecipeSummary/OrderedRecipe/OrderedRecipe.css'

import { RecipesContainer } from './styled'
import { useGetYourBoxData } from './yourBoxHooks'
import { getRecipeTileResponsiveSize } from './yourBoxUtils'

type Props = { expanded: boolean }

export const RecipeList = ({ expanded }: Props) => {
  const dispatch = useDispatch()
  const { maxRecipesNum, recipesIdsList, menuRecipesStore } = useGetYourBoxData()

  const recipeTileResponsiveSize = getRecipeTileResponsiveSize(maxRecipesNum, expanded)

  useEffect(() => {
    const fetchRecipes = () => {
      if (menuRecipesStore && menuRecipesStore.size === 0) {
        dispatch(recipesActions.recipesLoadRecipesById(recipesIdsList))
      }
    }

    fetchRecipes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMedia = (recipeId: string) => {
    const media = menuRecipesStore.getIn(
      [recipeId, 'media', 'images', 0, 'urls'],
      Immutable.List([]),
    )

    return media.getIn([1, 'src'])
  }
  const getTitle = (recipeId: string) => menuRecipesStore.getIn([recipeId, 'title'], '')

  return (
    <RecipesContainer expanded={expanded}>
      {recipesIdsList.map((recipeId) => (
        <Box
          key={recipeId}
          width={recipeTileResponsiveSize}
          height={recipeTileResponsiveSize}
          borderStyle={!recipeId ? BorderStyle.Dashed : undefined}
          borderWidth={1}
          borderColor={Color.ColdGrey_800}
        >
          {recipeId ? (
            <Box
              display={Display.Flex}
              flexDirection={FlexDirection.Row}
              justifyContent={JustifyContent.Center}
              alignItems={AlignItems.Center}
            >
              <GoustoImage
                media={getMedia(recipeId)}
                title={getTitle(recipeId)}
                className={css.image}
              />
              {expanded ? (
                <>
                  <Space size={4} direction="horizontal" />
                  <Text fontWeight={FontWeight.SemiBold} fontFamily={FontFamily.SemiBold} size={2}>
                    {getTitle(recipeId)}
                  </Text>
                </>
              ) : null}
            </Box>
          ) : null}
        </Box>
      ))}
    </RecipesContainer>
  )
}
