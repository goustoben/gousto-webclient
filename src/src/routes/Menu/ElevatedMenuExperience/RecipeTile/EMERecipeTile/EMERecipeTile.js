import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Immutable from 'immutable'
import { TileImageContainer } from '../TileImage'
import { RecipeTag } from '../RecipeTag'
import { RecipeTagTitle } from '../RecipeTagTitle'
import { RecipeTilePurchaseInfoContainer } from '../RecipeTilePurchaseInfo'
import { VariantHeaderContainer } from '../../../Recipe/VariantHeader'
import css from './EMERecipeTile.css'

const EMERecipeTile = ({
  recipe,
  recipeId,
  originalId,
  showDetailRecipe,
  isOutOfStock,
  title,
  isFineDineIn,
  recipeVariants,
  isInCarousel,
  brandTagline,
  brandAvailability,
  categoryId
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
  const hasTopRightTag = Boolean(brandTagline)

  return (
    <div
      role="button"
      tabIndex={0}
      className={css.recipeTile}
      data-testing={isOutOfStock ? 'menuRecipeOutOfStock' : 'menuRecipeViewDetails'}
      onClick={onClick}
      onKeyPress={onClick}
    >
      <VariantHeaderContainer recipeId={recipeId} isOutOfStock={isOutOfStock} categoryId={categoryId} />
      <div
        className={classnames(isInCarousel ? css.carouselRecipeTileContainer : css.recipeTileContainer, {
          [css.recipeTileIsFineDineIn]: isFineDineIn
        })}
      >
        <TileImageContainer recipeId={recipeId} showVariantHeader={showVariantHeader} isInCarousel={isInCarousel} />
        {hasTopLeftTag && (
        <RecipeTag brandTag={brandAvailability} showVariantHeader={showVariantHeader} />
        )}
        <div className={isInCarousel ? css.carouselRecipeTileInfo : css.recipeTileInfo}>
          <div>
            {hasTopRightTag && (
            <RecipeTagTitle brandTag={brandTagline} />
            )}
            <div
              className={css.titleWrapper}
            >
              <h2 className={css.recipeTitle}>
                {title}
              </h2>
            </div>
          </div>
          <RecipeTilePurchaseInfoContainer recipeId={recipeId} originalId={originalId} isInCarousel={isInCarousel} categoryId={categoryId} />
        </div>
      </div>
    </div>
  )
}

EMERecipeTile.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string,
  showDetailRecipe: PropTypes.func.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  brandTagline: PropTypes.shape({
    slug: PropTypes.string,
    text: PropTypes.string,
    theme: PropTypes.object,
  }),
  brandAvailability: PropTypes.shape({
    slug: PropTypes.string,
    text: PropTypes.string,
    theme: PropTypes.object,
  }),
  isFineDineIn: PropTypes.bool.isRequired,
  recipeVariants: PropTypes.arrayOf(PropTypes.shape).isRequired,
  isInCarousel: PropTypes.bool,
  categoryId: PropTypes.string,
}

EMERecipeTile.defaultProps = {
  originalId: null,
  brandTagline: null,
  brandAvailability: null,
  isInCarousel: false,
  categoryId: null
}

export { EMERecipeTile }
