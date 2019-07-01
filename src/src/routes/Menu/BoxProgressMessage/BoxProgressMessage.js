import React from 'react'
import PropTypes from 'prop-types'
import config from 'config/basket'

const BoxProgressMessage = ({ numRecipes }) => {
  const { maxRecipesNum, minRecipesNum } = config

  if (numRecipes <= 0) {
    return (
      <p>Add <strong>{maxRecipesNum}</strong> recipes for the best price per serving</p>
    )

  } else if (numRecipes < minRecipesNum) {
    return <p>Add more recipes to complete your box</p>

  } else if (numRecipes >= maxRecipesNum) {
    return <p>Nice! You&apos;ve got the best price per serving</p>

  } else {
    const remainingRecipes = maxRecipesNum - numRecipes

    return (
      <p>Add <strong>{remainingRecipes}</strong> more recipe{remainingRecipes > 1 ? 's' : ''} for the best price per serving</p>
    )
  }
}

BoxProgressMessage.propTypes = {
  numRecipes: PropTypes.number.isRequired,
}

export default BoxProgressMessage
