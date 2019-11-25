import React from 'react'
import PropTypes from 'prop-types'
import { OpenBoxButtonPresentation } from './OpenBoxButton.presentation'
import css from '../BoxSummaryMobile.css'

const OpenBoxButton = ({ showDetails, shouldShowTutorialStep2, showTextOnButton, recipeNumber, shortlistRecipeNumber, shortlistUsed }) => {
  const iconClass = showDetails ? css.arrowDown : css.arrowUp
  const buttonText = (recipeNumber === 4 && shortlistUsed) ? 'Checkout' : (recipeNumber === 0 && shortlistRecipeNumber === 0) ? 'Box Summary' : 'Review Recipes'

  return (<OpenBoxButtonPresentation iconClass={iconClass} buttonText={buttonText} shouldShowTutorialStep2={shouldShowTutorialStep2} showTextOnButton={showTextOnButton} />)
}
OpenBoxButton.propTypes = {
  showDetails: PropTypes.bool.isRequired,
  shouldShowTutorialStep2: PropTypes.bool.isRequired,
  showTextOnButton: PropTypes.bool.isRequired,
  recipeNumber: PropTypes.number.isRequired,
  shortlistRecipeNumber: PropTypes.number.isRequired,
  shortlistUsed: PropTypes.bool.isRequired
}
export { OpenBoxButton } 
