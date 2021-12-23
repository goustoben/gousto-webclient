import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useDeviceType, DeviceType } from 'hooks/useDeviceType'
import { AddRecipeButton } from '../AddRecipeButton'
import { SwapAlternativeOptions, SwapAlternativeOptionsMobile } from '../SwapAlternativeOptions'
import css from './RecipeTilePurchaseInfo.css'

export const RecipeTilePurchaseInfo = ({
  recipeId,
  originalId,
  categoryId,
  surcharge,
  isOutOfStock,
  isFineDineIn,
  fdiStyling,
  hasAlternativeOptions,
}) => {
  const deviceType = useDeviceType()

  if (isOutOfStock) {
    return null
  }

  const surchageOnTop = hasAlternativeOptions

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
        <AddRecipeButton recipeId={recipeId} />
        {hasAlternativeOptions
            && (
              deviceType === DeviceType.MOBILE
                ? <SwapAlternativeOptionsMobile recipeId={recipeId} originalId={originalId} categoryId={categoryId} />
                : <SwapAlternativeOptions recipeId={recipeId} originalId={originalId} categoryId={categoryId} />
            )}
      </div>
    </div>
  )
}

RecipeTilePurchaseInfo.propTypes = {
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string,
  categoryId: PropTypes.string,
  surcharge: PropTypes.number,
  isOutOfStock: PropTypes.bool.isRequired,
  isFineDineIn: PropTypes.bool.isRequired,
  fdiStyling: PropTypes.bool,
  hasAlternativeOptions: PropTypes.bool.isRequired,
}

RecipeTilePurchaseInfo.defaultProps = {
  originalId: null,
  surcharge: 0,
  categoryId: null,
  fdiStyling: false,
}
