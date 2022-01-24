import React from 'react'
import PropTypes from 'prop-types'
import config from 'config/basket'
import { use5RecipesPaintedDoorTest } from '../../../components/FiveRecipesPaintedDoorTest/use5RecipesPaintedDoorTest'

const BoxProgressMessage = ({ numRecipes, className }) => {
  const { minRecipesNum } = config
  const { maxRecipes: maxRecipesNum } = use5RecipesPaintedDoorTest()
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
    return <p className={className}>Nice! You&apos;ve got the best price per serving</p>
  } else {
    const remainingRecipes = maxRecipesNum - numRecipes

    return (
      <p className={className}>
        Add
        {' '}
        <strong>{remainingRecipes}</strong>
        {' '}
        more recipe
        {remainingRecipes > 1 ? 's' : ''}
        {' '}
        for the best price per serving
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
