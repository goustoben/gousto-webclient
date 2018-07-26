import React from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */

import css from './Ingredients.css'
import Ingredient from './Ingredient.js'

const Ingredients = ({ ingredients, restrictedView, inset }) => (
	<div>
		<div className={inset && css.insetHeading}>
			<span className={css.heading}>In your box</span>
			{!restrictedView && <div className={css.leadingText}>Ingredients for 2 people <span className={css.highlightText}>(double for 4)</span></div>}
		</div>
		<div className={css.ingredientsContainer}>
			{ingredients.map(ingredient => (
				<div className={css.ingredient} key={ingredient.get('id')}>
					<Ingredient ingredient={ingredient} />
				</div>)
			)}
		</div>
	</div>
)

Ingredients.propTypes = {
	ingredients: React.PropTypes.instanceOf(Immutable.List),
	restrictedView: React.PropTypes.bool,
	inset: React.PropTypes.bool,
}
Ingredients.defaultProps = {
	ingredients: Immutable.List([]),
	restrictedView: false,
	inset: true,
}


export default Ingredients
