import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { AddRecipeButtonContainer } from '../AddRecipeButton'
import css from './RecipeTilePurchaseInfo.css'

export const RecipeTilePurchaseInfo = ({
  recipeId,
  originalId,
  categoryId,
  recipeVariants,
  surcharge,
  isOutOfStock,
  isFineDineIn,
  fdiStyling,
}) => {
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
            {
              [css.surchargeInfoIsFineDineIn]: isFineDineIn && fdiStyling,
              [css.surchargeInfoRow]: surchageOnTop
            }
          )
        }
        >
          <span className={css.surchargeAmountText}>
            +£
            {surcharge.toFixed(2)}
          </span>
          <span className={classnames(css.perServingText, { [css.spaceLeft]: surchageOnTop })}>
            <span className={css.perText}>per</span>
            serving
          </span>
        </div>
      ) : null}
      <div className={css.buttonsWrapper}>
        <AddRecipeButtonContainer recipeId={recipeId} originalId={originalId} categoryId={categoryId} />
      </div>
    </div>
  )
}

RecipeTilePurchaseInfo.propTypes = {
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string,
  categoryId: PropTypes.string,
  recipeVariants: PropTypes.arrayOf(PropTypes.shape),
  surcharge: PropTypes.number,
  isOutOfStock: PropTypes.bool.isRequired,
  isFineDineIn: PropTypes.bool.isRequired,
  fdiStyling: PropTypes.bool,
}

RecipeTilePurchaseInfo.defaultProps = {
  originalId: null,
  surcharge: 0,
  recipeVariants: null,
  categoryId: null,
  fdiStyling: false,
}
