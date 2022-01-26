import React from 'react'
import PropTypes from 'prop-types'

import { getBrowserType } from 'selectors/browser'
import { useSelector } from 'react-redux'
import { RecipesInBasketProgressPresentation } from './RecipesInBasketProgress.presentation'
import { useBasketRequiredFeatureEnabled } from '../hooks/useBasketRequiredFeatureEnabled'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  selectedRecipesCount: PropTypes.number.isRequired,
}

const RecipesInBasketProgress = ({ isAuthenticated, selectedRecipesCount }) => {
  const isBasketRequiredFeatureEnabled = useBasketRequiredFeatureEnabled()
  const isMobileViewport = useSelector(state => getBrowserType(state) === 'mobile')

  if (selectedRecipesCount <= 0) {
    return null
  }

  return (
    <RecipesInBasketProgressPresentation
      isAuthenticated={isAuthenticated}
      selectedRecipesCount={selectedRecipesCount}
      isBasketRequiredFeatureEnabled={isBasketRequiredFeatureEnabled}
      isMobileViewport={isMobileViewport}
    />
  )
}

RecipesInBasketProgress.propTypes = propTypes

export {
  RecipesInBasketProgress
}
