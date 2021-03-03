import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Immutable from 'immutable'
import { TileImageContainer } from './TileImage'
import { RecipeTag } from '../RecipeTag'
import { RecipeTagTitle } from './RecipeTagTitle'
import { RecipeTilePurchaseInfoContainer } from './RecipeTilePurchaseInfo'
import css from './RecipeTile.css'
import { VariantHeaderContainer } from '../../Recipe/VariantHeader/VariantHeaderContainer'
import { VariantRecipeListContainer } from '../../Recipe/VariantRecipeList/VariantRecipeList/VariantRecipeListContainer'
import { RecipeTileTitleContainer } from './RecipeTileTitle'

const RecipeTile = ({
  browserType,
  recipe,
  recipeId,
  originalId,
  showDetailRecipe,
  isOutOfStock,
  isFineDineIn,
  recipeVariants,
  brandTagline,
  brandAvailability,
  categoryId,
  fdiStyling,
  showVariantDropdown,
  inSignpostingExperimentBucket,
  inMandatoryVariantExperimentBucket
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

  // experiment code for signposting ui
  const variantHeaderPosition = inSignpostingExperimentBucket ? 'bottom' : 'top'
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

      {showVariantDropdown && !inMandatoryVariantExperimentBucket && (
        <div className={css.variantDropdownContainer}>
          <VariantRecipeListContainer recipeId={recipeId} originalId={originalId} categoryId={categoryId} />
        </div>
      )}

      <div
        className={classnames(css.recipeTileContainer, {
          [css.recipeTileIsFineDineIn]: isFineDineIn && fdiStyling
        })}
      >
        <TileImageContainer
          recipeId={recipeId}
          categoryId={categoryId}
          showVariantHeader={desktopBannerShown}
          variantHeaderPosition={variantHeaderPosition}
          pushUpCookingTime={showVariantHeader && inSignpostingExperimentBucket}
        />
        {hasTopLeftTag && (
          <RecipeTag brandTag={brandAvailability} />
        )}
        <div
          className={classnames(
            css.recipeTileInfo,
            {
              [css.variantPushUp]: (mobileBannerShown && variantHeaderPosition === 'bottom'),
              [css.variantPushDown]: (mobileBannerShown && variantHeaderPosition === 'top')
            }
          )}
        >
          {hasTopRightTag && (
            <RecipeTagTitle brandTag={brandTagline} showVariantHeader={showVariantHeader} />
          )}
          <RecipeTileTitleContainer recipeId={recipeId} />
          <RecipeTilePurchaseInfoContainer
            recipeId={recipeId}
            originalId={originalId}
            categoryId={categoryId}
            fdiStyling={fdiStyling}
            inMandatoryVariantExperimentBucket={inMandatoryVariantExperimentBucket}
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
  showVariantDropdown: PropTypes.bool,
  originalId: PropTypes.string,
  showDetailRecipe: PropTypes.func.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
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
  categoryId: PropTypes.string,
  fdiStyling: PropTypes.bool,

  inSignpostingExperimentBucket: PropTypes.bool,
  inMandatoryVariantExperimentBucket: PropTypes.bool,
}

RecipeTile.defaultProps = {
  originalId: null,
  brandTagline: null,
  brandAvailability: null,
  categoryId: null,
  fdiStyling: true,
  showVariantDropdown: false,
  inSignpostingExperimentBucket: false,
  inMandatoryVariantExperimentBucket: false
}

export { RecipeTile }
