import React, { useCallback, useLayoutEffect, useState } from 'react'

import { usePrevious } from 'react-use'

import { useBasket, useSupportedBoxTypes } from 'routes/Menu/domains/basket'

import css from './CheckoutCounter.css'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const classNames = require('classnames')

export interface CheckoutCounterProps {
  /**
   * If true, counter would be colored as disabled.
   */
  isDisabled?: boolean
  isButtonHovered: boolean
  numRecipes?: number
}

/**
 * Displays animated square with active orders amount out of max orders (e.g. "3 / 4")
 */
export const CheckoutCounter = ({
  isDisabled = false,
  isButtonHovered,
  numRecipes,
}: CheckoutCounterProps) => {
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState<boolean>(false)
  const oldCounterValue = usePrevious(numRecipes)
  const onAnimationEnd = useCallback(() => {
    setShouldPlayAnimation(false)
  }, [])

  useLayoutEffect(() => {
    if (oldCounterValue !== numRecipes) {
      setShouldPlayAnimation(true)
    }
  }, [oldCounterValue, numRecipes])

  const { numPortions } = useBasket()
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const recipeLimit = maxRecipesForPortion(numPortions)

  return (
    <div
      className={classNames(css.checkoutCounter, {
        [css.isDisabled]: isDisabled,
      })}
    >
      <span
        data-testid="CheckoutCounter_background"
        className={classNames(css.checkoutCounterBackground, {
          [css.isButtonHovered]: isButtonHovered,
          [css.scaleAndWiggleAnimation]: shouldPlayAnimation,
        })}
        onAnimationEnd={onAnimationEnd}
      />
      <span
        data-testid="CheckoutCounter_content"
        className={classNames({
          [css.checkoutCounterValue]: true,
          [css.wiggleAnimation]: shouldPlayAnimation,
        })}
      >
        <span data-testid="CheckoutCounter_numRecipes">{numRecipes}</span>
        <span className={css.slash}>/</span>
        <span data-testid="CheckoutCounter_recipeLimit">{recipeLimit}</span>
      </span>
    </div>
  )
}
