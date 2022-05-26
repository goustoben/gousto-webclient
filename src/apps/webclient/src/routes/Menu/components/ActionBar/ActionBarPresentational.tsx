import React from 'react'

import classNames from 'classnames'
import { useSelector } from 'react-redux'

import basketConfig from 'config/basket'
import { usePricing } from 'routes/Menu/domains/pricing'

import { ActionBarText } from './ActionBarText/ActionBarText'
import { CircularProgressIndicator } from './CircularProgressIndicator/CircularProgressIndicator'
import { getMenuBoxPricesLoading, createGetNextTierPricePerPortion } from './actionBarSelectors'

import css from './ActionBarPresentational.module.css'

type Props = {
  variant: 'separate' | 'embedded'
  numRecipes: number
  shouldAnimate: boolean
  onAnimationEnd: () => void
}

export const ActionBarPresentational = ({
  variant,
  numRecipes,
  shouldAnimate,
  onAnimationEnd,
}: Props) => {
  const maxRecipes = basketConfig.maxRecipesNum
  const canCheckout = numRecipes >= basketConfig.minRecipesNum
  const nextTierPricePerPortion = useSelector(createGetNextTierPricePerPortion(numRecipes))
  const menuBoxPricesLoading = useSelector(getMenuBoxPricesLoading)
  const { isPending, pricing } = usePricing()
  const isLoading = isPending || menuBoxPricesLoading
  const currentTierPricePerPortion = pricing ? pricing.pricePerPortionDiscounted : null

  return (
    <div
      data-testid="actionBar"
      className={classNames(css.actionBarPresentational, {
        [css.separate]: variant === 'separate',
        [css.embedded]: variant === 'embedded',
        [css.actionBarCanCheckout]: canCheckout,
        [css.shouldAnimate]: shouldAnimate,
      })}
      onAnimationEnd={onAnimationEnd}
    >
      <CircularProgressIndicator
        numRecipes={numRecipes}
        maxRecipes={maxRecipes}
        canCheckout={canCheckout}
      />
      <ActionBarText
        numRecipes={numRecipes}
        maxRecipes={maxRecipes}
        currentTierPricePerPortion={currentTierPricePerPortion}
        nextTierPricePerPortion={nextTierPricePerPortion}
        isLoading={isLoading}
        isInEmbeddedActionBar={variant === 'embedded'}
      />
    </div>
  )
}
