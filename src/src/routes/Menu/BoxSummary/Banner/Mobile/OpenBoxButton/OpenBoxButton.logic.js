import React from 'react'
import PropTypes from 'prop-types'
import { OpenBoxButtonPresentation } from './OpenBoxButton.presentation'

const OpenBoxButton = ({
  showDetails,
  showTextOnButton,
  recipeNumber
}) => {
  const buttonText = (recipeNumber === 0) ? 'Box Summary' : 'Review Recipes'

  return (
    <OpenBoxButtonPresentation
      arrowUp={!showDetails}
      buttonText={buttonText}
      showTextOnButton={showTextOnButton}
    />
  )
}
OpenBoxButton.propTypes = {
  showDetails: PropTypes.bool.isRequired,
  showTextOnButton: PropTypes.bool.isRequired,
  recipeNumber: PropTypes.number.isRequired,
}

export { OpenBoxButton } 
