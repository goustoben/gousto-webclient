import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { AddRecipeButtonContainer } from '../AddRecipeButton'
import css from './RecipeTilePurchaseInfo.css'
import { DropdownArrowContainer } from '../../../Recipe/AddRecipe/DropdownArrow'

export const RecipeTilePurchaseInfo = ({surcharge, isOutOfStock, recipeId, isFineDineIn, recipeVariants}) => {
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
        <AddRecipeButtonContainer recipeId={recipeId} />
        <DropdownArrowContainer recipeId={recipeId} originalId={recipeId} />
      </div>
    </div>
  )
}

RecipeTilePurchaseInfo.propTypes = {
  surcharge: PropTypes.number,
  isOutOfStock: PropTypes.bool.isRequired,
  recipeId: PropTypes.string.isRequired,
  isFineDineIn: PropTypes.bool.isRequired,
  recipeVariants: PropTypes.arrayOf(PropTypes.shape)
}

RecipeTilePurchaseInfo.defaultProps = {
  surcharge: 0,
  recipeVariants: null
}
