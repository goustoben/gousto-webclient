import React from 'react'
import css from "./IngredientsList.css"
import Immutable from 'immutable'
import SubIngredients from '../SubIngredients/SubIngredients'

const capitalizeFirstLetter = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
)

const IngredientsList = ({ ingredients, allergens, inset }) => (
	<div>
		{(ingredients.size > 0) ? (
			<div className={(inset) ? css.insetSection : css.section}>
				<div className={css.heading}>Ingredients contain</div>
				{ingredients.toArray().map((ingredient, index) => {
				  const subIngredients = ingredient.get('subIngredients')
				  const subIngredientsArray = subIngredients.split(/([\s,()])/)

				  return (subIngredients) ? (
						<dl key={index}>
							<span className={css.bold}>{capitalizeFirstLetter(ingredient.get('name'))}: </span>
							<SubIngredients subIngredients={subIngredientsArray} allergens={allergens} />
						</dl>
				  ) : <span key={index} />
				})}
			</div>
		) : <span />}
	</div>
)

IngredientsList.propTypes = {
  ingredients: React.PropTypes.instanceOf(Immutable.List),
  allergens: React.PropTypes.instanceOf(Immutable.List),
  inset: React.PropTypes.bool,
}

IngredientsList.defaultProps = {
  inset: true,
}

export default IngredientsList
