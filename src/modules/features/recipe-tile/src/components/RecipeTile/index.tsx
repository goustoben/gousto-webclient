import React, { SyntheticEvent, useCallback } from 'react'
import styled from '@emotion/styled'

import { useGetAlternativeOptionsForRecipeHook, useRecipe, useStockHook } from '../../model/context'

import { useRecipeReference } from '../../model/context/useRecipeReference'

import { DeviceType, useDeviceType } from '../../utils/useDeviceType'
import { VariantHeader } from '../VariantHeader'
import { TileImage } from '../TileImage/TileImage'
import { BrandTag } from '../BrandTag'
import { Title } from '../Title'
import { RecipeTilePurchaseInfo } from '../RecipeTilePurchaseInfo'
import {
  cssRecipeTagHolder,
  cssRecipeTagHolderShifted,
  cssRecipeTile,
  cssRecipeTileContainer,
  cssRecipeTileInfo,
  cssRecipeTileIsFineDineIn,
  cssRecipeTileWithLinkTitle,
  cssVariantPushDown,
} from './styles'
import { RecipeTag } from '../RecipeTag'
import { useGetRecipeTileLinkDataHook } from '../../model/context/useGetRecipeTileLinkData'
import { RecipeTileLink } from '../RecipeTileLink'
import { useBasketHook } from '../../model/context/useBasket'

const OuterContainer = styled.div(cssRecipeTile as any)
const ImageContainer = styled.div(
  (props: any) =>
    ({
      ...cssRecipeTileContainer,
      ...(props.isFineDineIn ? cssRecipeTileIsFineDineIn : {}),
    } as any),
)
const RecipeTagContainer = styled.span(
  (props: any) =>
    ({
      ...cssRecipeTagHolder,
      ...(props.showVariantHeader ? cssRecipeTagHolderShifted : {}),
    } as any),
)
const BrandTagContainer = styled.div(
  (props: any) =>
    ({
      ...cssRecipeTileInfo,
      ...(props.mobileBannerShown ? cssVariantPushDown : {}),
    } as any),
)

type RecipeTileProps = {
  originalId: string
  currentCollectionId: string
  onClick: (recipeId: string, currentCollectionId: string, recipeReference?: string | null) => void
  SwapAlternativeOptionsMobile?: React.FC<{}>
}

export const RecipeTile = ({
  originalId,
  currentCollectionId: categoryId,
  onClick,
  SwapAlternativeOptionsMobile,
}: RecipeTileProps) => {
  const useGetAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipeHook()
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipe()

  const useStock = useStockHook()
  const { isRecipeOutOfStock } = useStock()

  const useBasket = useBasketHook()
  const { numPortions } = useBasket()

  const { isFineDineIn, id: recipeId } = useRecipe()
  const isOutOfStock = isRecipeOutOfStock(recipeId, numPortions)

  const deviceType = useDeviceType()
  const recipeReference = useRecipeReference()
  const useGetRecipeTileLinkData = useGetRecipeTileLinkDataHook()
  const { isRecipeTileLinkVisible } = useGetRecipeTileLinkData()

  const handleOnClick = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation()
      onClick(recipeId, categoryId, recipeReference)
    },
    [onClick, recipeId, categoryId, recipeReference],
  )

  // should never happen but caters for loading state
  if (categoryId === null) {
    return null
  }

  const alternatives = getAlternativeOptionsForRecipe({
    recipeId,
    categoryId,
    isOnDetailScreen: false,
  })

  // alternative options include the recipe itself
  const hasAlternatives = alternatives.length > 1

  const showVariantHeader = hasAlternatives && !isOutOfStock

  const mobileBannerShown = showVariantHeader && deviceType === DeviceType.MOBILE

  return (
    <OuterContainer
      role="button"
      tabIndex={0}
      data-testing={isOutOfStock ? 'menuRecipeOutOfStock' : 'menuRecipeViewDetails'}
      data-testing-id={recipeId}
      onClick={handleOnClick}
      onKeyPress={handleOnClick}
    >
      {
        // mobile banner needs to sit outside of TileImage
        deviceType === DeviceType.MOBILE && <VariantHeader categoryId={categoryId} />
      }

      <ImageContainer isFineDineIn={isFineDineIn}>
        <TileImage categoryId={categoryId} />
        <RecipeTagContainer showVariantHeader={showVariantHeader}>
          <RecipeTag />
        </RecipeTagContainer>
        <BrandTagContainer mobileBannerShown={mobileBannerShown}>
          <BrandTag />

          <Title styles={isRecipeTileLinkVisible ? [cssRecipeTileWithLinkTitle] : []} />

          {isRecipeTileLinkVisible && (
            <RecipeTileLink isFineDineIn={Boolean(isFineDineIn)} onClickTile={handleOnClick} />
          )}

          <RecipeTilePurchaseInfo
            originalId={originalId}
            categoryId={categoryId}
            fdiStyling={isFineDineIn}
            SwapAlternativeOptionsMobile={SwapAlternativeOptionsMobile}
          />
        </BrandTagContainer>
      </ImageContainer>
    </OuterContainer>
  )
}

// RecipeTile.whyDidYouRender = true
