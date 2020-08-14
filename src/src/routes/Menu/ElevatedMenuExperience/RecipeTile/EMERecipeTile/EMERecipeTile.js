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

const EMERecipeTile = ({ recipe, recipeId, showDetailRecipe, isOutOfStock, title, brandTags, isFineDineIn, recipeVariants }) => {
  if (!recipe) {
    return null
  }

  const onClick = (e) => {
    e.stopPropagation()
    showDetailRecipe(recipeId, false)
  }

  const showVariantHeader = !(!recipeVariants || isOutOfStock)

  return (

    <div
      role="button"
      tabIndex={0}
      className={classnames(css.recipeTileContainer, {
        [css.recipeTileIsFineDineIn]: isFineDineIn
      })}
      data-testing={isOutOfStock ? 'menuRecipeOutOfStock' : 'menuRecipeViewDetails'}
      onClick={onClick}
      onKeyPress={onClick}
    >
      <VariantHeaderContainer recipeId={recipeId} isOutOfStock={isOutOfStock} />
      <TileImageContainer recipeId={recipeId} />
      {brandTags && brandTags.topLeftTag && (
        <RecipeTag brandTag={brandTags.topLeftTag} showVariantHeader={showVariantHeader} />
      )}
      <div className={classnames(css.recipeTileInfo, {
        [css.recipeTileInfoShowVariantHeader]: showVariantHeader
      })}
      >
        <div>
          {brandTags && brandTags.topRightTag && (
            <RecipeTagTitle brandTag={brandTags.topRightTag} />
          )}
          <div
            className={css.titleWrapper}
          >
            <h2 className={css.recipeTitle}>
              {title}
            </h2>
          </div>
        </div>
        <RecipeTilePurchaseInfoContainer recipeId={recipeId} />
      </div>
    </div>
  )
}

EMERecipeTile.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipeId: PropTypes.string.isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  brandTags: PropTypes.shape({
    topLeftTag: PropTypes.object,
    topRightTag: PropTypes.object,
  }),
  isFineDineIn: PropTypes.bool.isRequired,
  recipeVariants: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

EMERecipeTile.defaultProps = {
  brandTags: null,
}

export { EMERecipeTile }
