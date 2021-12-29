import React, { SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeviceType, DeviceType } from 'hooks/useDeviceType'
import { useMenu } from '../../domains/menu'
import { VariantHeaderContainer } from '../../Recipe/VariantHeader/VariantHeaderContainer'
import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { getRecipeOutOfStock as baseGetRecipeOutOfStock } from '../../selectors/recipe'
import { useRecipeIsFineDineIn, useRecipeBrandAvailabilityTag } from '../../context/recipeContext'
import { useCollections } from '../../domains/collections'
import { RecipeTag } from '../RecipeTag'
import { Title, BrandTag } from '../Recipe'
import { RecipeTilePurchaseInfoContainer } from './RecipeTilePurchaseInfo'
import { TileImageContainer } from './TileImage'
import css from './RecipeTile.css'

const classnames = require('classnames')

type RecipeTileProps = {
  recipeId: string;
  originalId: string;
  categoryId?: string;
  fdiStyling?: boolean;
}

// delete this when import uses TS
const getRecipeOutOfStock = baseGetRecipeOutOfStock as (state: any, options: { recipeId: string }) => boolean

const RecipeTile: React.FC<RecipeTileProps> = ({
  recipeId,
  originalId,
  categoryId: collectionIdOverride,
  fdiStyling = false,
}) => {
  const dispatch = useDispatch()
  const { getAlternativeOptionsForRecipe } = useMenu()
  const { currentCollectionId } = useCollections()
  const isOutOfStock = useSelector(state => getRecipeOutOfStock(state, { recipeId }))
  const isFineDineIn = useRecipeIsFineDineIn()
  const brandAvailability = useRecipeBrandAvailabilityTag()

  const deviceType = useDeviceType()

  // should never happen but caters for loading state
  if (currentCollectionId === null) {
    return null
  }

  const categoryId = collectionIdOverride || currentCollectionId

  const alternatives = getAlternativeOptionsForRecipe({
    originalId,
    recipeId,
    categoryId,
    isOnDetailScreen: false,
    isFromShowcaseMenu: false
  })

  const onClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    dispatch(showDetailRecipe(recipeId, categoryId))
  }

  // alternative options include the recipe itself
  const hasAlternatives = alternatives.length > 1

  const showVariantHeader = hasAlternatives && !isOutOfStock
  const hasTopLeftTag = Boolean(brandAvailability)

  const mobileBannerShown = (showVariantHeader && deviceType === DeviceType.MOBILE)
  const desktopBannerShown = (showVariantHeader && (deviceType === DeviceType.DESKTOP || deviceType === DeviceType.TABLET))

  return (
    <div
      role="button"
      tabIndex={0}
      className={css.recipeTile}
      data-testing={isOutOfStock ? 'menuRecipeOutOfStock' : 'menuRecipeViewDetails'}
      onClick={onClick}
      onKeyPress={onClick}
    >
      {
        // mobile banner needs to sit outside of TileImage
        (deviceType === DeviceType.MOBILE)
        && <VariantHeaderContainer recipeId={recipeId} categoryId={categoryId} isOutOfStock={isOutOfStock} />
      }

      <div
        className={classnames(css.recipeTileContainer, {
          [css.recipeTileIsFineDineIn]: isFineDineIn && fdiStyling
        })}
      >
        <TileImageContainer
          recipeId={recipeId}
          categoryId={categoryId}
          showVariantHeader={desktopBannerShown}
        />
        {hasTopLeftTag && (
          <RecipeTag brandTag={brandAvailability} showVariantHeader={showVariantHeader} />
        )}
        <div
          className={classnames(
            css.recipeTileInfo,
            {
              [css.variantPushDown]: mobileBannerShown
            }
          )}
        >
          <BrandTag />

          <Title className={css.recipeTileTitle} />

          <RecipeTilePurchaseInfoContainer
            recipeId={recipeId}
            originalId={originalId}
            categoryId={categoryId}
            fdiStyling={fdiStyling}
            hasAlternativeOptions={hasAlternatives}
          />
        </div>
      </div>
    </div>
  )
}

export { RecipeTile }
