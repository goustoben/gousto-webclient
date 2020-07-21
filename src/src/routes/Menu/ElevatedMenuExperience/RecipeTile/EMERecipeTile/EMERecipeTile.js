import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { TileImageContainer } from '../TileImage'
import css from './EMERecipeTile.css'

const EMERecipeTile = ({ recipe, recipeId, showDetailRecipe, isOutOfStock, title, isMobile, surcharge }) => {
  if (!recipe) {
    return null
  }

  const onClick = (isViewMoreDetailsClicked = false) => { showDetailRecipe(recipeId, isViewMoreDetailsClicked) }

  return (
    <div
      className={
        classnames(
          { [css.mobileRecipeTileContainer]: isMobile },
          { [css.desktopRecipeTileContainer]: !isMobile }
        )
      }
      data-testing={isOutOfStock ? 'menuRecipeOutOfStock' : 'menuRecipe'}
    >
      <TileImageContainer
        recipeId={recipeId}
        onClick={onClick}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyPress={onClick}
        className={
          classnames(
            { [css.mobileTitleWrapper]: isMobile },
            { [css.desktopTitleWrapper]: !isMobile }
          )
        }
      >
        <h2 className={
          classnames(
            { [css.mobileRecipeTitle]: isMobile },
            { [css.desktopRecipeTitle]: !isMobile }
          )
        }
        >
          {title}
        </h2>
        <div className={css.purchaseInfoWrapper}>
          {surcharge && !isOutOfStock ? (
            <div className={css.surchargeInfo}>
              <span className={css.surchargeAmountText}>
                +£
                {surcharge.toFixed(2)}
              </span>
              <span className={css.perServingText}>per serving</span>
            </div>
          ) : null}
          <div className={css.addRecipeButton}>CTA</div>
        </div>
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
  isMobile: PropTypes.bool.isRequired,
  surcharge: PropTypes.number
}

EMERecipeTile.defaultProps = {
  surcharge: 0
}

export { EMERecipeTile }
