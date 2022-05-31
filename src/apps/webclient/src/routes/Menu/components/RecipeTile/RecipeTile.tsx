import React, { SyntheticEvent } from 'react'

import { Box, Icon, IconVariant, Link, Color, colors } from '@gousto-internal/citrus-react'
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
            <Box maxWidth="6.25rem" flexBasis="100%">
              {/* FYI: By design we should use link, and we already have <Link /> component */}
              {/* in our design system. Implementing component which looks like <Link /> is awkward. */}
              {/* Also, we don't want this link to lead anywhere, that's why lint should be disabled. */}
              {/* And such option supported by citrus, but not by eslint config. */}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                onClick={handleOnRecipeTileLinkClick}
                size={1}
                style={{ position: 'relative', width: '100%' }}
              >
                More details
                <Icon
                  name="arrow_right"
                  variant={IconVariant.Confirmation}
                  size={4}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '0.125rem',
                    color: colors[Color.Secondary_600],
                  }}
                />
              </Link>
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
