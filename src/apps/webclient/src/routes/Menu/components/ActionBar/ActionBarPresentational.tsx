import React from 'react'

import classNames from 'classnames'
import { useSelector } from 'react-redux'

import basketConfig from 'config/basket'

import { ActionBarText } from './ActionBarText/ActionBarText'
import { CircularProgressIndicator } from './CircularProgressIndicator/CircularProgressIndicator'
import { createGetBestTierPricePerPortion } from './actionBarSelectors'

import css from './ActionBarPresentational.module.css'

type Props = {
  variant: 'separate' | 'embedded'
  recipeCount: number
  shouldAnimate: boolean
  onAnimationEnd: () => void
}

export const ActionBarPresentational = ({
  variant,
  recipeCount,
  shouldAnimate,
  onAnimationEnd,
}: Props) => {
  const maxRecipes = basketConfig.maxRecipesNum
  const maxRecipesNumAchieved = recipeCount === basketConfig.maxRecipesNum
  const nextTierPricePerPortion = useSelector(createGetBestTierPricePerPortion())

  return (
    <div
      data-testid="actionBar"
      className={classNames(css.actionBarPresentational, {
        [css.separate]: variant === 'separate',
        [css.embedded]: variant === 'embedded',
        [css.actionBarCanCheckout]: maxRecipesNumAchieved,
        [css.shouldAnimate]: shouldAnimate,
      })}
      onAnimationEnd={onAnimationEnd}
    >
      <CircularProgressIndicator
        maxRecipesNumAchieved={maxRecipesNumAchieved}
        recipeCount={recipeCount}
        maxRecipes={maxRecipes}
      />
      <ActionBarText
        recipeCount={recipeCount}
        maxRecipes={maxRecipes}
        nextTierPricePerPortion={nextTierPricePerPortion}
        isInEmbeddedActionBar={variant === 'embedded'}
      />
    </div>
  )
}
