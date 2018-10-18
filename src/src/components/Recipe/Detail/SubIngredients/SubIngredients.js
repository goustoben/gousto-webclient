import PropTypes from 'prop-types'
import React from 'react'
import css from '../SubIngredients/SubIngredients.css'
import Immutable from 'immutable'

export const isAllergen = (allergens, subIngredient) => (
	allergens.some((allergen) => (
		allergen.toLowerCase().includes(subIngredient.toLowerCase())
	))
)

const SubIngredients = ({ subIngredients, allergens }) => (
	<span>
		{subIngredients.map((subIngredient, idx) => (<span key={idx} className={isAllergen(allergens, subIngredient) && css.bold}>{subIngredient}</span>))}
	</span>
)

SubIngredients.propTypes = {
	subIngredients: PropTypes.instanceOf(Immutable.List),
	allergens: PropTypes.instanceOf(Immutable.List),
}

export default SubIngredients
