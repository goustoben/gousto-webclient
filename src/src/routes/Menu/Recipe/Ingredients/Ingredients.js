import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import css from './Ingredients.css'
import Ingredient from './Ingredient.js'

const Ingredients = ({ ingredients, inset }) => (
  <div>
    <div className={inset && css.insetHeading}>
      <span className={css.heading}>In your box</span>
      <div className={css.leadingText}>Ingredients for 2 people <span className={css.highlightText}>(double for 4)</span></div>
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
  ingredients: PropTypes.instanceOf(Immutable.List),
  inset: PropTypes.bool,
}
Ingredients.defaultProps = {
  ingredients: Immutable.List([]),
  inset: true,
}

export default Ingredients
