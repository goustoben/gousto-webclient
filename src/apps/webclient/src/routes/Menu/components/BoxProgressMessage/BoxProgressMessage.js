import React from 'react'

import PropTypes from 'prop-types'

import { useNumPortions } from 'routes/Menu/domains/basket/internal/useNumPortions'
import { useSupportedBoxTypes } from 'routes/Menu/domains/basket/internal/useSupportedBoxTypes'

const BoxProgressMessage = ({ numRecipes, className }) => {
  const { maxRecipesForPortion, minRecipesForPortion } = useSupportedBoxTypes()
  const { numPortions } = useNumPortions()
  const maxRecipesNum = maxRecipesForPortion(numPortions)
  const minRecipesNum = minRecipesForPortion(numPortions)

  if (numRecipes <= 0) {
    return (
      <p className={className}>
        Add <strong>{maxRecipesNum}</strong> recipes for the best price per serving
      </p>
    )
  } else if (numRecipes < minRecipesNum) {
    return <p className={className}>Add more recipes to complete your box</p>
  } else if (numRecipes >= maxRecipesNum) {
    return <p className={className}>Nice! You&apos;ve got the best price per serving</p>
  } else {
    const remainingRecipes = maxRecipesNum - numRecipes

    return (
      <p className={className}>
        Add <strong>{remainingRecipes}</strong> more recipe
        {remainingRecipes > 1 ? 's' : ''} for the best price per serving
      </p>
    )
  }
}

BoxProgressMessage.propTypes = {
  numRecipes: PropTypes.number.isRequired,
  className: PropTypes.string,
}

BoxProgressMessage.defaultProps = {
  className: '',
}

export { BoxProgressMessage }
