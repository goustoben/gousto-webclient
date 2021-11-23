import React from 'react'
import PropTypes from 'prop-types'
import config from 'config/basket'

const BoxProgressMessage = ({ numRecipes, className }) => {
  const { maxRecipesNum, minRecipesNum } = config

  if (numRecipes <= 0) {
    return (
      <p className={className}>
        Add
        {' '}
        <strong>{maxRecipesNum}</strong>
        {' '}
        recipes for the best price per serving
      </p>
    )
  } else if (numRecipes < minRecipesNum) {
    return <p className={className}>Add more recipes to complete your box</p>
  } else if (numRecipes >= maxRecipesNum) {
    return <p className={className}></p>
  } else {
    const remainingRecipes = maxRecipesNum - numRecipes

    return (
      <p className={className}>
        Add
        {' '}
        <strong>{remainingRecipes}</strong>
        {' '}
        more items
        {remainingRecipes > 1 ? 's' : ''}
        {' '}
        for the best box
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
