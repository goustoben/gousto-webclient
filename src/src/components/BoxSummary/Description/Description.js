import React, { PropTypes } from 'react'
import css from './Description.css'

const Description = ({ numPortions, numRecipes, view, deliveryOptions, warning }) => {
  let statusText = `Choose 2, 3 or 4 meals for ${numPortions} people`
  if (numRecipes > 0) {
    statusText = `${numRecipes} meal${numRecipes > 1 ? 's' : ''} for ${numPortions} people added`
  }
  if (deliveryOptions) {
    statusText = 'Select delivery options'
  }
  if (warning) {
    statusText = <span><span className={css.warningIcon}></span> There's been a change in your box</span>
  }

  return <p className={css[`description${view}`]}>{statusText}</p>
}

Description.propTypes = {
  view: PropTypes.string.isRequired,
  numPortions: PropTypes.number.isRequired,
  numRecipes: PropTypes.number.isRequired,
  deliveryOptions: PropTypes.bool,
  warning: PropTypes.bool,
}

export default Description
