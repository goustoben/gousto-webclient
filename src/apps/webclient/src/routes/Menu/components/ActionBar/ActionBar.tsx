import React, { useLayoutEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { usePrevious, useMedia } from 'react-use'

import { getBasketRecipesCount } from 'selectors/basket'

import { ActionBarPresentational } from './ActionBarPresentational'

import css from './ActionBarPresentational.module.css'

type Props = {
  variant: 'separate' | 'embedded'
}

export const ActionBar = ({ variant }: Props) => {
  const numRecipes = useSelector(getBasketRecipesCount)
  const [displayedNumRecipes, setDisplayedNumRecipes] = useState<number>(numRecipes)
  const previousNumRecipes = usePrevious(numRecipes)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const isToMedium = useMedia(css.BreakpointToMedium)

  useLayoutEffect(() => {
    // The mobile animation is "jump out of view -> jump into view".  When
    // jumping out, we'd like to display the previous content, hence updating
    // numRecipes is delayed.
    if (numRecipes !== previousNumRecipes && previousNumRecipes !== undefined) {
      if (isToMedium && variant === 'separate') {
        setShouldAnimate(true)
        setDisplayedNumRecipes(previousNumRecipes)
        setTimeout(() => {
          setDisplayedNumRecipes(numRecipes)
        }, Number.parseInt(css.fullJumpDurationMs, 10) / 2)
      } else {
        setDisplayedNumRecipes(numRecipes)
      }
    }
  }, [numRecipes, previousNumRecipes, isToMedium, variant])

  const handleAnimationEnd = () => {
    setShouldAnimate(false)
  }

  return (
    <ActionBarPresentational
      variant={variant}
      numRecipes={displayedNumRecipes}
      shouldAnimate={shouldAnimate}
      onAnimationEnd={handleAnimationEnd}
    />
  )
}
