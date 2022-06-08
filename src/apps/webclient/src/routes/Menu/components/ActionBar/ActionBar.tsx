import React, { useLayoutEffect, useState } from 'react'

import { usePrevious, useMedia } from 'react-use'

import { useBasket } from 'routes/Menu/domains/basket'

import { ActionBarPresentational } from './ActionBarPresentational'

import css from './ActionBarPresentational.module.css'

type Props = {
  variant: 'separate' | 'embedded'
}

export const ActionBar = ({ variant }: Props) => {
  const { recipeCount } = useBasket()
  const [displayedNumRecipes, setDisplayedNumRecipes] = useState<number>(recipeCount)
  const previousNumRecipes = usePrevious(recipeCount)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const isToMedium = useMedia(css.BreakpointToMedium)

  useLayoutEffect(() => {
    // The mobile animation is "jump out of view -> jump into view".  When
    // jumping out, we'd like to display the previous content, hence updating
    // recipeCount is delayed.
    if (recipeCount !== previousNumRecipes && previousNumRecipes !== undefined) {
      if (isToMedium && variant === 'separate') {
        setShouldAnimate(true)
        setDisplayedNumRecipes(previousNumRecipes)
        setTimeout(() => {
          setDisplayedNumRecipes(recipeCount)
        }, Number.parseInt(css.fullJumpDurationMs, 10) / 2)
      } else {
        setDisplayedNumRecipes(recipeCount)
      }
    }
  }, [recipeCount, previousNumRecipes, isToMedium, variant])

  const handleAnimationEnd = () => {
    setShouldAnimate(false)
  }

  return (
    <ActionBarPresentational
      variant={variant}
      recipeCount={displayedNumRecipes}
      shouldAnimate={shouldAnimate}
      onAnimationEnd={handleAnimationEnd}
    />
  )
}
