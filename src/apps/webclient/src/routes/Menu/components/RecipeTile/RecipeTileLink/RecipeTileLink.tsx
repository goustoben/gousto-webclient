import React, { SyntheticEvent } from 'react'

import { Box, Color, FontFamily, FontWeight, Icon, Text } from '@gousto-internal/citrus-react'
import classnames from 'classnames'

import { useGetRecipeTileLinkData } from './hooks'

import css from './RecipeTileLink.css'

interface Props {
  isFineDineIn: boolean
  onClickTile: (e: SyntheticEvent) => void
}

export function RecipeTileLink({ isFineDineIn, onClickTile }: Props) {
  const { dispatchTrackClickMoreRecipeDetails } = useGetRecipeTileLinkData()

  const handleOnRecipeTileLinkClick = (e: SyntheticEvent) => {
    dispatchTrackClickMoreRecipeDetails()
    onClickTile(e)
  }

  return (
    <Box
      maxWidth="6.45rem"
      width="6.25rem"
      flexBasis="100%"
      borderBottomWidth={1}
      paddingBottom={4}
      style={{ boxSizing: 'content-box' }}
    >
      <button
        type="button"
        onClick={handleOnRecipeTileLinkClick}
        className={classnames(css.recipeTileLink, {
          [css.recipeTileFineDineInLink]: isFineDineIn,
        })}
      >
        <Text
          fontFamily={FontFamily.UI}
          fontWeight={FontWeight.SemiBold}
          size={1}
          className={classnames(css.recipeTileLinkText, {
            [css.recipeFineDineInTileLinkText]: isFineDineIn,
          })}
          color={isFineDineIn ? Color.Secondary_200 : Color.Secondary_400}
        >
          More details
        </Text>
        <Icon
          name="arrow_right"
          size={4}
          className={classnames(css.recipeTileLinkIcon, {
            [css.recipeTileFineDineInLinkIcon]: isFineDineIn,
          })}
        />
      </button>
    </Box>
  )
}
