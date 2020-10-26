import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { AddRecipeButtonContainer } from '../AddRecipeButton'
import css from './RecipeTilePurchaseInfo.css'
import { DropdownArrowContainer } from '../../../Recipe/AddRecipe/DropdownArrow'

export const RecipeTilePurchaseInfo = ({ surcharge, isOutOfStock, recipeId, isFineDineIn, recipeVariants, isInCarousel, categoryId, originalId }) => {
  if (isOutOfStock) {
    return null
  }

  const surchageOnTop = (Boolean(recipeVariants) && recipeVariants.length !== 0)

  return (
    <div className={classnames(css.purchaseInfoWrapper, { [css.surchageOnTop]: surchageOnTop })}>
      {surcharge ? (
        <div className={
          classnames(
            css.surchargeInfo,
            { [css.surchargeInfoIsFineDineIn]: isFineDineIn,
              [css.surchargeInfoRow]: surchageOnTop}
          )
        }
        >
          <span className={css.surchargeAmountText}>
            +£
            {surcharge.toFixed(2)}
          </span>
          <span className={classnames(css.perServingText, {[css.spaceLeft]: surchageOnTop})}>
            <span className={css.perText}>per</span>
            serving
          </span>
        </div>
      ) : null}
      <div className={css.buttonsWrapper}>
        <AddRecipeButtonContainer recipeId={recipeId} categoryId={categoryId} />
        <DropdownArrowContainer recipeId={recipeId} originalId={originalId} isInCarousel={isInCarousel} categoryId={categoryId} />
      </div>
    </div>
  )
}

RecipeTilePurchaseInfo.propTypes = {
  surcharge: PropTypes.number,
  isOutOfStock: PropTypes.bool.isRequired,
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string,
  isFineDineIn: PropTypes.bool.isRequired,
  recipeVariants: PropTypes.arrayOf(PropTypes.shape),
  isInCarousel: PropTypes.bool,
  categoryId: PropTypes.string,
}

RecipeTilePurchaseInfo.defaultProps = {
  originalId: null,
  surcharge: 0,
  recipeVariants: null,
  isInCarousel: false,
  categoryId: null
}
