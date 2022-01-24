import PropTypes from 'prop-types'
import React from 'react'
import css from './Description.css'
import { use5RecipesPaintedDoorTest } from '../../../../components/FiveRecipesPaintedDoorTest/use5RecipesPaintedDoorTest'

const Description = ({ numPortions, numRecipes, view, deliveryOptions, warning }) => {
  const { isEnabled, hasSeenOnMenu } = use5RecipesPaintedDoorTest()
  let statusText = isEnabled && !hasSeenOnMenu ? 'Choose up to 5 meals for 2 people' : `Choose 2, 3 or 4 meals for ${numPortions} people`

  if (numRecipes > 0) {
    statusText = `${numRecipes} meal${numRecipes > 1 ? 's' : ''} for ${numPortions} people added`
  }
  if (deliveryOptions) {
    statusText = 'Select delivery options'
  }
  if (warning) {
    statusText = (
      <span>
        <span className={css.warningIcon} />
        {' '}
        There&apos;s been a change in your box
      </span>
    )
  }

  return <p className={css[`description${view}`]}>{statusText}</p>
}

Description.propTypes = {
  view: PropTypes.string.isRequired,
  numPortions: PropTypes.number.isRequired,
  numRecipes: PropTypes.number.isRequired,
  deliveryOptions: PropTypes.bool.isRequired,
  warning: PropTypes.bool.isRequired,
}

export { Description }
