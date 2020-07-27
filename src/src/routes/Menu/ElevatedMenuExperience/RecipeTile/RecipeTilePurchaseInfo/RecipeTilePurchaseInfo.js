import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { AddRecipeButtonContainer } from '../AddRecipeButton'
import css from './RecipeTilePurchaseInfo.css'

export const RecipeTilePurchaseInfo = ({surcharge, isOutOfStock, recipeId, isFineDineIn}) => {
  if (isOutOfStock) {
    return null
  }

  return (
    <div className={css.purchaseInfoWrapper}>
      {surcharge ? (
        <div className={
          classnames(
            css.surchargeInfo,
            { [css.surchargeInfoIsFineDineIn]: isFineDineIn }
          )
        }
        >
          <span className={css.surchargeAmountText}>
            +£
            {surcharge.toFixed(2)}
          </span>
          <span className={css.perServingText}>
            <span className={css.perText}>per</span>
            serving
          </span>
        </div>
      ) : null}
      <AddRecipeButtonContainer recipeId={recipeId} />
    </div>
  )
}

RecipeTilePurchaseInfo.propTypes = {
  surcharge: PropTypes.number,
  isOutOfStock: PropTypes.bool.isRequired,
  recipeId: PropTypes.string.isRequired,
  isFineDineIn: PropTypes.bool.isRequired
}

RecipeTilePurchaseInfo.defaultProps = {
  surcharge: 0
}
