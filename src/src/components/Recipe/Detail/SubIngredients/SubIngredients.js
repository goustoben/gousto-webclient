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
		{subIngredients.map((subIngredient) => {
			if (isAllergen(allergens, subIngredient)) {
				return <span className={css.bold}>{subIngredient}</span>
			}

			return <span>{subIngredient}</span>
		})}
	</span>
)

SubIngredients.propTypes = {
	subIngredients: React.PropTypes.instanceOf(Immutable.List),
	allergens: React.PropTypes.instanceOf(Immutable.List),
}

export default SubIngredients
