import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Immutable from 'immutable'
import { TileImageContainer } from './TileImage'
import { RecipeTag } from '../RecipeTag'
import { RecipeTilePurchaseInfoContainer } from './RecipeTilePurchaseInfo'
import css from './RecipeTile.module.css'
import { VariantHeaderContainer } from '../../Recipe/VariantHeader/VariantHeaderContainer'
import { Title, BrandTag } from '../Recipe'

const RecipeTile = ({
  browserType,
  recipe,
  recipeId,
  originalId,
  showDetailRecipe,
  isOutOfStock,
  isFineDineIn,
  recipeVariants,
  brandAvailability,
  categoryId,
  fdiStyling,
}) => {
  if (!recipe) {
    return null
  }

  const onClick = (e) => {
    e.stopPropagation()
    showDetailRecipe(recipeId, categoryId)
  }

  const showVariantHeader = !((!recipeVariants || !recipeVariants.alternatives || !recipeVariants.alternatives.size) || isOutOfStock)
  const hasTopLeftTag = Boolean(brandAvailability)

  const mobileBannerShown = (showVariantHeader && browserType === 'mobile')
  const desktopBannerShown = (showVariantHeader && (browserType === 'desktop' || browserType === 'tablet'))

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
        (browserType === 'mobile')
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
            hasAlternativeOptions={showVariantHeader}
          />
        </div>
      </div>
    </div>
  )
}

RecipeTile.propTypes = {
  browserType: PropTypes.oneOf(['desktop', 'tablet', 'mobile']).isRequired,
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string,
  showDetailRecipe: PropTypes.func.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  brandAvailability: PropTypes.shape({
    slug: PropTypes.string,
    text: PropTypes.string,
    theme: PropTypes.object,
  }),
  isFineDineIn: PropTypes.bool.isRequired,
  recipeVariants: PropTypes.arrayOf(PropTypes.shape).isRequired,
  categoryId: PropTypes.string,
  fdiStyling: PropTypes.bool,
}

RecipeTile.defaultProps = {
  originalId: null,
  brandAvailability: null,
  categoryId: null,
  fdiStyling: true,
}

export { RecipeTile }
