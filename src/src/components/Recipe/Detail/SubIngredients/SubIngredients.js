import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import css from "./SubIngredients.css"

export const isAllergen = (allergens, subIngredient) => (
  allergens.some((allergen) => (
    allergen.toLowerCase().includes(subIngredient.toLowerCase())
  ))
)

const SubIngredients = ({ subIngredients, allergens }) => (
	<span>
		{subIngredients.map((subIngredient) => {
		  if (isAllergen(allergens, subIngredient)) {
		    return <span className={css.bold}>{subIngredient}</span>
		  }

		  return <span>{subIngredient}</span>
		})}
	</span>
)

SubIngredients.propTypes = {
  subIngredients: PropTypes.instanceOf(Immutable.List),
  allergens: PropTypes.instanceOf(Immutable.List),
}

export default SubIngredients
