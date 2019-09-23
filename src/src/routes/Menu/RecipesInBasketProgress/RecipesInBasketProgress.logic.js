import React from 'react'
import PropTypes from 'prop-types'
import { maxRecipesNum } from 'config/basket'

import { RecipesInBasketProgressPresentation } from './RecipesInBasketProgress.presentation'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  selectedRecipesCount: PropTypes.number.isRequired
}

const recipeCountToPercentage = (selectedRecipesCount) => (
  Math.round((selectedRecipesCount / maxRecipesNum) * 100)
)

const RecipesInBasketProgress = ({ isAuthenticated, selectedRecipesCount }) => {
  const percentage = recipeCountToPercentage(selectedRecipesCount)
  const isBasketFull = selectedRecipesCount >= maxRecipesNum

  if (selectedRecipesCount <= 0) {
    return null
  }

  return (
    <RecipesInBasketProgressPresentation
      isAuthenticated={isAuthenticated}
      isBasketFull={isBasketFull}
      percentage={percentage}
      selectedRecipesCount={selectedRecipesCount}
    />
  )
}

RecipesInBasketProgress.propTypes = propTypes

export {
  RecipesInBasketProgress
}
