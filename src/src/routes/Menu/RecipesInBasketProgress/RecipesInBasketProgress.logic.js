import React from 'react'
import PropTypes from 'prop-types'

import { RecipesInBasketProgressPresentation } from './RecipesInBasketProgress.presentation'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  selectedRecipesCount: PropTypes.number.isRequired
}

const RecipesInBasketProgress = ({ isAuthenticated, selectedRecipesCount }) => {
  if (selectedRecipesCount <= 0) {
    return null
  }

  return (
    <RecipesInBasketProgressPresentation
      isAuthenticated={isAuthenticated}
      selectedRecipesCount={selectedRecipesCount}
    />
  )
}

RecipesInBasketProgress.propTypes = propTypes

export {
  RecipesInBasketProgress
}
