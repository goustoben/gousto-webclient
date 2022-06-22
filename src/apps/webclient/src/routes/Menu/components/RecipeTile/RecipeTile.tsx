import React, { SyntheticEvent } from 'react'

import classnames from 'classnames'

import { useDeviceType, DeviceType } from 'hooks/useDeviceType'
import {
  RecipeTileLink,
  useGetRecipeTileLinkData,
} from 'routes/Menu/components/RecipeTile/RecipeTileLink'
import { useStock } from 'routes/Menu/domains/basket'
import { useGetAlternativeOptionsForRecipe } from 'routes/Menu/domains/menu'

import { useRecipeIsFineDineIn } from '../../context/recipeContext'
import { useRecipeReference } from '../../context/recipeReferenceContext'
import { BrandTag, Title } from '../Recipe'
import { RecipeTag } from '../RecipeTag'
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
  const { isRecipeTileLinkVisible } = useGetRecipeTileLinkData()
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipe()
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
    recipeId,
    categoryId,
    isOnDetailScreen: false,
  })

  const handleOnClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    onClick(recipeId, categoryId, recipeReference)
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
        deviceType === DeviceType.MOBILE && <VariantHeader categoryId={categoryId} />
      }

      <div
        className={classnames(css.recipeTileContainer, {
          [css.recipeTileIsFineDineIn]: isFineDineIn,
        })}
      >
        <TileImage categoryId={categoryId} />
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
            <RecipeTileLink isFineDineIn={isFineDineIn} onClickTile={handleOnClick} />
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
