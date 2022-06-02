import React, { SyntheticEvent } from 'react'

import { Box, Color, FontFamily, FontWeight, Icon, Text } from '@gousto-internal/citrus-react'
import classnames from 'classnames'

import { DeviceType, useDeviceType } from 'hooks/useDeviceType'
import { useGetAlternativeOptionsForRecipeLight, useStock } from 'routes/Menu/domains/menu'

import { useRecipeIsFineDineIn } from '../../context/recipeContext'
import { useRecipeReference } from '../../context/recipeReferenceContext'
import { BrandTag, Title } from '../Recipe'
import { RecipeTag } from '../RecipeTag'
import { useGetRecipeTileLinkData } from './Hooks'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { TileImage } from './TileImage'
import { VariantHeader } from './VariantHeader'

import css from './RecipeTile.css'

type RecipeTileProps = {
  recipeId: string
  originalId: string
  currentCollectionId: string
  onClick: (recipeId: string, currentCollectionId: string, recipeReference?: string | null) => void
}

const RecipeTile: React.FC<RecipeTileProps> = ({
  recipeId,
  originalId,
  currentCollectionId: categoryId,
  onClick,
}) => {
  const { isRecipeTileLinkVisible, dispatchTrackClickMoreRecipeDetails } =
    useGetRecipeTileLinkData()
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipeLight()
  const { isRecipeOutOfStock } = useStock()
  const isOutOfStock = isRecipeOutOfStock(recipeId)

  const isFineDineIn = useRecipeIsFineDineIn()

  const deviceType = useDeviceType()
  const recipeReference = useRecipeReference()

  // should never happen but caters for loading state
  if (categoryId === null) {
    return null
  }

  const alternatives = getAlternativeOptionsForRecipe({
    originalId,
    recipeId,
    categoryId,
    isOnDetailScreen: false,
  })

  const handleOnClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    onClick(recipeId, categoryId, recipeReference)
  }

  const handleOnRecipeTileLinkClick = (e: SyntheticEvent) => {
    dispatchTrackClickMoreRecipeDetails()
    handleOnClick(e)
  }

  // alternative options include the recipe itself
  const hasAlternatives = alternatives.length > 1

  const showVariantHeader = hasAlternatives && !isOutOfStock

  const mobileBannerShown = showVariantHeader && deviceType === DeviceType.MOBILE

  return (
    <div
      role="button"
      tabIndex={0}
      className={css.recipeTile}
      data-testing={isOutOfStock ? 'menuRecipeOutOfStock' : 'menuRecipeViewDetails'}
      data-testing-id={recipeId}
      onClick={handleOnClick}
      onKeyPress={handleOnClick}
    >
      {
        // mobile banner needs to sit outside of TileImage
        deviceType === DeviceType.MOBILE && (
          <VariantHeader categoryId={categoryId} originalId={originalId} />
        )
      }

      <div
        className={classnames(css.recipeTileContainer, {
          [css.recipeTileIsFineDineIn]: isFineDineIn,
        })}
      >
        <TileImage categoryId={categoryId} originalId={originalId} />
        <span
          className={classnames(css.recipeTagHolder, {
            [css.recipeTagHolderShifted]: showVariantHeader,
          })}
        >
          <RecipeTag />
        </span>
        <div
          className={classnames(css.recipeTileInfo, {
            [css.variantPushDown]: mobileBannerShown,
          })}
        >
          <BrandTag />

          <Title
            className={classnames(css.recipeTileTitle, {
              [css.recipeTileWithLinkTitle]: isRecipeTileLinkVisible,
            })}
          />

          {isRecipeTileLinkVisible && (
            <Box
              maxWidth="6.45rem"
              width="6.25rem"
              flexBasis="100%"
              borderBottomWidth={1}
              paddingBottom={4}
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
          )}

          <RecipeTilePurchaseInfo
            originalId={originalId}
            categoryId={categoryId}
            fdiStyling={isFineDineIn}
          />
        </div>
      </div>
    </div>
  )
}

export { RecipeTile }
