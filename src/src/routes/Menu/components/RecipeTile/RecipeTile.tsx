import React, { SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useDeviceType, DeviceType } from 'hooks/useDeviceType'
import { useGetAlternativeOptionsForRecipeLight } from 'routes/Menu/domains/menu'
import { VariantHeader } from '../../Recipe/VariantHeader'
import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { getRecipeOutOfStock as baseGetRecipeOutOfStock } from '../../selectors/recipe'
import { useRecipeIsFineDineIn } from '../../context/recipeContext'
import { useCollections } from '../../domains/collections'
import { RecipeTag } from '../RecipeTag'
import { Title, BrandTag } from '../Recipe'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { TileImage } from './TileImage'
import css from './RecipeTile.css'
import { useIfRecipeIdIsOutOfStock } from './Hooks'

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
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipeLight()
  const { currentCollectionId } = useCollections()
  const isOutOfStock = useIfRecipeIdIsOutOfStock(recipeId)
  const isFineDineIn = useRecipeIsFineDineIn()

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

  const mobileBannerShown = showVariantHeader && deviceType === DeviceType.MOBILE

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
        && <VariantHeader recipeId={recipeId} categoryId={categoryId} originalId={originalId} />
      }

      <div
        className={classnames(css.recipeTileContainer, {
          [css.recipeTileIsFineDineIn]: isFineDineIn && fdiStyling
        })}
      >
        <TileImage
          categoryId={categoryId}
          originalId={originalId}
        />
        <span
          className={classnames(css.recipeTagHolder, {
            [css.recipeTagHolderShifted]: showVariantHeader,
          })}
        >
          <RecipeTag />
        </span>
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

          <RecipeTilePurchaseInfo
            originalId={originalId}
            categoryId={categoryId}
            fdiStyling={fdiStyling}
          />
        </div>
      </div>
    </div>
  )
}

export { RecipeTile }
