import React, { useCallback, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePrevious } from 'react-use'
import basketConfig from 'config/basket'
import css from './CheckoutCounter.css'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const classNames = require('classnames')

const maxRecipes = basketConfig.maxRecipesNum

export interface CheckoutCounterProps {
  /**
   * If true, counter would be colored as disabled.
   */
  isDisabled?: boolean
  isButtonHovered: boolean
}

/**
 * Displays animated square with active orders amount out of max orders (e.g. "3 / 4")
 */
export const CheckoutCounter = ({ isDisabled = false, isButtonHovered }: CheckoutCounterProps) => {
  const recipesAmount = useSelector((state: any) => state.basket.get('recipes').size)

  const [shouldPlayAnimation, setShouldPlayAnimation] = useState<boolean>(false)
  const oldCounterValue = usePrevious(recipesAmount)
  const onAnimationEnd = useCallback(() => setShouldPlayAnimation(false), [])
  useLayoutEffect(() => {
    if (oldCounterValue !== recipesAmount) {
      setShouldPlayAnimation(true)
    }
  }, [oldCounterValue, recipesAmount])

  return (
    <div
      className={classNames(css.CheckoutCounter, {
        [css.Disabled]: isDisabled,
      })}
    >
      <span
        className={classNames(css.CheckoutCounterBackground, {
          [css.isButtonHovered]: isButtonHovered,
          [css.ScaleAndWiggleAnimation]: shouldPlayAnimation,
        })}
        onAnimationEnd={onAnimationEnd}
      />
      <span
        className={classNames({
          [css.CheckoutCounterValue]: true,
          [css.WiggleAnimation]: shouldPlayAnimation,
        })}
      >
        {recipesAmount}
        <span className={css.slash}>/</span>
        {maxRecipes}
      </span>
    </div>
  )
}
