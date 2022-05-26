import React from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import { useDeviceType, DeviceType } from 'hooks/useDeviceType'
import { useRecipeId, useRecipeIsFineDineIn } from 'routes/Menu/context/recipeContext'
import { useGetAlternativeOptionsForRecipeLight, useStock } from 'routes/Menu/domains/menu'

import { AddRecipeButton } from '../AddRecipeButton'
import { useGetSurchargeForRecipeId } from '../Hooks'
import { SwapAlternativeOptions, SwapAlternativeOptionsMobile } from '../SwapAlternativeOptions'

import css from './RecipeTilePurchaseInfo.css'

type RecipeTilePurchaseInfoProps = {
  originalId: string
  categoryId: string
  fdiStyling: boolean
}

export const RecipeTilePurchaseInfo: React.FC<RecipeTilePurchaseInfoProps> = ({
  originalId,
  categoryId,
  fdiStyling,
}) => {
  const deviceType = useDeviceType()
  const recipeId = useRecipeId()
  const surcharge = useGetSurchargeForRecipeId(recipeId)
  const isFineDineIn = useRecipeIsFineDineIn()
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipeLight()
  const { isRecipeOutOfStock } = useStock()

  if (!recipeId) {
    return null
  }

  const isOutOfStock = isRecipeOutOfStock(recipeId)

  if (isOutOfStock) {
    return null
  }

  const alternatives = getAlternativeOptionsForRecipe({
    recipeId,
    originalId,
    categoryId,
    isOnDetailScreen: false,
  })

  // alternative options include the recipe itself
  const hasAlternativeOptions = alternatives.length > 1

  const surchargeOnTop = hasAlternativeOptions

  return (
    <div className={classnames(css.purchaseInfoWrapper, { [css.surchageOnTop]: surchargeOnTop })}>
      {surcharge ? (
        <div
          className={classnames(css.surchargeInfo, {
            [css.surchargeInfoIsFineDineIn]: isFineDineIn && fdiStyling,
            [css.surchargeInfoRow]: surchargeOnTop,
          })}
        >
          <span className={css.surchargeAmountText}>
            +£
            {surcharge.toFixed(2)}
          </span>
          <span className={classnames(css.perServingText, { [css.spaceLeft]: surchargeOnTop })}>
            <span className={css.perText}>per</span>
            serving
          </span>
        </div>
      ) : null}
      <div className={css.buttonsWrapper}>
        <AddRecipeButton recipeId={recipeId} />
        {hasAlternativeOptions &&
          (deviceType === DeviceType.MOBILE ? (
            <SwapAlternativeOptionsMobile
              recipeId={recipeId}
              originalId={originalId}
              categoryId={categoryId}
            />
          ) : (
            <SwapAlternativeOptions
              recipeId={recipeId}
              originalId={originalId}
              categoryId={categoryId}
            />
          ))}
      </div>
    </div>
  )
}

RecipeTilePurchaseInfo.propTypes = {
  originalId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  fdiStyling: PropTypes.bool.isRequired,
}
