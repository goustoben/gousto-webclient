import React from 'react'
import PropTypes from 'prop-types'
import { RecipesInBasketProgressPresentation } from './RecipesInBasketProgress.presentation'
import { useBasket } from '../domains/basket'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const RecipesInBasketProgress = ({ isAuthenticated }) => {
  const { recipeCount } = useBasket()

  return (
    <RecipesInBasketProgressPresentation
      isAuthenticated={isAuthenticated}
      selectedRecipesCount={recipeCount}
    />
  )
}

RecipesInBasketProgress.propTypes = propTypes

export {
  RecipesInBasketProgress
}
