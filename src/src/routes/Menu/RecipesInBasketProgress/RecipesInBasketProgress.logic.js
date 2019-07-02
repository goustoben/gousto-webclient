import React from 'react'
import PropTypes from 'prop-types'
import { maxRecipesNum } from 'config/basket'

import { RecipesInBasketProgressPresentation } from './RecipesInBasketProgress.presentation'

const propTypes = {
  selectedRecipesCount: PropTypes.number.isRequired
}

const recipeCountToPercentage = (selectedRecipesCount) => (
  Math.round((selectedRecipesCount / maxRecipesNum) * 100)
)

const RecipesInBasketProgress = ({ selectedRecipesCount }) => {
  const percentage = recipeCountToPercentage(selectedRecipesCount)
  const isBasketFull = selectedRecipesCount >= maxRecipesNum

  if (selectedRecipesCount <= 0) {
    return null
  }

  return (
    <RecipesInBasketProgressPresentation
      selectedRecipesCount={selectedRecipesCount}
      percentage={percentage}
      isBasketFull={isBasketFull}
    />
  )
}

RecipesInBasketProgress.propTypes = propTypes

export {
  RecipesInBasketProgress
}
